# Setup Instructions
To setup the project follow the below steps

## Install the Stack
The project requires node, npm and mongoDB to be installed on the system to be setup. You can find instructions on how to install them on their respective websites.

## Install Backend Dependancies
To install the backend dependancies open a terminal in the `/server/` folder and run the command
```
npm i
```

## Install Frontend Dependancies
To install the backend dependancies open a terminal in the `/server/` folder and run the command
```
npm i
```

## Set environmental variables
Make .env files in both server and client folder. Example files have already been provided.

## Create a database
Create a database and add the name to the .env file in the server folder.

## Import schema.sql

All the database tables created by the project are stored in the schema.sql file. Either import the file in your database in phpmyadmin or run the sql commands in the mysql terminal as given below.

```mysql
mysql> source <path-to-schema.sql>
```

## Run the Project
To run the project make sure mongoDB is running, if not start it. Post this you may start the backend server by running the following command in the folder `/server/`
```
npm run start
```

Then you may proceed to start the React frontend. First make a production build by running the following command in `/client/`
```
npm run build
```

After making the production build run the following command to start the frontend
```
serve -s build -p 3000
```

With this you have successfully setup Student Dash! Just open a browser and go to the url [http://localhost:3000](http://localhost:3000) to start using it!
