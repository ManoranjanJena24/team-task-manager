# FROM node:22-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5000

# CMD ["npm", "start"]


FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x start.sh

EXPOSE 5000

CMD ["sh", "start.sh"]