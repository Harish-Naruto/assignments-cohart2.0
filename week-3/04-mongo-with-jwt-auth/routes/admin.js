const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const bcrypt = require("bcrypt")
const {Admin, Course} = require("../db/index")
const router = Router();
const jwt = require("jsonwebtoken");
const {jwt_secret}  = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username  = req.body.username;
    const password = req.body.password;
    try{
        const hashpass = await bcrypt.hash(password,4);
        await Admin.create({
            username:username,
            password:hashpass
        })
        
    }catch(e){
        res.json({
            msg:"something went wrong"
        })
    }
    res.json({
         message: 'Admin created successfully'
    })


});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username:username
    })
    if(!admin){
        res.status(403).json({
            msg:"admin not found"
        })
        
    }else{

        const passmatch = await bcrypt.compare(password,admin.password);
        if(passmatch){
            const token = jwt.sign({
                username:username
            },jwt_secret);
    
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                msg:"invalid username or password"
            })
        }
    }


});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const new_course = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json({
        courseId:new_course._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
   const data =  await Course.find({});
    res.json({
        courses:data
    })

});

module.exports = router;