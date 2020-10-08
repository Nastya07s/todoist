FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "./dist/index.js"]
