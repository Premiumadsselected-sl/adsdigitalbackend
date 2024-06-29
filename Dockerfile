# Use Node.js image
FROM node:current-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy source files
COPY . .

# Build the project
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Run the application
CMD ["node", "dist/main"]