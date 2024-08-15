# Use the official Node.js image as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# Copy the built Next.js application from the builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port NGINX will run on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]