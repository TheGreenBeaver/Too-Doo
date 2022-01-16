# Too-Doo

Version: 0.2</br>
Development process: https://trello.com/b/SKbmtyGE/too-doo

## Test results

<table>
  <tr>
    <th></th>
    <th>develop</th>
    <th>master</th>
  </tr>

  <tr>
    <td>
      Backend
    </td>
    <td>
      <a href="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/backend.yml?query=branch%3Adevelop">
        <img 
          src="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/backend.yml/badge.svg?branch=develop"
          alt="backend-develop"
        />
      </a>
    </td>
    <td>
      <a href="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/backend.yml?query=branch%3Amaster">
        <img 
          src="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/backend.yml/badge.svg?branch=master"
          alt="backend-master"
        />
      </a>
    </td>
  </tr>

  <tr>
    <td>
      Frontend
    </td>
    <td>
      <a href="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/frontend.yml?query=branch%3Adevelop">
        <img 
          src="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/frontend.yml/badge.svg?branch=develop"
          alt="frontend-develop"
        />
      </a>
    </td>
    <td>
      <a href="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/frontend.yml?query=branch%3Amaster">
        <img 
          src="https://github.com/TheGreenBeaver/Too-Doo/actions/workflows/frontend.yml/badge.svg?branch=master"
          alt="frontend-master"
        />
      </a>
    </td>
  </tr>
</table>

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

## Running tests

### Backend

- Run `npm run test` (`npm run test:windows` if you are using Windows) in /too-doo-backend directory

### Frontend

- `yarn test` in /too-doo-frontend directory