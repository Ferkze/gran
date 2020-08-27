FROM node:lts-alpine as build-stage

RUN mkdir -p /home/node/server
WORKDIR /home/node/server

COPY package*.json ./
# RUN npm install'
ENV NODE_ENV=production
RUN npm ci

COPY . .
RUN npm run build

USER node

FROM node:lts-alpine as production-stage
COPY --from=build-stage /home/node/server/dist /home/node/server/
COPY --from=build-stage /home/node/server/node_modules /home/node/server/

CMD ["node", "index.js"]