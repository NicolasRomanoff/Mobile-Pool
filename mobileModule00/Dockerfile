FROM node:22

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /mobileModule00

# Copy root files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY eslint.config.js ./

COPY app ./app
COPY assets ./assets

RUN pnpm i --frozen-lockfile
RUN pnpm lint

CMD ["pnpm", "run", "web"]