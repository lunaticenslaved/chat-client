FROM node:20 AS build

WORKDIR /app

COPY . .

RUN npm ci \
    && npx prisma generate \
    && npm run build \
    && npm prune --production \
    && rm -rf src

USER 1000
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
