FROM node:latest

RUN mkdir -p /src/app/
WORKDIR /src/app/
COPY app.js /src/app/
COPY package.json /src/app/
RUN npm install

CMD ["node", "/src/app/app.js"]