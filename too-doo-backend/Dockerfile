FROM node:14-alpine as be-runner

WORKDIR /usr/src/too-doo-app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8000

CMD ["npm", "run", "prod"]
