FROM node:alpine
RUN apk add --no-cache bash
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install 
COPY . .
RUN npm run build
CMD ["./wait-for-it.sh", "$DB_HOST:5432", "--", "npm", "run", "start:prod"]