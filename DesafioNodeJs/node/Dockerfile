
FROM node:18-alpine

WORKDIR /usr/src/app

# Instalação do Dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package*.json ./

RUN npm install 


COPY . .

EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]
