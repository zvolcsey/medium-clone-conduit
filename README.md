# ![RealWorld Example App](logo.png)

> ### TypeScript + React + Redux Toolkit + NodeJS + Express + PostgreSQL codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### Demo (on the Todo list)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **TypeScript + React + Redux Toolkit + NodeJS + Express + PostgreSQL** including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# Content

1. [How it works](#how-it-works)
   1. [General functionality](#general-functionality)
   2. [Routing Guidelines](#routing-guideline)
   3. [Application structure](#application-structure)
   4. [Dependencies](#dependencies)
   5. [Authentication](#authentication)
   6. [Error handling](#error-handling)
2. [Getting Started](#getting-started)
   1. [Run locally](#run-locally)
   2. [Port](#port)
3. [Contributing](#contributing)
4. [License](#license)

# How it works

## General functionality

I added to my project the functionalities, that was in the [general functionalities](https://realworld-docs.netlify.app/docs/implementation-creation/features) on the [RealWorld website](https://realworld-docs.netlify.app/)

## Routing Guidelines

I added to my project the routes, that was in the [routing guideline](https://realworld-docs.netlify.app/docs/specs/frontend-specs/routing) on the [RealWorld website](https://realworld-docs.netlify.app/)

## Application structure

### Client

<mark>index.tsx, index.css</mark> - The entry point of the client.

<mark>App.tsx</mark> - The main component of the component tree. This contains the main layout route and other routes.

<mark>app/</mark> - This folder contains

- the types of the client side,
- create instance function of axios package,
- constants,
- hooks definitions and
- store.ts file for Redux Toolkit.

<mark>components/</mark> This folder contains

- compnents and
- css files.

<mark>features/</mark> - This folder contains

- the feature related components
- css files and
- feature related redux slice and API files.

<mark>pages/</mark> - This folder contains

- the page related components and
- css files.

<mark>utils/</mark> - This folder contains the utility functions of client side.

### Server

<mark>app.ts</mark> - The entry point of the client. This file contains

- express server definition and
- binding of setHeaders, errorHandler middleware and routing.

<mark>controller/</mark> - This folder contains controller functions.

<mark>db/</mark> - This folder contain db.ts file, that create a new Pool.

<mark>middleware/</mark> - This folder contains middleware functions.

<mark>models/</mark> - This folder contains functions that communicate with the database and queryTexts.ts file. There are sql queries in the queryText.ts.

<mark>routes/</mark> - This folder contains the route functions. The app use Express Router.

<mark>types/</mark> - This folder contains the types of the server side.

<mark>utils/</mark> - This folder contains the utility functions of server side.

## Dependencies

### Client

- Basic react packages
  - <mark>react, @types/react</mark>
  - <mark>react-dom, @types/react-dom</mark>
  - <mark>react-scripts</mark>
  - <mark>@types/node</mark>
- <mark>typescript</mark> - The app use TypeScript.
- <mark>react-markdown</mark> - For rendering the article body.
- Redux Toolkit
  - <mark>reduxjs/toolkit</mark> - The app use Redux Toolkit.
  - <mark>react-redux, @types/react-redux</mark> - For connection between React and Redux.
- <mark>react-router-dom</mark> - For the routing using React Router package version 6.
- <mark>axios</mark> - For the requests using axios package.
- Font Awesome
  - <mark>fortawesome/fontawesome-svg-core</mark> - For using SVG icons.
  - <mark>fortawesome/free-solid-svg-icons</mark> - For using free solid icons from Font Awesome package.
  - <mark>fortawesome/free-regular-svg-icons</mark> - For using free regular icons from Font Awesome package.
  - <mark>fortawesome/react-fontawesome</mark> - For using FontAwesomeIcon component.
- Testing
  - <mark>@types/jest</mark>
  - <mark>testing-library/jest-dom</mark>
  - <mark>testing-library/react</mark>
  - <mark>testing-library/user-event</mark>

### Server

- <mark>typescript</mark> - The app use TypeScript.
- <mark>express, @types/express</mark> - The app use Express framework.
- <mark>bcrypt, @types/bcrypt</mark> - For hashing the password.
- <mark>dotenv</mark> - For the env variables in the server side.
- <mark>jose</mark> - For the jwt authentication.
- <mark>pg, @types/pg</mark> - For the connection to the postgres database.
- <mark>randomstring, @types/randomstring</mark> - For create unique ids and resource ids.
- <mark>slugify</mark> - For create URL friendly slug from title.
- <mark>ts-node-dev</mark> - For the running the server.

## Authentication

The app use for the authentication JWT Token.
The request header has Authorization property. This property contain a string or null.
The string looks like:

```
'Token (the value of the token)'
```

The app use Express Router for the routes. The routes can contain

- authRequired or
- authOptional middleware.

The authRequired middleware check the token is exist or not. Verify the token with jwt verifyToken method and get the payload with the user data, if the token exist. The username will be searched in the database and add to the req.user or throw an error message with status code 401.

The authOptional middleware is same as the authRequired middleware, but add to the req.user a null value, if token is not exist.

Sign Token method of JWT use for create a token.

## Error Handling

The app use classes for the Errors. Each Error has

- an id (type: string),
- a name (type: string) and
- a message (type: string) properties.

The errorHandler middleware return a json with status code based on the error classes or in default case with status code 500.

The returned error looks like:

```json
{
  "errors": {
    "body": [
      {
        "id": "KHDLKkjdfk",
        "name": "Not Found Error",
        "message": "User is not found"
      }
    ]
  }
}
```

## Input Validation

The given inputs on the client side are validate on the server side. The input validation functions have check functions, that return an array.
This array looks like:

```json
[
  {
    "id": "KHDLKkjdfk",
    "text": "Username must be between 6 and 15 characters"
  }
]
```

The input validation function run the next function if there are not errors. If there are errors throw an error message with status code 422.

# Getting started

## Run locally

```
  Clone this repo
  npm ci
  open client folder in the terminal
  npm start
  open server folder in the terminal
  npm run dev
```

## Port

Client use port 3000 and server use port 8080.

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what would like to change.

# License

MIT
