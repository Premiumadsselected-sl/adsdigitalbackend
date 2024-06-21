# Use Node.js image
FROM node:current-alpine

# Build NestJS application
WORKDIR /
COPY . .

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies and build the project
RUN pnpm install

# Expose port
# EXPOSE 8080

# Run application
CMD ["pnpm", "start:prod"]