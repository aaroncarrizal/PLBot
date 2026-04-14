# Use the official Bun image.
FROM oven/bun:1

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the package.json and bun.lockb files.
COPY package*.json ./

# Install the dependencies.
RUN bun install

# Copy the rest of the application files.
COPY . .

ARG TOKEN
ARG CLIENT_ID
ARG MONGO_URI

ENV TOKEN=${TOKEN}
ENV CLIENT_ID=${CLIENT_ID}
ENV MONGO_URI=${MONGO_URI}

# Deploy slash commands.
RUN bun run deploy

# Command to run the application.
CMD [ "bun", "run", "start:prod" ]
