const exercise1 = require("../exercise1");
describe("fizzBuzz",() => {
    it("should return `input should be a number.`",() => {
        const args = ["a",true,false,null,undefined,{}];
        args.forEach(a => {
            expect(() => {exercise1.fizzBuzz(a)}).toThrow();
        });
    });
    it("should return FizzBuzz if input is divisible by 3 and 5",() => {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe("FizzBuzz");
    });
    it("should return Fizz if input is divisible by 3",() => {
        const result = exercise1.fizzBuzz(9);
        expect(result).toBe("Fizz");
    });
    it("should return Buzz if input is divisible by 5",() => {
        const result = exercise1.fizzBuzz(50);
        expect(result).toBe("Buzz");
    });
    it("should return input if input is not divisible by 5 and 3",() => {
        const result = exercise1.fizzBuzz(1);
        expect(result).toBe(1);
    });
});