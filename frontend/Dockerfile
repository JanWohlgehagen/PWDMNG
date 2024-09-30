FROM node:20-alpine as angular
WORKDIR /app
COPY package*.json ./
# npm ci is prefered to npm i because it does not bump versions thereby increating reproducibility.
# This means you have to run NPM i manually if you update or add dependancies!
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=angular ./app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80