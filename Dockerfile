FROM node:18.16

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8899


CMD [ "node", "index.js" ]
