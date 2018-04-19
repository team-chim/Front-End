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
$ docker build -t db/front .
```
This will create a docker image named `db/front`.

Then create and run a container using
```
$ docker run -p 8000:8000 --link db-backend:db-backend --name node-db --rm -it db/front
```
This will link with an existing `db-backend` without exposing `db-backend` publicly.