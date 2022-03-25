FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

ENV GRAPHQL_URL 'http://stage.how-to-help-ukraine.com/graphql'

RUN npm ci

COPY . .

RUN npm run build
