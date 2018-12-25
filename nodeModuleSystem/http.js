let http = require("http");
let server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.write("hello world");
        res.end();
    }
    if(req.url === "/api/courses"){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

// server.on("connection",(socket)=>{
//     console.log("new connection...");
// });

server.listen(3000);
console.log("listening on http://localhost:3000");