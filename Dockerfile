FROM node:alpine AS dependencies
WORKDIR /usr/src/app/ops

COPY package.json yarn.lock ./
RUN yarn install

FROM node:alpine AS builder
WORKDIR /usr/src/app/ops

COPY . .
COPY --from=dependencies /usr/src/app/ops/node_modules ./node_modules
RUN yarn build

FROM node:alpine AS prod
WORKDIR /usr/src/app/ops

ENV NODE_ENV prod
ENV PORT 4000

# RUN npm install --only=production

COPY --from=builder /usr/src/app/ops/.next /usr/src/app/ops/.next
COPY --from=builder /usr/src/app/ops/public /usr/src/app/ops/public
COPY --from=builder /usr/src/app/ops/node_modules /usr/src/app/ops/node_modules
COPY --from=builder /usr/src/app/ops/package.json /usr/src/app/ops/package.json

EXPOSE ${PORT}

CMD yarn start