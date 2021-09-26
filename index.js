const express = require('express')
const app = express()
const PORT = process.env.PORT || 8001;
const dotenv = require('dotenv')
const db = require("./db");
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

app.use(express.json());
dotenv.config()
app.use(helmet())
app.use(morgan("common"))


app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/post", postRoute);

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT, () => {
    console.log(`server is running at localhost:${PORT}`);
  })
