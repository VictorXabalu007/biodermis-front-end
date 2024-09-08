# Etapa de build
FROM node:18 AS builder

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Etapa para servir o build com http-server
FROM node:18-alpine AS production

# Instale o servidor HTTP
RUN npm install -g http-server

# Diretório de trabalho
WORKDIR /app

# Copie o build da etapa anterior
COPY --from=builder /app/dist /app

# Exponha a porta que o servidor irá escutar
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["http-server", "-p", "8080"]
