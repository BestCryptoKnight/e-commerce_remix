FROM node:16-alpine
WORKDIR /usr/server/app

COPY ./package.json ./
RUN npm install --legacy-peer-deps

COPY ./ .

ENV API_URL=https://api.dev.anyaa.io/graphql
RUN npm run build:css
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run" ,"start"]
