FROM node:12
WORKDIR /usr/src/ms-ilia-wallet
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 3001
CMD npm start