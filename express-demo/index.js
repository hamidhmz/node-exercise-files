const startupDebugger = require('debug')('app:startup');//for see this debugger set export DEBUG=app:startup  OR DEBUG=app:startup,app:db OR DEBUG=*
const dbDebugger = require('debug')('app:db');//for see this debugger set export DEBUG=app:db OR DEBUG=app:startup,app:db OR DEBUG=*
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require('express');
const logger = require("./middlewares/loggerMiddleware");
const router = require("./routes/web");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");//defult path

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);
console.log("Application Name: "+ config.get("name"));
console.log("Mail Server: "+ config.get("mail.host"));
console.log("Mail password: "+ config.get("mail.password"));//seted as environ variable as app_password and declear in custom-environment-variables.json and can use every where 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development"){
    app.use(morgan("tiny"));
    startupDebugger("morgan enabled...");//for see this debugger set export DEBUG=app:startup   OR DEBUG=app:startup,app:db OR DEBUG=*
}

//db work...
dbDebugger("connected to the database...");//for see this debugger set export DEBUG=app:db  OR DEBUG=app:startup,app:db OR DEBUG=*

app.use("/", router);

app.use(logger);
//costume middleware
app.use(function(req,res,next){
    console.log("legged in ...");
    next();
});




// app.post(); 
// app.put();
// app.delete();
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`http://localhost:${port}/`))