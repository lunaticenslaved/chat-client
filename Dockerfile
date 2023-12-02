FROM node:20 AS build

WORKDIR /app

COPY . .

RUN npm ci \
    && npx prisma generate \
    && npm run build \
    && npm prune --production \
    && rm -rf src

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist 
COPY --from=build /app/prisma /app/prisma 
COPY --from=build /app/package.json /app
RUN apk add --no-cache openssl \
    && npm i --omit=dev \
    && npx prisma generate

USER 1000
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
