FROM node:16-alpine
WORKDIR /usr/server/app

COPY ./package.json ./
RUN npm install --legacy-peer-deps

COPY ./ .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run" ,"start"]
