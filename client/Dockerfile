FROM node:lts-alpine as build-stage

RUN mkdir -p /root/client
WORKDIR /root/client

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /root/client/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]