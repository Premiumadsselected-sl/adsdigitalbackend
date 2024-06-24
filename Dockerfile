# Use Node.js image
FROM node:current-alpine
# Build NestJS application
WORKDIR /
COPY package.json pnpm-lock.yaml ./

# Install dependencies and build the project
RUN npm install -g pnpm
RUN pnpm install

COPY prisma/* ./
COPY . .

# Expose port
# EXPOSE 8080

# Run application
CMD ["node", "/dist/main.js"]





