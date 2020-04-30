FROM node:alpine

RUN mkdir -p /root/client
WORKDIR /root/client

COPY . /root/client
RUN npm install

EXPOSE 8080

CMD ["npm", "run serve"]