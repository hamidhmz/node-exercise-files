const Joi = require("joi");
const express = require('express');
const app = express();

app.use(express.json());

let genres = [
    {id:1,name:"Drama"},
    {id:2,name:"Romance"},
    {id:3,name:"Music"},
    {id:3,name:"Comedy"},
    {id:3,name:"Western"},
    {id:3,name:"Horror"},
    {id:3,name:"Animation"},
    {id:3,name:"Fantasy"},
];

app.get("/",(req,res)=>{
    res.send("Wellcome to nodemon its a movie genre webservices! <br> for see all genres you can go to <a href='/api/genres'>this address</a>");
});
app.get("/api/genres",(req,res)=>{
    res.send(genres);
});
app.get("/api/genre/:id",(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    res.send(genre);
});
app.post("/api/genres",(req,res)=>{
    let { error } = validateCourse(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    let genre = { id: genres.length + 1 ,name: req.body.name};
    genres.push(genre);
    res.send(genre);
    
});
app.put("/api/genre/:id",(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre){
        return res.status(404).send("the genre with the given ID was not available");
    }else{
        let { error } = validateCourse(req.body);
        if (error){
            return res.status(400).send(error.details[0].message);
        }
        genre.name = req.body.name;
        
        res.send(genre);
    }
});
app.delete("/api/genre/:id",(req,res)=>{
    let genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send("the genre with the given ID was not available");
    }else{
        let genreIndex = genres.indexOf(genre);
        genres.splice(genreIndex,1);
        
        res.send(genre.name + " has been deleted");
    }
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