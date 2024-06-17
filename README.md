
## Installation

The use of nvm tool is recommended, firstly switch to the right node version by running

```bash
nvm use
```
and then install all the required dependencies

```bash
$ npm install
```

## Running the app

Set up environment variables with default setup
```bash
cp .env.dist .env
```
and run services needed by the application instance with docker
```bash
# run services
docker compose -f docker-compose-dev-deps.yml up -d

# apply db migrations
npm run migrate:up
```

then you will be able to just run the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash
# run
npm run migrate:up

# revert
npm run migrate:down

# create new migration
npm run migrate:generate <name> -- --sql-file

```

## FAQ

#### Why everything is pushed directly to master?
There is no reason to use any cool branching strategy for a sample app

#### Why "episodes" are not a separate table in the database?
Of course it would be better to have episodes as a separate database table and just connect
them with characters by many-to-many relationship. But let's remember this is an example app
and for this use case having episodes as enum is enough

#### Why you did not provide the configuration for running the app in docker?
Because I find it easier to run node outside the container. Mainly because 
debugging is more productive for me then

#### Why Swagger is enabled in production build?
The repository is just a simple example. For production use cases the Swagger endpoint should
be disabled or properly protected

#### Why UUIDs were used as primary keys?
It is a fact that UUID primary keys can affect database performance, but it also a convenient
way to model domain in code so I am gonna accept this tradeoff for now

#### Why e2e tests are taking so long?
First run of e2e tests may take a little bit longer because `testcontainers` need to download
the required docker images, e.g. database image

#### Why you do not use `index.ts` files?
I believe that `index.ts` files are not necessary and may cause hard to find and debug
circular dependencies issues

#### Why there is no healthcheck configured?
Once again this is an example app. Of course for production use a proper healthcheck should be configured.
Fortunately, it is not a problem because nest.js provides extensive support for this mechanism

#### Why migrations generate so many files?
I prefer to have control over my data stores, so SQL usage is my tool instead of using some
JS abstractions over DB queries. `db-migrate` is not an ideal tool but it is not bad either

Every `npm run migrate:generate <name>` generates three files:
- `xxx-<name>.js` - which should not be changed, it is automatically created and is responsible
  for executing sql migration files
- `sqls/xxx-<name>-up.sql` - File that will be executed with `npm run migrate:up` command
- `sqls/xxx-<name>-down.sql` - Equivalent of the above file for `npm run migrate:down` command