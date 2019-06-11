# Project Name

> Related Home carousel

## Related Projects

  - https://github.com/fec4/vo-SDC-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> serve service: npm run start
"start": "nodemon --ignore node_modules server"

service runs on port :3001

App will render to div with #id: 'related'

## Requirements


An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node version >=6.13.0 (10.15.1)
- "dependencies": {
    "lodash": "^4.17.4",
    "bluebird": "^3.3.4",
    "body-parser": "^1.17.0",
    "express": "^4.15.0",
    "mongoose": "^4.9.6",
    "react": "^15.4.2",
    "react-dom": "^15.4.2"
  }
- "devDependencies": {
    "babel-core": "^6.23.1",
    "babel-loader": "^6.3.2",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.23.0",
    "webpack": "^2.2.1",
    "eslint-config-hackreactor": "git://github.com/reactorcore/eslint-config-hackreactor"
  }

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## API

POSTing to /homes
- this would allow user to add a new picture/listing to the database

GET to /homes
- this would return the most recent listings

PUT to /homes
- this would update the listing matching the listing ID of the request

DELETE to /homes
- this would remove a listing matching the listing ID of the request

GET to /related
- GET requests to this endpoint will query the database with homes matching the query
- or homes within the area of search
