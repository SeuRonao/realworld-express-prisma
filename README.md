# ![RealWorld Example App](logo.png)

> ### Typescript + Express + Prisma codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://TODO)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://TODO)

This codebase was created to demonstrate a backend built with **Typescript + Express + Prisma** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Typescript** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

The project is build using [TypeScript](https://www.typescriptlang.org/) for language, [Express](https://expressjs.com/) for routing and server framework and [Prisma](https://www.prisma.io/) as an _ORM_.

For the moment the project uses [SQLite](https://www.sqlite.org/index.html) as database with plans to move to [PostgreSQL](https://www.postgresql.org/) when the api is ready.

For unit testing we use the [Jest](https://jestjs.io/) framework since it is what is promoted by prisma team to mock testing function that change the database.

# Getting started

To run this project you should have _node/npm_ installed.

Run `npm install` to install the dependencies.

Create a development environment file `.env.development` inside the root folder with the following attributes:

```
DATABASE_URL=file:./dev.db
JWT_SECRET=theSecretForCreatingTheJWT
NODE_ENV=development
```

- To update the database in development mode use `npm run migrate:develop`
- To run the development version `npm run develop`.
- To test the application `npm test`.
- To build a production version `npm run build`.
- To run the production build `npm run start`.
