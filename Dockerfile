FROM node:20
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . /usr/src/nuxt-app
RUN npm i
RUN npm cache clean --force
RUN npm run build

EXPOSE 3000 

CMD ["npm", "run", "dev"]