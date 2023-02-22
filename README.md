# Redgrid.energy

## our project
as chatted on the call. This code is a very simple webapp version of the solution. there is no enrollment, process etc but it does have the api calls and basis for what I want us to build.

for our first version we will create a mobile native application (using likely vue capacitor application. our app will allow a user to:

* register as a user
* include their fronius credentials in the registration process (so the app can query their fronius system via api).
* create an 'energy group' or join an existing group.
* add a logo for their energy group once setup and part of an energy group
* the app queries their fronius every 5 minutes
* the value is either a + - or 0. For each interval the value of all users in the group is added up and added to a dbase
* if the sum of all user values is within 500w of 0 the screen glows a colour or shows an animation and a reward is given to everyone in the group
* we send a notification to each user daily to say how much reward they have earned.
* if the interval sum value for the group is outside of that range the in app screen glows a different colour to indicate their group is consuming or producing too much energy
in our first work we will just do the above with database for the group number and to keep group lists and members and all else with local/hosted vue js code. 
but once we have the ux setup our next sprint will replace the dbase with Holochain DHT to manage user credentials, groups/group members, group available reward balance for distribution, and individual user reward balance.

after we have done that we will implement some Ethereum Smart contract code into the setup as the rewards here are IOEN tokens which are ethereum based. ill describe the goal for that once we get going RC but essentially the main part of of the agent balance and reward available will be in Holochain but we will have to create a smart contract in ethereum for each energy group that will mirror that from holochain and allow a user to swap. Ill explain better and try draw this once we get going.

as mentioned my objective is to have 50 users on this initial setup that will be really close friends and family type people so that's our first goal.

Ill setup a new repo for this new app and will copy this readme to it. I think first thing will be to look at this code and look into capacitor and then you and i grab a call and plan how we can start building it.

## Developer Documentation

###### Pre Requisite
- [x] Install mysql server on your local machine
- [x] Install IORedis() server on your local machine.

###### Setup Database
-  Clone https://github.com/redgridone/Redgrid.energy.schema and make sure to modify the DATABASE_URL property in the .env file to point to your local mysql server.  Please see the [README.md](https://github.com/redgridone/Redgrid.energy.schema#readme) file in this repo for more information.

###### Setup API Server (Backend)
-  Clone https://github.com/redgridone/Redgrid.energy.api and make sure to fillout the needed fields in the .env file.  Please see the [README.md](https://github.com/redgridone/Redgrid.energy.api#readme) in this repo for more information.

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


