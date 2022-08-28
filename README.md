# flixkan
simple kanban app 

1- Login Page :
![image](https://user-images.githubusercontent.com/106993982/187027814-8518eb55-c02c-4d75-814d-d2791dd2f2c0.png)

2-Signup page:
![image](https://user-images.githubusercontent.com/106993982/187027865-4050386b-377b-4c8d-a9d2-6132b81c9a25.png)

3-Home page:
![image](https://user-images.githubusercontent.com/106993982/187028053-79c92fa6-31f5-4ca4-8559-fadf33f76147.png)
*you can drag and drop any task
*start new Meeting
*add youtube lists in tasks


to start 

1-Clone the project

```bash
  git clone https://github.com/nasaomar165/flixkan.git
```
2-Go to the project directory

```bash
  cd flixkan
```
3-Go to the server directory

```bash
  cd server
```
4- Install dependencies in server

```bash
  npm install
```
5- Go to the client folder

```bash
  cd ./client
```
6- Install dependencies in client

```bash
  npm install
```
7- Start the client react project

```bash
  npm run start
```
8- Come back to server

```bash
  cd ./server
```

Start Server using node or nodemon

```bash
  node index.js 
```
or
```bash
  nodemon index.js
```

To run this project, you will need to add the following environment variables to your server/.env file

`MONGODB_URL` your database url

`PORT` server port start by using `5000`

`PASSWORD_SECRET_KEY` 

`TOKEN_SECRET_KEY` Tokens (JWT)
