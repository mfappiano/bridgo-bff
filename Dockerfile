FROM node:20-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package.json yarn.lock newrelic.js ./
COPY tsconfig.base.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
COPY package.json yarn.lock newrelic.js ./
RUN yarn install --frozen-lockfile --production
EXPOSE 8080

CMD yarn start
