# syntax=docker/dockerfile:1

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production
RUN npm install

RUN mkdir ./dist/

COPY ./.env ./.env

# COPY ./.env.deployed ./.env.deployed

COPY ./dist/ ./dist/

EXPOSE 8080

CMD [ "node", "dist/main.js" ]

# docker build -t nest-app .
# docker run --rm -h nest --name nest -p 0.0.0.0:8080:8080 nest-app
# -e PRIVATE_KEY="..."
# -e RPC_ENDPOINT_URL="https://eth-sepolia.g.alchemy.com/v2/..."
