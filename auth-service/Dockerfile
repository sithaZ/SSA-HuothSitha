FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV PORT=
EXPOSE 

CMD ["node", "dist/main.js"]
