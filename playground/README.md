# Playground 101

## Purpose

To offer a simple way to experiment this module.

Might be useful for testing aswell?

## How-to?

Inside the playground folder, do these commands:

### Copy the .env file

```
$ cp .env.example .env
```

### Start the Meilisearch engine

```bash
$ docker-compose up -d
```

### Seed the database with dummy datas
```
$ node data/index.js
```

After these commands, you can execute the regular commands :

```
$ npm run dev:prepare
$ npm run dev
```

To start the playground in dev mode.