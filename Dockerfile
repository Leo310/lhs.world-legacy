FROM node AS builder
WORKDIR /app/
COPY . .
RUN npm ci --silent
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
