const router = require("express").Router();
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

// router.get("/", async (req, res) => {
//    res.send("auth testing")
//   });
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const newuser = new User({
      usename: req.body.usename,
      email: req.body.email,
      password: hashedpassword,
    });

    const user = await newuser.save();
    res.status(200).json(user);
    console.log(" registion sucess");
  } catch (error) {
    console.log(error);
    res.status(404).end("err");
  }
});

router.post("/login", async (req, res) => {
   try {
       const user =await User.findOne({email:req.body.email})
       !user && res.status(404).json("user not found")
        password = req.body.password
       const passwordMatch = await bcrypt.compare(password, user.password);
    //    const valpass = await bcrypt.compare(req.body.password,user.pasword)
       !passwordMatch && res.status(400).json("worang pass")

       res.status(200).json(user)
        console.log("login sucess");
   } catch (error) {
    res.status(500).json(error)
       console.log(error);
   }
  });


router.get("/", async (req, res) => {
  const user = await new User({
    usename: "jj",
    emain: "jon@mail.com",
    password: "123455",
  });
  await user.save();
  res.send(user);
});

module.exports = router;
