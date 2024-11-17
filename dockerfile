FROM node:21.4.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000 

CMD [ "npm", "start" ]