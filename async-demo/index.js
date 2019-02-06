//this is an example for asynchronous or none blocking program 

console.log("Before");
setTimeout(()=>{
    console.log("Reading a user from a database...");
},3000);//example of none blocking function(asynchronous) this function programmed to trigger in future
console.log("After");





console.log("Before");
const user = getUser(1);
console.log(user);
console.log("After");
//Callbacks
//Promises
//Async/await



function getUser(id){
    setTimeout(()=>{
        console.log("Reading a user from a database...");
        return {id:id, gitHubUsername: "mosh"};
    },2000);
}

console.log("Before");
// getUser1(1,function(user){
//     console.log("User",user);
// });
getUser1(1,(user) => {
    console.log("User",user);
    getRepositories(user.gitHubUsername,(repository) => {
        console.log(repository);
        getCommits(repository,displayCommits);
    });
});
console.log("After");

function getUser1(id,callback){
    setTimeout(()=>{
        console.log("Reading a user from a database...");
        callback({id:id, gitHubUsername: "mosh"});
    },2000);
}
function getRepositories(username,callback){
    setTimeout(()=>{
        callback(["repo1","repo2","repo3"]);
    },2000);
}

//this is an example for synchronous or blocking program 

console.log("Before");
function blocking (flag){
    
    if(!flag){
        setTimeout(()=>{
            console.log("Reading a user from a database...");
            
            blocking(true);
        },3000);
        return;
    }   
    console.log("After");
}

blocking(false);