# Too-Doo

Version: 0.2</br>
Development process: https://trello.com/b/SKbmtyGE/too-doo

## Overview

This is a simple ToDo web app. Anyone can create an account, sign in and manage their timetable.

## Running the app

### Dev

#### Backend

- Install Postgres and node.js v.14+
- Create a database named `too_doo_dev`
- Create a user with name `too_doo_user` and password `password`
- Go to /too-doo-backend
- Run `npm install` to install dependencies
- Run `sequelize-cli db:migrate --env dev` to configure the database
- Create an `.env` file, put a `SECRET_KEY` variable in it with value consisting of random numbers and latin letters
- Run `npm run dev` to run the server in dev mode

#### Frontend

- Install node.js v.12+ and yarn
- Go to /too-doo-frontend
- Run `yarn install` to install dependencies
- Run `yarn start` to run frontend in dev mode

### Prod

- Install Docker
- Run `docker compose up`
- The app is available in your browser at `localhost`, or at the local IP address of your computer for any other
  computer in the same network