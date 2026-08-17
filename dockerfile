FROM node:20-alpine

COPY ./backend .

RUN npm install

CMD ["node", "server.js"]