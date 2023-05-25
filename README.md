## IOEN Balancer App
TBD

### Pre Requisite
- [x] Install [Docker](https://docs.docker.com/get-docker/) on your local machine

Mysql and Redis will be installed via a docker-compose command.  This will make the installation easy for all if not most of the OS Platform (Linux, Windows, Mac..)

# QuickStart

Clone [ioen.balancer](https://github.com/ioen-tech/ioen.balancer) and make sure to point to the `next` branch.

Below is the top-level directory layout  
.  
|── backend  
| - - -└── prisma  
|── frontend  
|── package.json  
|── docker-compose.yml  
|── README.md 

`backend` - This is the git repository for the API  
`prisma`  - This is the git repository for managing the database.  
`frontend` - This ia the git repository for the Vuejs UI.

## 1.  Register and update git submodules.
You only need to do this after cloning the code for the first time.

Run the following command in the root directory of `ioen.balancer`
````bash
git submodule update --init --recursive
````
These command will update the code inside the `ioen.balancer` which pulls the latest code of the `backend` and `prisma` from their respective git repository.

## 2.  Run the project via npm run command.
Run the following command in the root directory of `ioen.balancer`
````bash
npm run build
npm run start
````

## 3.  Access the Frontend/UI
* The ui can now be access via `localhost:8080` by default.

### List of NPM run command script.

The following are the npm run command scripts that uses docker commands to run/stop the app.
* `npm run build` - builds Docker images from a dockerfile (frontend, backend, prisma).
* `npm run start` - starts a container which includes all of the built images and will automaticaly install and start `mysql/mariadb` and `redis` server.
* `npm run stop` - stop a running container.
* `npm run clean` - removes all containers, networks and images.
* `npm run clean:volumes` - removes all unused local volumes.


### Environment Variables
The following environment variables below has already been set in the `docker-compose.yml` file.
If there are any changes in the values below just modify the `docker-compose.yml` file and run `npm run build` again in the root directory of `ioen.balancer`
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