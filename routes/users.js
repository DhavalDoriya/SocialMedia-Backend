const router = require("express").Router();

router.get("/", async (req, res) => {
   req.send("router testing")
  });

  module.exports = router;