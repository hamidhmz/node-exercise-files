console.log("Before");
// getUser1(1,function(user){
//     console.log("User",user);
// });
getUser1(1,displayRepository );
console.log("After");



function displayCommits(commits){
    console.log(commits);
}
function displayRepository(repository){
    console.log(repository);
}
function displayUsers(user){
    console.log("User",user);
    getRepositories(user.gitHubUsername,displayRepository);
}
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
