const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")

// Register

router.post("/register", (req,res) => {

    try {

        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });
      
          const user = newUser.save();
          res.status(200).json(newUser);
    } 

    catch (err) {
        res.status(500).json(user);
    }

})


// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router