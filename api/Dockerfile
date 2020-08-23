FROM node:alpine as development
RUN apk add --no-cache bash
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:alpine as prod
WORKDIR '/app'
COPY ./package*.json ./
RUN npm install --only=production
COPY --from=development /app/dist ./dist
CMD ["node", "dist/main"]