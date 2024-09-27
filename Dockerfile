# Create image based on node:21.7.1-alpine
FROM node:21.7.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn install

# Copy app source code
COPY . .

# Expose port and start application
EXPOSE 3000

ENV NODE_ENV=production

CMD ["yarn", "start"]