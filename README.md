# db-proj

> Team Chim DB Proj

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev or yarn dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).


## Production Docker

Build the docker image using:
```
sudo docker build -t db/front .
```

Then create and run a container using:
```
sudo docker run -p 8000:8000 --name node-db --rm -it db/front
```
