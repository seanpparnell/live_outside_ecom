# Use an official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Install frontend dependencies and build the React app
RUN npm install --prefix frontend
RUN npm run build --prefix frontend

# Expose port 5000 for backend (Node.js) and port 3000 for frontend (React)
EXPOSE 5000
EXPOSE 3000

# Command to start the server
CMD ["npm", "run", "start"]
