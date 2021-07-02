### Setup Notes

1. Init
yarn add --dev --exact eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb
yarn add express
yarn add --dev typescript
yarn add --dev --exact eslint-config-prettier eslint-plugin-prettier

### Helpful Commands

- Show Local Logs - `docker-compose logs -f <name>`
- Stop Project - `docker-compose stop`
- Recreate Images - `docker-compose build`
- Build One Image - `docker-compose build <name>`
- Stop One Image - `docker-compose stop <name>`
- Recreate Images and Start Project - `docker-compose up -d --build`
- Remove Containers and Volumes - `docker-compose down -v`
- Stop all container `docker stop $(docker ps -a -q)`
- Remove all containers `docker rm $(docker ps -a -q)`
- Remove all images `docker rmi $(docker images -a -q)`
- Remove all volumes `docker prune volume`
- Enter a running container `docker exec -it <name> bash`