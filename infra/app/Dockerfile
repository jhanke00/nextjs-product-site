FROM node:18-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . /app

FROM base AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base
COPY --from=dev-deps /app/node_modules /app/node_modules
EXPOSE 3000
USER node
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1
CMD [ "pnpm", "dev"]