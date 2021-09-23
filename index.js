const express = require('express')
const app = express()
const PORT = process.env.PORT || 8001;
require('dotenv').config()

const userRoute = require("./routes/users");
const db = require("./db")

app.use(express.json());
app.use("/users", userRoute);

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT, () => {
    console.log(`server is running at localhost:${PORT}`);
  })
