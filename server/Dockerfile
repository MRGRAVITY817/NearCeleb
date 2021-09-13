# Stage 1. Build from base image
FROM node:lts-alpine3.10 AS builder
LABEL maintainer="Hoon Wee <mrgravity817@gmail.com>"
# Get env
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm i -g @nestjs/cli
# server specific
COPY . .
RUN npm run build 

# Stage 2: Run server
FROM node:lts-alpine3.10 AS runner

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=builder /app ./

CMD ["npm", "run", "start:prod"]