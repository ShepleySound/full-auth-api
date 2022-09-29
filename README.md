# Server - Bearer Auth

Author: Robert Shepley
<!-- Replace URL's and add more necessary links -->
- [Tests Report](https://github.com/ShepleySound/bearer-auth-server/actions)
- [Assignment Pull Request](https://github.com/ShepleySound/bearer-auth-server/pull/1)
- [Heroku Prod Deployment](https://shepley-bearer-auth.herokuapp.com/)

## Setup

### Running the application locally

- Ensure PostgreSQL is setup on your machine, and that you have an existing user with createdb permissions.

- Clone the repository to your local machine, then run the following commands in your terminal -

  ```bash
    npm install
    npm run db:config
    npm run db:create
    touch .env
  ```

- Add the following lines to the newly created `.env` file.

  ```text
  PORT=<port number>
  SECRET=<AStringToBeKeptSecret>
  ```

- In the `config/config.json` file, set your username and password under the 'development' entry. Keep in mind, these both must be wrapped in double quotes.

- Run the following command -

  ```bash
    npm start
  ```

- Congratulations! You should now be able to access the application in your browser by navigating to `http://localhost:PORT/`, with `PORT` being the port number that you specified in the .env.

## API

### /signup

#### POST

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | OK |
| 401 | Unauthorized |

### /signin

#### POST

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 401 | Unauthorized |

##### Security

| Security Schema
| --- |
| BasicAuth |

### /users

#### GET

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 403 | Unauthorized |

##### Security

| Security Schema
| --- |
| BearerAuth |

### /secret

#### GET

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 403 | Unauthorized |

##### Security

| Security Schema
| --- |
| BearerAuth |

## Tests

- Unit Tests: `npm run test`

## Structure Diagram

(Created with [app.diagrams.net](https://app.diagrams.net/))

![Diagram](./bearer-auth-uml.png)
