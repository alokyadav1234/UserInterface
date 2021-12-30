const express = require("express");
const router = express.Router();
const  Post  = require("mongoose").model("Post");
const  User  = require("mongoose").model("User");
const requireLoginJson = require("../midleware/requireLoginJson")

router.get('/user/:_id',requireLoginJson, (req, res) => {
    User.findOne({_id:req.params._id})
    .select("-password")
    .then( user => {
        Post.find({postedBy:req.params._id})
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
            if(err){
                res.statur(422).res.json({error:err})
            }
            res.json({user,posts})
        })

    }).catch(err => {
        res.status(404).json({err:"user not found"})
    })
})


module.exports = router;