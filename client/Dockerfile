# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:lts-alpine
LABEL maintainer="Hoon Wee <mrgravity817@gmail.com>"

WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install

COPY . .

# Build the app
RUN npm run build

ENTRYPOINT []
CMD [ "npm", "run", "start" ]
