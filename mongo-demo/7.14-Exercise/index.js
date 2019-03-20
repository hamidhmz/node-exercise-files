const mongoose = require("mongoose");
const helmet = require("helmet");
const express = require('express');
const router = require("./routes/web");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(helmet());
app.use("/", router);
//change a collection in mongo we use $unset
//like:
// async function updateAuthor(courseId){
//     const course = await course.update({_id:courseId},{
//         $unset:{
//             "author":""
//         }
//     });
// }

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`http://localhost:${port}/`))