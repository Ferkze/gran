FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.prod.json .
RUN npm ci --only=production
ENV NODE_ENV=production

COPY . .
RUN npm install -g typescript
RUN npm run build

ENV PORT=80

EXPOSE 80

CMD ["npm", "start"]