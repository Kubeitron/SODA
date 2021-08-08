# Security, Observability Dashboard and Analysis(SODA)

This is the frontend to a suite of apis that exposed health of various deployed
applications and their features in Kubernetes.

## Requirements

To run the this application you must have the following installed.

* npm v12+
* yarn 1.22.10+

If you have npm, you can easily grab yarn.
```bash
npm install -g yarn
```

## Web Design

This application was generated using nuxt.js. The design scheme is based on Vuetify, a material design derivative for Vue of course.

For detailed explanation on how things work from a functional level, check out [Nuxt.js docs](https://nuxtjs.org), and from a design level check out [Vuetify docs](https://vuetifyjs.com/).

## Build Setup

```bash
# install dependencies
$ yarn install

# create & setup environment variables
$ cp .env.template .env

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

