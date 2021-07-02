#!/bin/bash

ACCOUNT=
REGION="ap-south-1"
CLUSTER_NAME="test-ECSCluster"
NODE_ENV="test"

## ECR Repository Names
USER_SERVICE=user-service
POST_SERVICE=post-service
ACCOUNT_SERVICE=account-service

ECS_NAME__USER_SERVICE=test-UserAPIService-AlKPHgqjDPuN
ECS_NAME__POST_SERVICE=
ECS_NAME__ACCOUNT_SERVICE=

DEPLOYABLE_SERVICES=(
    "$USER_SERVICE"
    "$POST_SERVICE"
    "$ACCOUNT_SERVICE"
);

SERVICES_TO_BE_DEPLOYED=()

ECS_UPDATE_SERVICE_RECORD=()

choice () {
    local choice=$1
    if [[ ${opts[choice]} ]] # toggle
    then
        opts[choice]=
        boldText[choice]=""
    else
        boldText[choice]="\e[1m"
        opts[choice]="\e[32m\xE2\x9C\x94"
    fi
}

show_menu(){
    normal=`echo "\033[m"`
    menu=`echo "\033[36m"` #Blue
    number=`echo "\033[33m"` #yellow
    bgred=`echo "\033[41m"`
    fgred=`echo "\033[31m"`
    printf "\n${menu}*********************************************${normal}\n"
    for i in "${!DEPLOYABLE_SERVICES[@]}"; do
        ITER=$(expr $i + 1)
        printf "${boldText[$ITER]}${menu}**${number} "$ITER"): ${DEPLOYABLE_SERVICES[$i]} ${normal} ${opts[$ITER]}\n"
    done
    printf "${menu}---${normal}\n"
    printf "${boldText[$ITER]}${menu}**${number} a): Deploy all services ${normal} ${opts["a"]}\n"
    printf "${menu}*********************************************${normal}\n"
    printf "Select an option and press enter, ${fgred}x to exit. ${normal}"
    read opt
}

clear
show_menu

while [ "$opt" != '' ]
do
    if [ $opt = '' ]; then
        exit;
    else
        case $opt in
            1) clear;
                SERVICES_TO_BE_DEPLOYED+=($USER_SERVICE)
                if [ "$ECS_NAME__USER_SERVICE" != '' ]; 
                then
                   ECS_UPDATE_SERVICE_RECORD+=($ECS_NAME__USER_SERVICE)
                fi   
                choice 1
                printf "Hit enter to confirm -- or -- add more services to be deployed";
                show_menu;
            ;;
            2) clear;
                SERVICES_TO_BE_DEPLOYED+=($POST_SERVICE)
                if [ "$ECS_NAME__POST_SERVICE" != '' ]; 
                then
                   ECS_UPDATE_SERVICE_RECORD+=($ECS_NAME__POST_SERVICE)
                fi   
                choice 2
                printf "Hit enter to confirm -- or -- add more services to be deployed";
                show_menu;
            ;;
            3) clear;
                SERVICES_TO_BE_DEPLOYED+=($ACCOUNT_SERVICE)
                if [ "$ECS_NAME__ACCOUNT_SERVICE" != '' ]; 
                then
                   ECS_UPDATE_SERVICE_RECORD+=($ECS_NAME__ACCOUNT_SERVICE)
                fi   
                choice 3
                printf "Hit enter to confirm -- or -- add more services to be deployed";
                show_menu;
            ;;
            a) clear;
                opts=()
                SERVICES_TO_BE_DEPLOYED=(
                   "$USER_SERVICE"
                   "$POST_SERVICE"
                   "$ACCOUNT_SERVICE"
                )
                if [ "$ECS_NAME__USER_SERVICE" != '' ]; 
                then
                ECS_UPDATE_SERVICE_RECORD=(
                    $ECS_NAME__USER_SERVICE
                    $ECS_NAME__POST_SERVICE
                    $ECS_NAME__ACCOUNT_SERVICE
                )
                fi  
                choice a
                printf "\e[1mHit enter to confirm";
                show_menu;
            ;;
            x)exit;
            ;;
            \n)exit;
            ;;
            *)clear;
                option_picked "Pick an option from the menu";
                show_menu;
            ;;
        esac
    fi
done

echo "**** Authenticating against AWS ECR ****"

aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin $ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com

for SERVICE_NAME in "${SERVICES_TO_BE_DEPLOYED[@]}"
do
    echo "----------------------------------------"
    echo "Build and Deploy: ${number} $SERVICE_NAME ${normal}"
    echo "----------------------------------------"
    
    DOCKER_CONTAINER=$SERVICE_NAME
    REPO=${ACCOUNT}.dkr.ecr.ap-south-1.amazonaws.com/${NODE_ENV}-${DOCKER_CONTAINER}
    
    echo "Building Docker Image..."
    docker-compose build $DOCKER_CONTAINER
    
    echo "Tagging ${REPO}..."
    docker tag $DOCKER_CONTAINER:latest $REPO:latest
    
    printf "\e[32m**** Deploying to AWS ECR ****${normal}"
    docker push ${REPO}
done


if [[ ${#ECS_UPDATE_SERVICE_RECORD[@]} ]]
then
  for ECR_SERVICE_NAME in "${ECS_UPDATE_SERVICE_RECORD[@]}"
  do
    echo "**** ${menu} Updating ECS service name: $ECR_SERVICE_NAME **** ${normal}"
    aws ecs update-service --cluster $CLUSTER_NAME --service "${ECR_SERVICE_NAME}" --force-new-deployment --region $REGION --no-cli-pager
    printf "\e[32m**** Service: $ECR_SERVICE_NAME succesfully updated \xE2\x9C\x94 ****${normal}\n"
  done
else
  echo "*** No ecr services defined"
fi
