const router = require("express").Router();
const Post = require("../models/postmodel");

router.post("/",async(req,res) => {
   const newpost = new Post(req.body);
   try {
       const Post = await newpost.save();
       res.status(200).json(Post)
   } catch (error) {
       res.status(500).json(error)
   }
})

router.put("/:id",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
                await post.updateOne({$set:req.body})
            res.status(200).json("post updated")

        } else {
            res.status(403).json("this is not your post")
            
        }
        
    } catch (error) {
            res.status(500).json("post not found")
    }
 })

 router.delete("/:id",async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
                await post.deleteOne();
            res.status(200).json("post deleted")

        } else {
            res.status(403).json("this is not your post")
            
        }
        
    } catch (error) {
            res.status(500).json("post not found")
    }
 })

 router.get("/:id",async (req,res) => {
     try {
        const post = await Post.findById(req.params.id);
        res.status(202).json(post)
     } catch (error) {
         console.log(error);
     }
    
})

//like
router.put("/:id/like",async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("post liked")
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("post unliked")

        }
    } catch (error) {
        
    }
})

  
// router.get("/allposts",(req,res) => {

//     try {
//         const currentuser = await User.findById(req.body.userId);
//         const userpost = await User.findById({userId: currentuser._id});
//         const friendpost = await Promise.all(
//             currentuser.followings.map((friendId)=>{
//                 return Post.find({userId:friendId})
//             });
//             res.json(userpost.concat(...friendpost))
//         )
//     }catch (error) {
//         res.status(500).json(error)
//     }   
// })
// router.get("/",(req,res) => {
//     res.send("testpost")
// })
module.exports = router;