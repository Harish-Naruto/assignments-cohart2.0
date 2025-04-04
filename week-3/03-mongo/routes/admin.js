const { Router } = require("express");
const {Admin,Course} = require("../db/index")
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    try{

        await Admin.create({
            username:username,
            password:password
        })
    }catch(e){
        res.status(403).json({
            msg:"error"
        })
    }
    res.json({
       message: 'Admin created successfully'
    })
    

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    try{
       const Newcourse =  await Course.create({
            title:title,
            description:description,
            price:price,
            imageLink:imageLink
        }) 
        res.json({
            message: 'Course created successfully', courseId: Newcourse._id
        })
    }catch(e){
        res.json({
            msg:"failed"
        })
    }
   
    


});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const data = await Course.find({});
    res.json({
        courses:data
    })
});

module.exports = router;