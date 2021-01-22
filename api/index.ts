// const server = require('./src/app.js')
import server from "./src/app"
import mongoose from "mongoose"

const URI = 'mongodb://localhost/development';

// mongoose.connect(URI, { useNewUrlParser: true })
//   .then(db => console.log('DB is connected'))
//   .catch(err => console.error(err));

server.listen(3001, () => {
    mongoose.connect(URI, { useNewUrlParser: true })
  .then(db => console.log('DB is connected', "listening at 3001"))
  .catch(err => console.error(err));
})