## Stage 1 (production base // debian 10 (buster) slim (mini size))
FROM node:14-buster-slim as base

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock* ./

USER node

## Stage 2 (development)
# we don't COPY in this stage because for dev as compose will bind-mount anyway
# this saves time when building locally for dev via docker-compose
FROM base AS dev

WORKDIR /usr/src/app

COPY --chown=node:node . .

EXPOSE 3000

RUN yarn install

CMD [ "yarn", "start" ]