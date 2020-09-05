FROM node:lts-alpine as build-stage

RUN mkdir -p /home/node/server
WORKDIR /home/node/server

COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci

COPY . .
RUN npm run build

USER node

ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/index.js"]