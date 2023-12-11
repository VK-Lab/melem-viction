# Base image
FROM node:16.16.0 as build

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

ENV NODE_ENV=development

# Creates a "dist" folder with the production build
RUN yarn build


FROM node:16.16.0 as runner

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
