# -------------------> for overall <-------------------
    # step-1: build the frontend [Creates dist folder]
    # build the bakcked
    # step-2: copy the dist folder from frontend to the backend/public folder

# step-1: build the frontend
FROM node:20-alpine as frontend-builder

COPY ./frontend /app

WORKDIR /app

RUN npm install

RUN npm run build

# step-2: build the backend
FROM node:20-alpine

COPY ./backend /app

WORKDIR /app

RUN npm install

#step-3: copy the dist folder from frontend to the backend/public folder
COPY --from=frontend-builder /app/dist /app/public

CMD ["node", "server.js"]
