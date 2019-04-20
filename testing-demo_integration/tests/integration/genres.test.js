const request = require("supertest");
const {Genre} = require("../../models/genre");
const {User} = require("../../models/user");
const mongoose = require("mongoose");
let server;
const port = process.env.PORT || 3000;
describe("/api/genres",() => {
    beforeEach(() => {
        server = require("../../index");
    });
    afterEach(async () => {
        await Genre.remove({});
        await User.remove({});
        await server.close();
    });
    describe("Get /",() => {
        it("should return all genres",async() => {
            await Genre.collection.insertMany([
                {name:"genre11"},
                {name:"genre12"}
            ]);
            const res = await request(server).get("/api/genres");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === "genre11")).toBeTruthy();
            expect(res.body.some(g => g.name === "genre12")).toBeTruthy();
        });
    });
    describe("Get /:id",() => {
        it("should return the specific genres ",async() => {
            const _id = mongoose.Types.ObjectId();
            await Genre.collection.insertMany([
                {name:"genre1",_id:_id},
            ]);
            // console.log(_id.toHexString());
            const idToHexString = _id.toHexString();
            const res = await request(server).get(`/api/genres/${idToHexString}`);
            expect(res.status).toBe(200);
            expect(res.body.name === "genre1").toBeTruthy();
            expect(res.body._id === idToHexString).toBeTruthy();
        });
        it("should return 404 if invalid id is passed ",async() => {
            const res = await request(server).get(`/api/genres/${1}`);
            expect(res.status).toBe(404);
        });
        it("should return 404 if no genre with the given id exists ",async() => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get(`/api/genres/${id}`);
            expect(res.status).toBe(404);
        });
    });
    describe("POST /",() => {
        let token;
        let name;
        const exec = async () => {
            return await request(server)
                .post("/api/genres")
                .set("x-auth-token",token)
                // .send({name:name});//if key and value is the same we can just write key
                .send({name});
        }
        beforeEach(() => {
            token =new User().generateAuthToken();
            name = "genre13";
        });
        it("should return 401 if client is not logged in",async() => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it("should return 400 if genres is less than 5 characters",async() => {
            name = "1234";
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it("should return 400 if genres is more than 50 characters",async() => {
            name = new Array(52).join("a");
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it("should save the genre if it is valid",async() => {
            await exec();
            const genre = await Genre.find({name:"genre"});
            expect(genre).not.toBeNull();
        });
        it("should return the genre if it is valid",async() => {
            const res = await exec();
            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("name","genre13");
        });
    });
    describe("PUT /:id",()=>{
        let token;
        let name;
        let _id;
        const exec = async () => {
            return await request(server)
                .put("/api/genres/"+_id)
                .set("x-auth-token",token)
                // .send({name:name});//if key and value is the same we can just write key
                .send({name});
        }
        beforeEach(async () => {
            token =new User().generateAuthToken();
            name = "newGenre";
            _id = mongoose.Types.ObjectId();
            await Genre.collection.insertMany([
                {name:"genre1",_id:_id},
            ]);
        });
        it("should return 401 if client is not logged in",async() => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it("should return 400 if genres is less than 5 characters",async() => {
            name = "1234";
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it("should return 400 if genres is more than 50 characters",async() => {
            name = new Array(52).join("a");
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it("should return 404 if invalid id is passed ",async() => {
            _id = "";
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it("should return 404 if genre was given not found ",async() => {
            _id = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it("should return an updated genre ",async() => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("newGenre");
        });
    });
    describe("DELETE /:id",() => {
        let token;
        let _id;
        let user;
        let genreId;
        let genreName;
        const exec = async () => {
            return await request(server)
                .delete("/api/genres/"+genreId)
                .set("x-auth-token",token);
        }
        beforeEach(async () => {
            _id = mongoose.Types.ObjectId();
            genreName = "newGenre";
            genreId = mongoose.Types.ObjectId();
            await User.collection.insertMany([
                {name:"adminUser",email:"a@a.com",password:"123456",_id:_id,isAdmin:true},
            ]);
            user = await User.findOne({_id});
            token = user.generateAuthToken();
            await Genre.collection.insertMany([
                {name:genreName,_id:genreId},
            ]);
        });
        it("should return 401 if client is not logged in",async() => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it("should return 404 if invalid id is passed ",async() => {
            genreId = "";
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it("should return 404 if genre was given not found ",async() => {
            genreId = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });
        it("should return an deleted genre ",async() => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("newGenre");
        });
    });
});
