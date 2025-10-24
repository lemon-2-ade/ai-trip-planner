# Build the Next.js application
FROM node:20-slim AS builder
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Create the final production image
FROM node:20-slim
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Set environment and port (Next.js defaults to 3000)
ENV NODE_ENV production
EXPOSE 3000

# Start the application
CMD ["npm", "start"]