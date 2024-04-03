const testArray = [
  {
    name: "Alice Johnson",
    age: 25,
    sex: "Female",
    profession: "Graphic Designer",
    id: "XYZ789",
  },
  {
    name: "Bob Smith",
    age: 35,
    sex: "Male",
    profession: "Engineer",
    id: "ABC456",
  },
  {
    name: "Eva Martinez",
    age: 28,
    sex: "Female",
    profession: "Teacher",
    id: "DEF123",
  },
  {
    name: "Charlie Brown",
    age: 17,
    sex: "Male",
    profession: "Doctor",
    id: "GHI789",
  },
  {
    name: "Grace Lee",
    age: 16,
    sex: "Female",
    profession: "Marketing Specialist",
    id: "JKL234",
  },
];

const count = {
  men: 0,
  women: 0,
  olderThan18: 0,
  yangerThan18: 0,
};

function jsForEach() {
  testArray.forEach(function (item) {
    if (item.sex === "Male") {
      count.men++;
    } else count.women++;
    // item.sex === "Male" ? count.men++ : count.women++; - the same code using ternary operator
  });
  return count;
}

function jsFilter1() {
  testArray.filter(function (item) {
    if (item.age >= 18) {
      count.olderThan18++;
    } else count.yangerThan18++;
    // item.age >= 18 ? count.olderThan18++ : count.yangerThan18++; - the same code using ternary operator
  });
  return count;
}

function jsFilter2() {
  const adultUsers = testArray.filter(function (item) {
    return item.age >= 18;
  });
  return adultUsers;
}

function jsFilter3() {
  const getUserByName = testArray.filter(function (item) {
    return item.name === "Charlie Brown";
  });
  return getUserByName;
}

function jsMap() {
  const getUserBySexAndAddPrefix = testArray.map(function (item) {
    return item.sex === "Male" ? "Mr. " + item.name : "Mrs. " + item.name;
  });
  return getUserBySexAndAddPrefix;
}

function jsReduce() {
  const averageAge = testArray.reduce(function (accumulator, currentValue, index, arr) {
    return accumulator + currentValue.age;
  }, 0);
  return averageAge;
}

/* console.log(jsFilter1(count));
console.log(jsFilter2());
console.log(testArray);
console.log(jsFilter3());
console.log(jsMap()); */
console.log(jsReduce());

