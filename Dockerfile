FROM node:15 AS builder
COPY . /app
WORKDIR /app
RUN yarn && \
    yarn build
CMD yarn run ncm-pm-run
