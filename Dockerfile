FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm install-client --only=production

RUN npm --prefix client run build

RUN npm install-server --only=production

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000
