FROM node:18.19.0 AS base
WORKDIR /app

# Build BASE
FROM base as deps

WORKDIR /app
COPY package.json ./
RUN apt update \
    && apt install git python3 make g++ -y \
    && yarn install --ignore-scripts \
    && yarn cache clean

# Build Image
FROM base AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ARG NEXT_FILE_ENV=production
ENV NEXT_FILE_ENV=$NEXT_FILE_ENV
COPY . .
COPY public .

# COPY ./.env.$NEXT_FILE_ENV ./.env.production

RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

EXPOSE 8080
CMD ["npm", "start"]
