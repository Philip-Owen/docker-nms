FROM node:alpine as build

ADD package*.json /app/

WORKDIR /app

RUN npm install

ADD . /app

RUN npm run build


FROM nginx

EXPOSE 80

COPY --from=build /app/build /usr/share/nginx/html