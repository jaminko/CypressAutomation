function squareForNumbers(...arr) {
    let squareArr = [];

    for (const item of arr) {
        const squareItem = item * item;
        squareArr.push(squareItem);
    }

    return squareArr;
}

console.log(squareForNumbers(2, 4, 6, 8, 10));



