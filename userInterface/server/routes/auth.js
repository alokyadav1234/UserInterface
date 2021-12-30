const express = require("express");
const  User  = require("mongoose").model("User");
const router = express.Router();
const  bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const{JWT_SECRET} = require("../config/keys")
const requireLoginJson = require("../midleware/requireLoginJson")


router.get('/protected',requireLoginJson,(req, res) => {
res.send("hello user")
});

router.post('/signup', (req, res) => {
const {name, password, email} = req.body;
if(!name || !password || !email){
    return res.status(422).json({error:"please fill all field"})
}
User.findOne({email:email}).then(saveduser => {
    if(saveduser){
    return res.status(422).json({error:"user already exist with this email"})
    }
}).catch(err =>{
    console.log(err)
})

bcrypt.hash(password, 12)
.then(hashedpassword => {
    const user = new User({
        name,
        password:hashedpassword,
        email
    })
    user.save().then(user => {
     res.json({message:"user saved sucessfully"})
    }).catch(err => {
        console.log(err)
    })
})

})

router.post("/signin",(req, res) => {
    const{email, password} = req.body;
    User.findOne({email:email})
    .then(saveduser => {
        if(!saveduser){
           return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password, saveduser.password)
        .then(domatch => {
            if(domatch){
            //return res.json({message:"sucessfully signin"})
            const token = jwt.sign({_id:saveduser._id}, JWT_SECRET)
            const {_id,name,email} = saveduser;
            return res.json({token, user:{_id,name,email}})
        }
        return res.status(422).json({error:"Invalid email or password"})

        })
    }).catch(err => {
        console.log(err)
    }) 
})
module.exports = router;