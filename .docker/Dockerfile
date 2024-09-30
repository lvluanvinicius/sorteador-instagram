# Use a imagem oficial do Node.js 22.2.0 como base
FROM node:22.2.0 AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências, incluindo as devDependencies para o build do Prisma
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Gera os arquivos do Prisma
RUN npx prisma generate

# Gera os arquivos estáticos para produção (Next.js)
RUN npm run build

# Remove devDependencies para otimizar a imagem final
RUN npm prune --production

# Cria uma nova imagem para o ambiente de produção
FROM node:22.2.0 AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários do estágio anterior
COPY --from=builder /app ./ 

# Exponha a porta que o Next.js usa
EXPOSE 3000


# Define o comando para iniciar a aplicação
CMD ["npm", "start"]
