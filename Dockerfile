FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm --force ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]