FROM node:alpine

RUN mkdir -p /root/server
WORKDIR /root/server

COPY . /root/server
RUN npm install

EXPOSE 5000

CMD ["npm", "run dev"]