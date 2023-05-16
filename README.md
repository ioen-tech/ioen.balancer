## IOEN Balancer App
TBD

### Pre Requisite
- [x] Install [Docker](https://docs.docker.com/get-docker/) on your local machine

Mysql and Redis will be installed via a docker-compose command.  This will make the installation easy for all if not most of the OS Platform (Linux, Windows, Mac..)

### QuickStart

Clone [ioen.balancer](https://github.com/ioen-tech/ioen.balancer) and make sure to point to the `next` branch.

#### 1.  Register and update git submodules.
Run the following command in the root directory of `ioen.balancer`
-  `git submodule init` - Only do this one time after first clone.
-  `git submodule update` - This will update the git submodule codes

#### 2.  Setup the Environment Variable
-  Go to `prisma` directory and create a `.env` file and set the following property:
````bash
DATABASE_URL=
````

-  Go to `backend` directory and create a `.env` file and set the following properties:
````bash
JWT_SECRET
REDIS_HOST=
REDIS_PORT
FRONIUS_URL=
FRONIUS_PVSYSTEMS_URL=
FRONIUS_PVSYSTEMS_AGGDATA=
PRODUCTION=
SOCKETIO_SERVER=
SOCKETIO_PORT=
````

#### 3.  Install Mysql and Redis via Docker
Run the following command in the root directory of `ioen.balancer`
````bash
npm run start:db
````

#### 4.  Run prisma client generator
Run the following command in the root directory of `ioen.balancer/prisma`
````bash
npm install
npm run build
npx prisma migrate dev
````

#### 5.  Run the Backend API
Run the following command in the root directory of `ioen.balancer/backend`
````bash
npm install
npm run dev
````

#### 6.  Run the Frontend
Run the following command in the root directory of `ioen.balancer/frontend`
````bash
npm install
npm run serve
````