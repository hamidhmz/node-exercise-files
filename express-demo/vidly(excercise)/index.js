const mongoose = require("mongoose");
const Joi = require("joi");
const express = require('express');
const app = express();
mongoose.connect("mongodb://localhost/genre")
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("could not connect to mongoDB...",err));
app.use(express.json());
const genreSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:40,
        uppercase:true,
        unique:true
    }
});
const Genre = mongoose.model("Genre",genreSchema);
const customersSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    }
});
const Customer = mongoose.model("Customer",customersSchema);
async function createCustomer(isGold,name,phone){
    const customer = new Customer({
        isGold: isGold,
        name:name,
        phone:phone
    });
    try{
        // await course.validate(); you can manually validate
        const result = await customer.save();
        console.log(result);
    }catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
}
createCustomer(false,"Customer 1","12345");
async function createCourse(){
    const genre = new Genre({
        name: "Drama"
    });
    try{
        // await course.validate(); you can manually validate
        const result = await genre.save();
        console.log(result);
    }catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
}
// createCourse();
// let genres = [
//     {id:1,name:"Drama"},
//     {id:2,name:"Romance"},
//     {id:3,name:"Music"},
//     {id:3,name:"Comedy"},
//     {id:3,name:"Western"},
//     {id:3,name:"Horror"},
//     {id:3,name:"Animation"},
//     {id:3,name:"Fantasy"},
// ];

app.get("/",(req,res)=>{
    res.send("Wellcome to nodemon its a movie genre webservices! <br> for see all genres you can go to <a href='/api/genres'>this address</a>");
});
app.get("/api/genres",async (req,res)=>{
    const genres = await Genre
    .find()
    .select({name:1});
    res.send(genres);
});
app.get("/api/genre/:id",async (req,res)=>{
    const genres = await Genre
        .findById(req.params.id);
    // let genre = genres.find(c => c.id === parseInt(req.params.id));
    res.send(genres);
});
app.post("/api/genres",async (req,res)=>{
    let { error } = validateCourse(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    const genre = new Genre({
        name:req.body.name
    });
    try{
        const result = await genre.save();
        res.send(result);
    }catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);

        res.send(ex.errmsg);
    }
    // let genre = { id: genres.length + 1 ,name: req.body.name};
    // genres.push(genre);
    // res.send(genre);
});
app.put("/api/genre/:id",async (req,res)=>{
    try{
        const result = await Genre.update({ _id: req.params.id },{
            $set:{
                name:req.body.name,
            }
        }); 
    // console.log(result);
    
        res.send(result);
    }catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);

        res.send(ex.errmsg);
    }
    // let genre = genres.find(c => c.id === parseInt(req.params.id));
    // if(!result){
    //     // return res.status(404).send("the genre with the given ID was not available");
    // }else{
    //     let { error } = validateCourse(req.body);
    //     if (error){
    //         return res.status(400).send(error.details[0].message);
    //     }
    //     // genre.name = req.body.name;
        
    //     res.send(genre);
    // }
});
app.delete("/api/genre/:id",async (req,res)=>{
    try{
        const result = await Genre.deleteOne({_id:req.params.id});
        res.send(result);
    }catch(ex){
        for(field in ex.errors)
            console.log(ex.errors[field].message);

        res.status(404).send("the genre with the given ID was not available");
    }
    // let genre = genres.find(c => c.id === parseInt(req.params.id));
    // if(!genre){
    //     res.status(404).send("the genre with the given ID was not available");
    // }else{
    //     let genreIndex = genres.indexOf(genre);
    //     genres.splice(genreIndex,1);
        
    //     res.send(genre.name + " has been deleted");
    // }
});
function validateCourse(genre){
    let schema = {
        name:Joi.string().min(3).required()
    };
    let result = Joi.validate(genre, schema);
    return result;
}
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`http://localhost:${port}/`));