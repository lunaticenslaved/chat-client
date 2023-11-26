FROM node:20 AS build
WORKDIR /app
COPY /src ./src
COPY /package.json .
COPY /package-lock.json .
COPY /tsconfig.json .
RUN npm ci \
    && npm run build

FROM nginx:1.25.3
COPY --from=build /app/dist/ /usr/share/nginx/html/
