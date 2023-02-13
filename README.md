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
