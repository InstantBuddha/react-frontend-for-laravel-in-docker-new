FROM node:21-alpine

WORKDIR /react-frontend

# The following line is actually useful when we change the node version
# or alternatively copy .. might work as well
COPY /react-frontend/package*.json ./

RUN npm install

CMD ["npm", "start"]