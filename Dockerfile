FROM node:23-alpine

# set working directory
WORKDIR /app

# copy the Sumesh Ayya Hardware folder
COPY Frontend/ /app

# install dependencies
RUN npm install

# run the app
CMD ["npm", "run", "dev"]