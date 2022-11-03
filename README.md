<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<br>
<br>

# eBook API

1. Execute `yarn` to install all dependencies.
```
$ yarn install
```
2. Create a `.env` file in the root directory and you can use the `.env.template` file.
```
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

JWT_SECRET=secret
```
3. Execute `yarn start:dev` to start the application in development mode.
```
$ yarn start:dev
```
4. Execute the docker-compose up command to start the database.
```
$ docker-compose up -d
```