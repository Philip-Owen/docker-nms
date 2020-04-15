# Docker NMS

An IP address monitoring tool. 

IP addresses can be added and monitored for basic reachability. A cron job runs every 15 minutes to test reachability to all added devices. Devices can also be tested individually using the `Ping` button within each device row.

Built with React.js, Node.js, Express.js, PostgreSQL, and Docker.

## How to run
- Clone and cd to this repo.
- Run `docker-compose build` then `docker-compose up`.
- Client is available at `localhost:8080`.