HostMaker properties api example
===

A simple Web Api that allows the user to manage HostMaker properties details.

* [Requirements](#requirements)
* [Installation](#installation)
* [Setup database](#setup-database)
* [Run](#run)
* [Tests](#tests)
    * [Unit tests](#unit-tests)
    * [Integration tests](#integration-tests)
* [Docs](#docs)
    * [js docs](#js-docs)
    * [api docs](#api-docs)
* [Coverage](#coverage)
* [Build](#build)
* [Api Endpoints](#api-endpoints)


### Requirements

* To run this application you will need a node version `>= 8.0.0` to run the new features from node.

    * Download one of the follows `Node Version Managers` to manage the node versions easily:
        * [nvm](https://github.com/creationix/nvm/blob/master/README.md)
        * [n](https://github.com/tj/n)

* Also needs MySQL driver
    * Download MySQL driver [here](https://dev.mysql.com/downloads/mysql/) and follow the instructions.
### Installation

In one folder execute the following commands on the terminal

```bash
    $ git clone https://github.com/rubengomex/hostmaker-property-details-api-example.git
```

```bash
    $ npm i
```

### Setup database

To setup the local database you will need to run the following command after the installation of the modules in the package

```bash
    $ npm run setup:db
```
By default the mysql user config is set with:
```json
    "CLIENT_DB": {
        "user": "root",
        "password": "",
        "database": "hostmaker_example",
        "host": "localhost"
    }
```

And database name with:
```json
    "DB_NAME": "hostmaker_example"
``` 

You can change the database name and the mysql user config by changing the values of the properties on the `config.json` file and running again `npm run setup:db` command. You can find the `config.json` file by going to the `src` folder of the project.

### Run

You can run the api by executing the following command

```bash
    $ npm start
```

By default the `port` is set to `3000`, but again you always can change the `config.json` in the `src` folder to follow your needs.

If you want to run eslint as well when you start the app to perhaps, implementing more features, you can run the following command:

```bash
    $ npm run start:dev
```

This will run the app and checks for linting errors as soon that you try developing more features on the project.

### Tests

You can find two kinds of tests, `unit tests` and `integration tests`.

#### Unit tests

The unit tests are only testing the logic of the code without any connection with database.

You can run the unit tests by running the follow command:

```bash
    $ npm run test:unit
```

#### Integration tests

The integration tests are testing the interaction with the endpoints requested and database calls and responses.

You can run the integration tests by running the follow command:

```bash
    $ npm run test:integration
```

**Notes**

* You can run the two kinds of tests simultaneously by running:
```bash
    $ npm t
```

* If you are developing the unit tests and you will be glad to save the file and re run the unit tests you can do it by running:
```bash
    npm run test:watch
```

### Docs

You can generate two kinds of docs, the `js docs` that will document the business code logic, and the `api docs` that will document the api.

#### Js docs

* You can generate the `js docs` by running:
```bash
    $ npm run build:jsdocs
```

* After you can see the generated docs by running:
```bash
    $ npm run show:jsdocs
```

#### Api docs

* You can generate the `api docs` by running:
```bash
    $ npm run build:apidocs
```

* After you can see the generated docs by running:
```bash
    $ npm run show:apidocs
```

**Notes**

* If you want to run both at the same time you can by running:
```bash
    $ npm run build:docs
```

* You can see the both generated docs by running:
```bash
    $ npm run show:docs
```

### Coverage

The coverage are generate by using `istanbul` module and every time that the `js docs` and `api docs` command are executed.

You can see the code coverage of the application by running:
```bash
    $ npm run show:coverage
```

### Build

You can build the application by running
```bash
    $ npm run build 
```

This is a command that will build the `js docs`, `api docs`, run the eslint through all the source code, run `unit` and `integration` tests, show the `coverage`, `js docs` and `api docs` generated.


### Api Endpoints

* Api Available endpoints:

| Method   | EndPoint                   | Description |
|----------|----------------------------|-----------------------------------|
| GET      | /properties                | Get all properties                |
| GET      | /properties/:id            | Get a property                    |
| GET      | /properties/:id/versions   | Get the versions of the property  |
| POST     | /properties                | Creates a property                |
| PUT      | /porperties/:id            | Edits a property                  |
| DELETE   | /properties/:id            | Removes a property                |

