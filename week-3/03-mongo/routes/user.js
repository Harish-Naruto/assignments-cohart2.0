const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db/index")

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    try{

        await User.create({
            username:username,
            password:password
        })
    }catch(e){
        res.status(403).json({
            msg:"error"
        })
    }
    res.json({
       message: 'User created successfully'
    })
    

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
     const data =await Course.find({});
        res.json({
            courses:data
        })
    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
   await User.updateOne({
        username
    },{
        "$push":{
            purch_course:courseId
        }
    })
    res.json({
        message: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const data = await User.findOne({
        username
    })
    const courseId = data.purch_course;
    const purchasedCourses = await Course.find({
        _id:{
            "$in":courseId
        }
    })
    res.json({
        purchasedCourses
    })


});

module.exports = router