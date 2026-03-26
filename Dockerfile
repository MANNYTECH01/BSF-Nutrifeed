# Use the official Node.js 22 image (matches your local version)
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose Port 5000 for the API
EXPOSE 5000

# Start the application
CMD ["node", "src/server.js"]