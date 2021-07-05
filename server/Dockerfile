FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json .
RUN npm install
ENV NODE_ENV=production

COPY . .
RUN npm run build

ENV PORT=80

EXPOSE 80

CMD ["npm", "start"]