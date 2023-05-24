FROM node:14.17.5

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

COPY . .

# ENTRYPOINT ["npm", "install"]
CMD ["npm", "run", "serve"]
