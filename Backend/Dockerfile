# Using base image from Docker Hub
FROM node:21.7.1

# Set working directory
WORKDIR /app

# Copy package.json file
COPY package.json ./

# installing dependencies
RUN npm install

# copy all files
COPY . .

# expose the port to run application
EXPOSE 5000

CMD ["npm" ,"start"]