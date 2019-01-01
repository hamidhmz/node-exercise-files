const Joi = require("joi");
const express = require('express');
const app = express();

app.use(express.json());

let movies = [
    {id:1,name:"leopard"},
    {id:2,name:"legend"},
    {id:3,name:"lock"}
];
app.get('/', (req,res) => {
    res.send(JSON.stringify('hello world'));
});
app.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify([1,2,3]));
});
app.get("/api/courses/:id",(req,res)=>{
    res.send(JSON.stringify(req.params));
});
app.get("/api/courses/:id",(req,res)=>{
    res.send(JSON.stringify(req.params.id));
});
app.get("/api/courses/:year/:month",(req,res)=>{
    res.send("year: "+JSON.stringify(req.params.year)+" month: "+JSON.stringify(req.params.month));
});
app.get("/api/users",(req,res)=>{
    res.send(req.query);//for queryString parameter
});
app.get("/api/movies",(req,res)=>{
    res.send(movies);
});
app.get("/api/movie/:id",(req,res)=>{
    let movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie){
        res.status(404).send("the movie with the given ID was not available");
    }else{
        res.send(movie);
    }
});
app.post("/api/movies",(req,res)=>{
    let schema = {
        name:Joi.string().min(3).required()
    };
    let result = Joi.validate(req.body, schema);
    console.log(result);
    if (result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // if(!req.body.name || req.body.name.length < 3){//data validation
    //     //400 bad request
    //     res.status(400).send("Name is required and should be minimum 3 character");
    //     return;
    // }
    let movie = {
        id:movies.length + 1 , 
        name:req.body.name
    };
    movies.push(movie);
    res.send(movie);
});
app.put("/api/movies/:id",(req,res)=>{
    let movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie){
        res.status(404).send("the movie with the given ID was not available");
    }else{
        movie.name = req.body.name;
        
        res.send(movie);
    }
    let { error } = validateCourse(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
});
app.delete("/api/movies/:id",(req,res)=>{
    let movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie){
        res.status(404).send("the movie with the given ID was not available");
    }else{
        let movieIndex = movies.indexOf(movie);
        movies.splice(movieIndex,1);
        
        res.send(movie);
    }
});
function validateCourse(movie){
    let schema = {
        name:Joi.string().min(3).required()
    };
    let result = Joi.validate(movie, schema);
    return result;
}
// app.post(); 
// app.put();
// app.delete();
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`http://localhost:${port}/`))