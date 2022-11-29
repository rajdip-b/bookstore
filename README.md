# Bookstore
## Introduction
---

This is a very basic application that is built using the MERS stack.

## Technologies used
---

- ReactJS
- ExpressJS
- Docker
- MongoDB
- ReduxJS

## Steps to run
---

- ### **Running the entire app in docker**

    The `docker-compose.yml` sits at the root folder. To run it, use
    ```
    docker-compose up --build
    ```

- ### **Running the backend in docker**

    ```
    cd backend
    docker-compose up --build
    ```

- ### **Running the frontend in docker**

    ```
    cd frontend
    docker-compose up --build
    ```

- ### **Running the backend for development**

    - Install the latest version of `NodeJS`

    - First we need the database to be up and running. I have used docker for this purpose 
        ```
        docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -d mongo
        ```
        Note that you might need to run it as sude if you are in Linux or MacOS

    - Change to the backend folder
        ```
        cd backend
        ```

    - Set the url of the database connection in `./src/index.ts` as `mongodb://root:root@127.0.0.1:27017`

    - Install the dependencies
        ```
        npm install
        ```

    - Then for the server, we need to run 2 commands simultaneously
        ```
        npx tsc -w 
        npm start
        ```
- ### **Running the frontend for development**

    - Install the latest version of `NodeJS`

    - Change to the frontend folder
        ```
        cd frontend
        ```

    - Install the dependencies
        ```
        npm install
        ```

    - Then for the server, we need to run 2 commands simultaneously
        ```
        npm run dev
        ```

## Contribution
Any kind of contribution is welcome.