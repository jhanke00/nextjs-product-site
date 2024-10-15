# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml before other files
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Command for development mode
CMD ["pnpm", "dev"]