# Use the official Node.js 16 image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the application port (default is 3000)
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
