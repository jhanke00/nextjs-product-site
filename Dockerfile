# Usar a imagem oficial do Node.js como base
FROM node:18-alpine

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Instalar PNPM globalmente
RUN npm install -g pnpm

# Copiar os arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar as dependências usando PNPM
RUN pnpm install

# Copiar todo o código da aplicação para o contêiner
COPY . /app/.

# Construir a aplicação
RUN pnpm build

# Expor a porta 3000, onde a aplicação Next.js vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["pnpm", "start"]
