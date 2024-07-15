FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src .

ENV PORT 4000

EXPOSE 4000

CMD ["npm", "run", "dev"]
