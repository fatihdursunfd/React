const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")
const bcrypt = require("bcrypt");
const { route } = require("./auth");

// Update User
router.put("/:id", async (req,res) => {

    if(req.body.userId === req.params.id){

        if(req.body.password){

            const saltRounds = 10;

            const salt = bcrypt.genSaltSync(saltRounds);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }

         try {

            const updatedUser = await User.findByIdAndUpdate(req.params.id ,{
                $set : req.body,
            },{new:true});
            res.status(200).json(updatedUser)
        } 

        catch (err) {
            res.status(401).json(user);
        }
    }
    else{
        res.status(401).json("You can only update your account");
    }
});

// Delete User
router.delete("/:id", async (req,res) => {


    const user = await User.findById(req.params.id);

    if (user) {

        try {
            // await Post.deleteMany({username : user.username})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted...")
        } 

        catch (err) {
            res.status(401).json(err);
        }
    }

    else {
        res.status(401).json("User not found");
    }

});
 
router.get("/:id", async (req,res) => { 

    try {
        const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc;
        res.status(200).json(others)
    } 

    catch (err) {
        res.status(500).json(err);
    }

})


module.exports = router
