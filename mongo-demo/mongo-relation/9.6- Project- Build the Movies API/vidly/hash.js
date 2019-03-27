const bcrypt = require("bcrypt-nodejs");
// async function run(){
//     const salt = await bcrypt.genSalt(10,salt,);
//     const hashed = await bcrypt.hash("1234",salt);
//     console.log(salt);
// }
bcrypt.genSalt(10, async function (err, salt){
    console.log(salt);
    bcrypt.hash("1234",salt,null,function(err,hash){
        console.log(hash);
    });
    
});

// run();