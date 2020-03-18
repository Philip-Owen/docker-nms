# Docker NMS

An IP address monitoring tool. 

IP addresses can be added and monitored for basic reachability. A cron job runs every 15 minutes to test reachability to all added devices. Devices can also be tested individually using the `Ping` button within each device row.

Built with React.js, Node.js, Express.js, PostgreSQL, and Docker.

## How to run
- Clone and cd to this repo.
- Run `docker-compose up`
    - If the hosts you are looking to monitor fall within the subnet 172.20.0.0/16, take a look at changing the network settings in the `docker-compose` file to allow routing traffic outside of the container.
- Client is available at `localhost:8080` 