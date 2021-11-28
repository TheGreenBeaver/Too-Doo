FROM node:12-alpine as fe-builder

WORKDIR /usr/src/too-doo-fe

COPY package.json .

COPY yarn.lock .

RUN yarn install --production

COPY . .

RUN yarn build

COPY . .

FROM nginx

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=fe-builder /usr/src/too-doo-fe/build/ /usr/share/nginx/html