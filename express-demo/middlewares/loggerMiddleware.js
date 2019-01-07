function logger(req,res,next){
    console.log("this come from middleware logger in another file");
    next();
}
module.exports = logger