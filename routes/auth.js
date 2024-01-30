const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {User, getUserById, validate, createUser, login} = require("../models/user");


router.post("/login", async (req, res) => {
    console.log(req.body.email, req.body.password);
    let user = await login(req.body.email, req.body.password);
    if(!user) return res.status(401).send("Wrong Credentials!");
    
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(user);
});

router.get("/refreshToken", auth, async(req, res) => {
    let user = await getUserById(req.user._id);
    const token = user.generateAuthToken();
    res.send(token);
})


router.post("/register", async (req, res) => {
    const { error } = validate(req.body); // check the validate function once more
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered.');

    user = await createUser(req.body.name, req.body.gender, req.body.birthdate, req.body.email, req.body.password);
    // res.send(user);

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(user);
}); 

module.exports = router; 
