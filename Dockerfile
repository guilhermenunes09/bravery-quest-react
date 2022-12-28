FROM node:16-alpine

WORKDIR /app/frontend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001