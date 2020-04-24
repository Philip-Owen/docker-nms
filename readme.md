# Docker NMS

A simple network monitoring tool.

IP addresses can be added and monitored for basic reachability. A cron job runs every 15 minutes to test reachability to all added devices. Websockets are used to push updated reachability status from the cron job to the client. Devices can also be tested individually using the `Ping` button within each device row.

Built with React.js, Node.js, Express.js, PostgreSQL, and Docker.

## How to run

- Clone and cd to this repo.
- For Docker:

  - Run `docker-compose build` then `docker-compose up`.
  - Client is available at `localhost:8080`.

- Without Docker:

  - Database:

    - With PostgreSQL running, create a database named `nms`

    - Server:

      - `cd` into the server directory and run `npm install` to install dependencies
      - If you have url, username, and password requirements for PostgreSQL edit these values in `server/db/index.js`
      - Run `npm start`

    - Client:
      - `cd` to the `client` directory and run `npm install`
      - Run `npm start`
      - Client is available at `http://localhost:3000`
