const express = require('express');
const router = express.Router();
let movies = [
    {id:1,name:"leopard"},
    {id:2,name:"legend"},
    {id:3,name:"lock"}
];
router.get("/view/1",(req,res)=>{
    res.render("index",{title:"my express router",message:"hello"});
})
router.get('/', (req,res) => {
    res.send(JSON.stringify('hello world'));
});
router.get('/api/courses',(req,res)=>{
    res.send(JSON.stringify([1,2,3]));
});
router.get("/api/courses/:id",(req,res)=>{
    res.send(JSON.stringify(req.params));
});
router.get("/api/courses/:id",(req,res)=>{
    res.send(JSON.stringify(req.params.id));
});
router.get("/api/courses/:year/:month",(req,res)=>{
    res.send("year: "+JSON.stringify(req.params.year)+" month: "+JSON.stringify(req.params.month));
});
router.get("/api/users",(req,res)=>{
    res.send(req.query);//for queryString parameter
});
router.get("/api/movies",(req,res)=>{
    res.send(movies);
});
router.get("/api/movie/:id",(req,res)=>{
    let movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie){
        res.status(404).send("the movie with the given ID was not available");
    }else{
        res.send(movie);
    }
});
router.post("/api/movies",(req,res)=>{
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
router.put("/api/movies/:id",(req,res)=>{
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
router.delete("/api/movies/:id",(req,res)=>{
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
module.exports = router