# Etapa de build
FROM node:20 AS builder

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Execute o build da aplicação
RUN npm run build

EXPOSE 4173

# Comando para iniciar o NGINX
CMD ["npm", "run", "preview"]
