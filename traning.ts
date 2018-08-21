let sequence = (start: number = 0, step: number = 1) => {
    let obj = { e: 1 };
    return () => {
        if (obj.e > 1) return start += step;
        obj.e++;
        return start;
    }
}

let take = (func: Function, count: number) => {
    let some = [];
    for (let i = 0; i < count; i++) {
        some.push(func());
    }
    return some;
}
let map = (func: Function, arr: Array<Number>) => {
    let array = [];
    for (let item in arr) {
        array.push(func(arr[item]));
    }
    return array;
}

let fmap = (func: Function, gen: Function) => {
    return (...params: Array<any>) => {
        return func(gen.apply(null, params));
    }
}
function add(a: number, b: number) {
    return a + b;
}
let partial = (func: Function, ...Mparams: Array<any>) => {
    return (...params: Array<any>) => {
        return func.apply(null, Mparams.concat(params));
    }
}


function mult(a: number, b: number, c: number, d: number) { return a * b * c * d; }

var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13

var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6