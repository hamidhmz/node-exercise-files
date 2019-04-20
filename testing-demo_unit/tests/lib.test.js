
const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute",() =>{
    it("should return a positive number if input is positive",()=>{
        const result = lib.absolute(1)
        expect(result).toBe(1);
    });
    
    it("should return a positive number if input is negative",()=>{
        const result = lib.absolute(-1)
        expect(result).toBe(1);
    });
    
    it("should return a zero number if input is zero",()=>{
        const result = lib.absolute(0)
        expect(result).toBe(0);
    });
});

describe("greet",() => {
    it ("should return the greeting message",() => {
        const result = lib.greet("mosh");
        // expect(result).toBe("Welcome mosh");
        expect(result).toMatch(/mosh/);
        expect(result).toContain("mosh");
    })
});

describe("getCurrencies",() => {
    it ("should return supported currencies",() => {
        const result = lib.getCurrencies();

        //Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too specific
        expect(result[0]).toBe("USD");
        expect(result[1]).toBe("AUD");
        expect(result[2]).toBe("EUR");
        expect(result.length).toBe(3);

        //Proper way
        expect(result).toContain("USD");
        expect(result).toContain("AUD");
        expect(result).toContain("EUR");

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(["EUR","USD","AUD"]));
    });
});

describe("getProduct",() => {
    it("should return the product with the given id",() => {
        const result = lib.getProduct(1);
        // expect(result).toBe({id:1,price:10});problem!!!!!!!!!!!
        expect(result).toEqual({id:1,price:10});//you must give all property in here
        expect(result).toMatchObject({id:1,price:10});//you dont need give all property in here
        expect(result).toHaveProperty("id",1);
    });
});

describe("registerUser",() => {
    it("should throw if username is falsy",() => {
        //null
        //undefined
        //NaN
        //''
        //0
        //false
        // expect(() => {lib.registerUser(null)}).toThrow();
        const args = [null,undefined,NaN,"",false];
        args.forEach(a => {
            expect(() => {lib.registerUser(a)}).toThrow();
        });
    });
    it("should return a user Object if valid username is passed",() => {
        const result = lib.registerUser("mosh");
        expect(result).toMatchObject({username:"mosh"});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe("applyDiscount",() => {
    it("should apply 10% discount if customer has more than 10 points",() => {
        db.getCustomerSync = function(customerId){
            console.log("fake reading customer...");
            return{ id: customerId,points:20 };
        }
        const order = {customerId:1,totalPrice:10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe("notifyCustomer",() => {
    it("should send an email to the customer ",() => {
        db.getCustomerSync = function(customerId){
            return {email:"a"};
        }
        let mailSent = false;
        mail.send = function(email,message){
            mailSent = true;
        }
        lib.notifyCustomer({customerId:1});
        expect(mailSent).toBe(true);
    });
});

//jest mockFunction
// const mockFunction = jest.fn();
// mockFunction.mockReturnValue(1);
// mockFunction.mockResolvedValue(1);
// mockFunction.mockRejectedValue(new Error("..."));
// const result = await mockFunction();
describe("notifyCustomer",() => {
    it("should send an email to the customer ",() => {
        db.getCustomerSync = jest.fn().mockReturnValue({email:"a"});

        // db.getCustomerSync = function(customerId){
        //     return {email:"a"};
        // }
        mail.send = jest.fn();
        // let mailSent = false;
        // mail.send = function(email,message){
        //     mailSent = true;
        // }
        lib.notifyCustomer({customerId:1});
        // expect(mailSent).toBe(true);
        expect(mail.send).toHaveBeenCalled();
    });
});