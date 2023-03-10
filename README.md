
## Developer Documentation

###### Pre Requisite
- [x] Install mysql server on your local machine
- [x] Install IORedis() server on your local machine.

###### Setup Database
-  Clone https://github.com/redgridone/Redgrid.energy.schema and make sure to modify the DATABASE_URL property in the .env file to point to your local mysql server.
set the DATABASE_URL property in `.env` file.
````bash
DATABASE_URL="mysql://<user>:<password>@localhost:<port#>/<dbname>"
````
-  Do `npm install`
- If you want to reset and delete the info in the database, run the following command:
> `npx prisma migrate reset`
- If you have just created the database, run the following command to create the database schema:
> `npx prisma migrate dev`
- To import the temporary NFT information into your database, run the following command:
> `mysql -u username -p database_name < NFTs.sql
- Now Generate the prisma artifacts to be use by the backend API, run the following command:
> `npm run build`

###### Setup API Server (Backend)
-  Clone https://github.com/redgridone/Redgrid.energy.api and make sure to fillout the needed fields in the [.env](https://github.com/redgridone/Redgrid.energy.api/blob/main/README.md) file.
-  If you have set all of the .env properties, run the following command:
> `npm install`
- Run the backend API in the background:
> `npm run dev`

###### How to build and run via web or mobile app (Frontend)

The first time you clone this repository, run (within this directory)
````bash
npm install
````

To run as a webapp and access via localhost:8080, run:
````bash
npm run serve
````

Build the web app so that the compiled web assets will be updated and will be copied into each capacitor native platform:
````bash
npm run build
````

This step will open the android studio or xcode depending on your target.  This will also set the local.properties file for your taget which will set the appropriate path of the sdk for both android and ios.
````bash
npx cap open android
npx cap open ios
````

For MAC users, you may encounter an error with android studio.  Just update the packages that are being suggested with android studio, or update the android studio itself and set the JAVA_HOME path on your bash/zshrc profile.  I've added the following into my .zshrc file:
````bash
export JAVA_HOME="$(brew --prefix openjdk)/libexec/openjdk.jdk/Contents/Home"
````

This step will automatically run the emulator for both android and ios without running the android studio and xcode.
````bash
npx cap run android
npx cap run ios
````