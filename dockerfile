# Etapa 1: Build
FROM node:20 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração e o código fonte
COPY package*.json ./

# Instala as dependências
RUN npm install

COPY ./ ./

# Executa o build da aplicação
RUN npm run build

# Etapa 2: Serve com NGINX
FROM nginx:alpine

# Copia os arquivos estáticos gerados para o diretório do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração personalizada do NGINX, se houver
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
