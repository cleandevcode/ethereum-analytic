# Step 1
FROM node:10-alpine as build-step
RUN mkdir /
WORKDIR /
COPY package.json /
RUN npm cache clean --force && npm cache verify
RUN npm install
COPY . /
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
 
# Stage 2
#FROM nginx:1.17.1-alpine
#COPY --from=build-step /build /usr/share/nginx/html