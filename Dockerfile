FROM node:carbon-alpine

RUN mkdir -p /front
WORKDIR /front

COPY package.json .
RUN npm i
COPY . .
RUN ["npm", "run", "build"]


FROM nginx:stable-alpine
RUN mkdir -p /usr/share/nginx/html

COPY --from=0 /front/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN chown -R nginx:nginx /usr/share/nginx/

