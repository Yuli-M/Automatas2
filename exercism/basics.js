//inmutable cons
const MY_MUTABLE_VALUE_CONSTANT ={food: 'apple'};

//This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear';

console.log(MY_MUTABLE_VALUE_CONSTANT)
// => {food: "pear"}
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' });

// This silently fails
MY_VALUE_CONSTANT.food = 'pear';

MY_VALUE_CONSTANT;
// => { food: "apple" }const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' });

console.log(MY_VALUE_CONSTANT)

