FROM node:18
workdir /app

COPY package.json package-lock.json ./

RUN npm install

copy ./ ./

COPY .env .env
Expose 3000
CMD ["npm","start"]