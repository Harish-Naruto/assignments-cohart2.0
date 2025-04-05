const { Router } = require("express");
const {User,Course} = require("../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");
require("dotenv").config();
const jwt_secret = process.env.jwt_secret

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashpass = await bcrypt.hash(password,4);
    await User.create({
        username,
        password:hashpass
    })
    
    res.json({
        message:"user created successfull"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        username:username
    })

    if(user){
        const passmatch = await bcrypt.compare(password,user.password);
        if(passmatch){
            const token  = jwt.sign({
                username:username
            },jwt_secret);
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                msg:"wrong passowrd"
            })
        }
    }else{
        res.status(403).json({
            msg:"user not found"
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const course = await Course.find({});
    res.json({
        course
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    await User.updateOne({
        username
    },{
        "$push":
        {
            purch_course:courseId
        }
        
    })
    res.json({
        message: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    const user = await User.findOne({
        username
    })
    const purchasedCourses = await Course.find({
        _id:{
            "$in":user.purch_course
        }
    })
    res.json({
        purchasedCourses
    })
});

module.exports = router