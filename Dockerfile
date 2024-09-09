FROM node:20-alpine AS base
WORKDIR /home/app
ENV NODE_ENV prod

FROM base AS deps
COPY package.json .
RUN yarn --verbose

FROM base AS build
COPY . .
COPY --from=deps /home/app/node_modules ./node_modules
RUN yarn build

FROM base AS release
COPY --from=deps  /home/app/package.json .
COPY --from=deps  /home/app/node_modules ./node_modules/
COPY --from=build /home/app/dist ./dist/
ENV TZ="Asia/Tehran"
EXPOSE 3000
ENTRYPOINT ["node", "--trace-exit", "--trace-sigint" , "--trace-uncaught", "--trace-warnings" , "dist/main.js"]
