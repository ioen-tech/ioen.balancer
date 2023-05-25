## IOEN Balancer App
TBD

### Pre Requisite
- [x] Install [Docker](https://docs.docker.com/get-docker/) on your local machine

Mysql and Redis will be installed via a docker-compose command.  This will make the installation easy for all if not most of the OS Platform (Linux, Windows, Mac..)

### QuickStart

Clone [ioen.balancer](https://github.com/ioen-tech/ioen.balancer) and make sure to point to the `next` branch.

Below is the top-level directory layout
.
├── backend
│ └── prisma
├── frontend
├── package.json
├── docker-compose.yml
└── README.md

`backend` - This is the git repository for the API
`prisma`  - This is the git repository for managing the database.
`frontend` - This ia the git repository for the Vuejs UI.

#### 1.  Register and update git submodules.
You only need to do this after cloning the code for the first time.

Run the following command in the root directory of `ioen.balancer`
-  `git submodule init`
-  `git submodule update`

Go to the `prisma` folder and the same command above:
-  `git submodule init`
-  `git submodule update`

These commands will update the code inside the `ioen.balancer` which pulls the latest code of the `backend` and `prisma` from their respective git repository.

#### 2.  Set the Environment Variables in the docker-compose.yml file
The following environment variables below has already been set in the docker-compose.yml file.  Just modify the docker-compose.yml file for any changes in the env variables.
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

#### 3.  Run the project
Run the following command in the root directory of `ioen.balancer`
````bash
npm run build
npm run start
````

The following are the docker scripts that can be use:
* `npm run build` - This will build dockerfiles for each project and make it to a docker image.
* `npm run start` - This will start a container which includes all the images(frontend, backend) being built and will automaticaly install `mysql` and `redis` server.
* `npm run stop` - This will stop the running container.
* `npm run clean` - This will remove all containers, networks and images.
* `npm run clean:volumes` - Remove all unused local volumes.

#### 4.  Access the Frontend/UI
* The ui can now be access via `localhost:8080` by default.