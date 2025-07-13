FROM node:20

WORKDIR /app
COPY packaage*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["node", "src/server.js"]