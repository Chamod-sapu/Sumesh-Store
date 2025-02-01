# Use a valid Node.js version
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port to run application
EXPOSE 5173

CMD ["npm", "run", "dev"]
