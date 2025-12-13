# ---------- BASE IMAGE ----------
FROM node:22-alpine AS base
RUN apk add --no-cache g++ make python3 libc6-compat
WORKDIR /app
EXPOSE 3000

# ---------- BUILD STAGE ----------
FROM base AS builder
WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the source code
COPY . .

# Copy .env for Prisma generation
COPY .env* ./

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Add non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001 -G nodejs
USER nextjs

# Copy necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env* ./

# Start the app
CMD ["npm", "start"]
