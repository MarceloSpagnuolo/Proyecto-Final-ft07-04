// const express = require('express');
import express from "express"
// const bodyParser = require('body-parser');
import bodyParser from "body-parser"
// const routes = require('./routes/index.js');
import User from "./Models/users"
// import mongoose from "./db"





const server = express();

// server.name = 'API';

server.use(express.static('src/images'));  //acceso publico al directorio src
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// server.use('/', Users);




// Error catching endware.
server.use((err: any, req: any, res: any, next: any) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.get('/', (req: any, res: any) => {
    console.log("entre aca")

    User.find((err: any, users: any) => {
        console.log(users);
    });
    res.json({
        status: 'API Works!'
    })
})

export default server
