# Pull base image.
FROM ubuntu:18.04

# Install Node.js
RUN apt-get install --yes curl
#RUN curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 3005
CMD [ "npm", "start"]
