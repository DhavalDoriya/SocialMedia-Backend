const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/usermodel");

router.put("/:id", async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
     if (req.body.password) {
       try {
         const salt = await bcrypt.genSalt(10);
         req.body.password = await bcrypt.hash(req.body.password, salt);
       } catch (err) {
         return res.status(500).json(err);
       }
     }
     try {
       const user = await User.findByIdAndUpdate(req.params.id, {
         $set: req.body,
       });
       res.status(200).json("Account has been updated");
     } catch (err) {
       return res.status(500).json(err);
     }
   } else {
     return res.status(403).json("You can update only your account!");
   }
 });
// idk this is not working
// router.put("/:id",async (req,res)=>{
//    if(req.body.userId === req.params.id  ){
//       // || req.user.isAdmin
//          if(req.body.password){
//             try{
//                const salt = await bcrypt.genSalt(10);
//                 req.body.password = await bcrypt.hash(req.body.password, salt);   
//                 console.log("hash fail");        
//             }catch(error){
//                res.status(500).json("update put failed")
//             }
//             try {
//                const user = await User.findByIdAndUpdate(req.params.id,
//                   {$set:req.body,})
//                res.status(200).json("updated sucessfull")
//             } catch (error) {
//                res.status(500).json("update failed")

//             }
//          }
//    }else{
//       return res.status(403).json("this is not your account");
//    }
// })

router.delete("/:id",async (req,res)=>{
   if(req.body.userId === req.params.id || req.body.isAdmin ){
      // || req.user.isAdmin
            try {
               const user = await User.findOneAndDelete(req.params.id)
               res.status(200).json("delete sucessfull")
               console.log("delete sucessfull");
            } catch (error) {
               res.status(500).json("delete failed")
               console.log("delete failed");
            }
         }
   else{
      return res.status(403).json("this is not your account");
   }
})

router.get("/:id", async (req, res) => {
      try {
            const user = await User.findById(req.params.id)
            const {password,createdAt,updatedAt,isAdmin, ...other} = user._doc
            res.status(200).json(other)
            console.log("user found");

      } catch (error) {
            res.status(500).json("user not found")
            console.log("user not found");

      }
  });
router.put("/:id/follow",async (req,res)=>{
   if( req.body.userId !== req.params.id ){
         try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
               await user.updateOne({ $push: { followers: req.body.userId } });
               await currentUser.updateOne({ $push: { followings: req.params.id } });
               console.log("followed");
               res.status(200).json("followed")
            } 
            else {
               res.status(500).json("you alreay follow the user")
               console.log("alredy folloew");
            }
         } catch (error) {
            res.status(500).json(error)
            console.log("erroe");
         }
   }else{
      res.status(403).send("you cant follow your self")
      console.log("you cant follow your self");
   }
})

router.put("/:id/unfollow",async (req,res)=>{
   if( req.body.userId !== req.params.id ){
         try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
               await user.updateOne({ $pull: { followers: req.body.userId } });
               await currentUser.updateOne({ $pull: { followings: req.params.id } });
               console.log("unfollowed");
               res.status(200).json("unfollowed")
            } 
            else {
               res.status(500).json("you alreay unfollow the user")
               console.log("alredy unfollowed");
            }
         } catch (error) {
            res.status(500).json(error)
            console.log("erroe");
         }
   }else{
      res.status(403).send("you cant unfollow your self")
      console.log("you cant unfollow your self");
   }
})

module.exports = router;