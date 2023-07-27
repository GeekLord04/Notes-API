
# Notes API

A simple Notes API with Singup and Signin feature along with creation, updation and deletion of notes.

MongoDB is used the NoSQL Database.

This is API is currently hosted on https://chirag-notes-api.up.railway.app/




## Installation
Firstly install the latest version of NodeJS in your local machine.

Check the version of NodeJS using this command 
```bash
  node --version
```

Clone and install all the required packages with npm

```bash
  git clone https://github.com/GeekLord04/Notes-API.git
  cd Notes-API
  npm install
```
    
## API Reference

There are 2 routes
    
1. User routes
2. Note routes 

### User routes

#### Signup (Create new user)

```http
  POST /users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Set a username for the user 
`email` | `string` | **Required**. The email of the user
`password` | `string` | **Required**. Set the password for the user account|

#### Signin (Login the user)

```http
  POST /users/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Optional**. Set a username for the user 
`email` | `string` | **Required**. The email of the user
`password` | `string` | **Required**. Password of the user|


### Note routes

#### Create a new note

```http
  POST /note/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Set the title of the note 
`description` | `string` | **Required**. Set the description

#### Update notes

```http
  PUT /note/{$id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Set the title of the note 
`description` | `string` | **Required**. Set the description


#### Delete notes
```http
  DELETE /note/{$id}
```

#### Get all notes

```http
  GET /note/
```

### Status Codes
    200 : Successful request
    400 : User already exists / Invalid Credentials
    404 : User not found / Bad request
    500 : Something went wrong



## Run Locally

Clone the project

```bash
  git clone https://github.com/GeekLord04/Notes-API.git
```

Go to the project directory

```bash
  cd Notes-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

