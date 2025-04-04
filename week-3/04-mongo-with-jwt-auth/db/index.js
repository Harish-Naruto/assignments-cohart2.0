const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect('mongodb+srv://leandraw005:ravi%4098230@cluster0.fu6hb.mongodb.net/jwt-course-selling');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purch_course:[{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price:Number,
    imageLink:String,

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}