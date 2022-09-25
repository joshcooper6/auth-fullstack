const Mongoose = require("mongoose")
require('dotenv').config();
const DBKEY = process.env.MONGO_LOGIN;
const localDB = `mongodb+srv://${DBKEY}@cluster0.a0mzbzj.mongodb.net/test`

const connectDB = async () => {

     await Mongoose.connect(localDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(res => {
      console.log('Connected to DB.')
    });


}

module.exports = connectDB