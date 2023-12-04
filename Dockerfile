FROM node:20

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apt update
RUN apt add git

# copy the app, note .dockerignore
COPY /app /usr/src/nuxt-app/
RUN npm cache clean --force
RUN npm update --legacy-peer-deps
RUN npm audit fix --force
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
