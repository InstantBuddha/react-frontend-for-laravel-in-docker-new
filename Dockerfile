FROM node:21-alpine

WORKDIR /react-frontend

# The following line is actually useful when we change the node version
COPY /react-frontend/package*.json ./   

RUN npm install

CMD ["npm", "start"]