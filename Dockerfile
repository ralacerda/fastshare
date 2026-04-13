ARG NODE_VERSION=24.14.1

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack enable

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY ./package.json /app/
COPY ./pnpm-lock.yaml /app/

## Install dependencies
RUN pnpm install --shamefully-hoist

# Copy the rest of the application files to the working directory
COPY . ./

# Build the application
RUN pnpm run build

# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim

# Set the working directory inside the container
WORKDIR /app

# Install minimal dependencies required for runtime migrations
RUN npm install -g drizzle-kit@0.31.4 drizzle-orm@0.44.2 @libsql/client@0.15.9

# Copy the output from the build stage to the working directory
COPY --from=build /app/.output ./

# Copy Drizzle migration setup for runtime migrations
COPY --from=build /app/drizzle.config.ts /app/
COPY --from=build /app/drizzle /app/drizzle

# Define environment variables
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Expose the port the application will run on
EXPOSE 3000

# Run migrations on startup, then start the application
CMD ["sh","-c","drizzle-kit migrate --config=drizzle.config.ts && node /app/server/index.mjs"]