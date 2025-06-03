# Imagem base do Node.js
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install
RUN apt-get update && apt-get install -y  netcat-traditional

# Copia o restante da aplicação
COPY . .

# Expondo a porta que o Fastify vai rodar
EXPOSE 5000

RUN npx prisma generate

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
