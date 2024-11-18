FROM node:21.4.0-alpine

WORKDIR /usr/src/app


COPY package*.json ./
COPY prisma ./prisma/


RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000 

CMD [ "npm", "start" ]