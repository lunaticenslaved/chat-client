FROM node:20 AS build

WORKDIR /app

COPY . .

RUN npm ci && npm run build

FROM nginx:1.25.3
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY --from=build /app/chat-client.conf /etc/nginx/conf.d/
