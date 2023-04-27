FROM node:18.16.0-alpine3.17

WORKDIR /app

RUN mkdir -p /app

COPY package.json /app/

RUN yarn cache clean \ 
  rm node_modules/ \
  yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev" ]