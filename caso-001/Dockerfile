FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

# Exponer puerto
EXPOSE 3000

CMD ["npm", "run", "dev"]
