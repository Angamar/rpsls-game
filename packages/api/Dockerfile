FROM node:20-alpine

WORKDIR /app

# Enable Yarn 4
RUN corepack enable && corepack prepare yarn@4.1.1 --activate

COPY . .

WORKDIR /app/packages/api

RUN yarn install --immutable
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
