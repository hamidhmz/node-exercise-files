const express = require('express');
const Joi = require('Joi');
const mongoose = require("mongoose");
const router = express.Router();


mongoose.connect("mongodb://localhost/mongo-exercises")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("could not connect to mongoDB...",err));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date:  Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});
const Course = mongoose.model("Course",courseSchema);
async function getCourses(){
    const courses = await Course
        .find({ isPublished: true });
        // .sort({ name: 1 })//asend and -1 desend
        // .select({ name: 1 , author: 1 });
    console.log(courses);
    return courses;
}
async function price15OrHaveWordBy(){
    const courses = await Course
        .find()
        .or([{ price: { $gte:15 } },{ name:/.*by.*/i }])
        // .sort({ name: 1 })//asend and -1 desend
        // .select({ name: 1 , author: 1 });
    console.log(courses);
    return courses;
}
router.get('/api/courses',async (req,res,next)=>{
    try {
    getCourses();
    
    var o = await getCourses();
    res.send(JSON.stringify(o));
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }
});
router.get('/api/price15OrHaveWordBy',async (req,res,next)=>{
    try {
    
    var o = await price15OrHaveWordBy();
    res.send(JSON.stringify(o));
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        next(e) 
    }
});
module.exports = router