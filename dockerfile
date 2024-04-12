# FROM node:21-alpine

# WORKDIR /app

# COPY angular.json /app
# COPY package.json /app


# RUN npm install

# COPY . /app

# CMD [ "npm","start" ]




# # stage-1
# FROM node:latest as angular

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./



# # Copy the entire project to the container
# COPY . .

# # Install project dependencies
# RUN npm install

# # Build the Angular app for production
# RUN npm build


# # stage-2

# # Use a smaller, production-ready image as the final image
# FROM nginx:alpine

# # Copy the production-ready Angular app to the Nginx webserver's root directory
# # COPY --from=angular /app/dist/myapp /usr/share/nginx/html

# WORKDIR /usr/share/nginx/html
# COPY --from=angular /app/dist/myapp .

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]




# FROM node:latest as angular

# WORKDIR /app


# COPY . .

# RUN npm install
# RUN npm run build --production

# FROM nginx:alpine

# WORKDIR /usr/share/nginx/html

# COPY --from=angular /app/dist/myapp .

# CMD ["nginx", "-g", "daemon off;"]


FROM node:18.13.0-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build --production

# FROM nginx:stable
FROM node:18.13.0-slim

COPY --from=build /app/dist /myapp
# /usr/share/nginx/html

# CMD /usr/src/app/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck

EXPOSE 4200

CMD [ "npm","start" ]




