FROM node:24

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o código
COPY . .

# Instala TSX globalmente (opcional)
RUN npm install -g tsx

EXPOSE 3333

# Rodar com tsx watch
CMD ["npm", "run", "dev"]
