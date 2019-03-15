const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("could not connect to mongoDB...",err));

const courseSchema = new mongoose.Schema({
    // name: String,
    name: {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        uppercase:true,
        unique:true
        // match:/pattern/
    },
    category:{
        type:String,
        required:true,
        lowercase:true,//mongo automatically change uppercase to lowercase 
        trim:true,
        enum:["web","mobile","network"]//this line code says category must be web or mobile or network
    },
    author: String,
    // tags: [ String ],//we cannot give require to this because doesn't work we must to set custom validators 
    tags:{
        type: Array,
        // validate:{
        //     validator:function(v){
        //         return v && v.length > 0;
        //     },
        //     message: "A course should have at least one tag." 
        // },
        //async validator 
        validate:{
            isAsync:true,
            validator:function(v,callback){
                setTimeout(()=>{
                    const result = v && v.length > 0;
                    callback(result);
                },4000);
            },
            message: "A course should have at least one tag." 
        },
    },
    data: { type: Date, default: Date.now },
    isPublished: Boolean,
    price:{
        type:Number,
        min:10,
        max:200,
        get:v=> Math.round(v),//when read a value of property from database
        set:v=> Math.round(v),//when set a value of property to database
        required: function(){return this.isPublished}
    }
});// Schema types: String Number Date Buffer Boolean ObjectID Array
const Course = mongoose.model("Course",courseSchema);

///////////Create

async function createCourse(){
    const course = new Course({
        name: "Angular Course",
        category:"network",
        author: "Mosh",
        tags: ["Angular", "frontend"],
        isPublished: true,
        price:15
    });
    //this is mongodb validation 
    try{
        // await course.validate(); you can manually validate
        const result = await course.save();
        console.log(result);
    }catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
    
}

createCourse(); 

/////////Read
async function getCourses(){
    // logical operator 
    // or 
    // and
    // comparison operator 
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to )
    // lt (less than)
    // lte (less than or equal to )
    // in
    // nin (not in  )

    const courses = await Course
        .find({ author: "Mosh", isPublished: true })
        .limit(10)
        .sort({ name: 1 })//asend and -1 desend
        .select({ name: 1 , tags: 1 });
        // comparison operator examples
        // .find({ price: { $gt:10 } })
        //////
        // .find({ price: { $gte:10, $lte:20 } })
        //////
        // .find({ price: { $in: [10, 15, 20] } })
        //////
        // logical operator examples
        // .find()
        // .or([{ author:"Mosh" },{ isPublished:true }])
        // .limit(10)
        // .sort({ name: 1 })//asend and -1 desend
        // .select({ name: 1 , tags: 1 });
        //////
        // .find()
        // .and([{ author:"Mosh" },{ isPublished:true }])
        // .limit(10)
        // .sort({ name: 1 })//asend and -1 desend
        // .select({ name: 1 , tags: 1 });
        /////
        // Starts with mosh
        // .find({ author: /^Mosh/})
        // .limit(10)
        // .sort({ name: 1 })//asend and -1 desend
        // .select({ name: 1 , tags: 1 });
        /////
        // other examples
        // .find({ author: "Mosh", isPublished: true })
        // .limit(10)
        // .sort({ name: 1 })//asend and -1 desend
        // .count();
        /////
        // pagination
    const pageNumber = 2;
    const pageSize = 10;
    // const courses = await Course
    //     .find({ author: "Mosh", isPublished: true })
    //     .skip((pageNumber -1) * pageSize)
    //     .limit(pageSize)
    //     .sort({ name: 1 })//asend and -1 desend
    //     .select({ name: 1 , tags: 1 });
    console.log(courses);
}

getCourses();

////////////Update

async function updateCourse(id){
    // we have 2way to update
    // approach:query first
    // findById()
    // modify its properties
    // save

    // const course = await Course.findById(id);
    // if(!course) return;
    // course.isPublished = true;
    // course.author = "another author";
    // const result = await course.save();
    // console.log(result);

    ///////////
    // Approach: update first
    // update directly 
    // optionally:get the updated document

    const result = await Course.update({ _id: id },{
        // mongodb update operators: https://docs.mongodb.com/manual/reference/operator/update/
        $set:{
            author:"mosh",
            isPublished: false
        }
    // },{ new:true }); if you wanna get updated document 
    }); 

    console.log(result);
    
}
updateCourse("5a68fde3f09ad7646ddec17e");

async function removeCourse(id){
    const result = await Course.deleteOne({_id:id});
    const result = await Course.deleteOne({isPublished:false});// this method will find the first one and delete that 
    const result = await Course.deleteMany({isPublished: true});
    const result = await Course.findByIdAndRemove({isPublished: true});
    console.log(result); 
}
removeCourse("5a68fde3f09ad7646ddec17e");