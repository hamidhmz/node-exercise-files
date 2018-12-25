function someFunction(arg){
    console.log(arg)
    console.log("arg: " + JSON.stringify(arg));
    console.log("name: " + arg.name);
    console.log("id: " + arg.id);
}
someFunction({id:10,name:"hamid"});

// invoke function
((arg) => {
    console.log(arg);
})("hamid");