const mongoose = require('mongoose');
require('dotenv').config()
const URI = process.env.DB_URL

mongoose.connect( URI , {useNewUrlParser: true ,useUnifiedTopology : true }).then(()=>{
    console.log('connection sucessful');
}).catch((e)=>{
    console.log(`no connection becouse ${e}`);
});
module.exports = mongoose.connect;
