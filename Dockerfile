# Pull base image.
FROM ubuntu:18.04

# Install Node.js
RUN apt install curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt install nodejs

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 3005
CMD [ "npm", "start"]
