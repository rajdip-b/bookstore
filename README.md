# Bookstore
## Introduction
This is a very basic application that is built using the MERN stack.

## Technologies used
- ReactJS
- ExpressJS
- Docker
- MongoDB
- ReduxJS

## Steps to run
- First we need the database to be up and running. I have used docker for this purpose 
    ```
    docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -d mongo
    ```
    Note that you might need to run it as sude if you are in Linux or MacOS

- Then for the server, we need to run 2 commands in 2 terminals simultaneously the first command in the first terminal after going into the backend directory is -
    
    ```
    npx tsc -w 
    npm start
    ```
- Finally, the second command in the second terminal after going into the frontend directory, we start the frontend using
   
    ```
    npm run dev
    ```

## Contribution
Any kind of contribution is welcome.