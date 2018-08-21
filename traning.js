"use strict";
var sequence = function (start, step) {
    if (start === void 0) { start = 0; }
    if (step === void 0) { step = 1; }
    var obj = { e: 1 };
    return function () {
        if (obj.e > 1)
            return start += step;
        obj.e++;
        return start;
    };
};
var take = function (func, count) {
    var some = [];
    for (var i = 0; i < count; i++) {
        some.push(func());
    }
    return some;
};
var map = function (func, arr) {
    var array = [];
    for (var item in arr) {
        array.push(func(arr[item]));
    }
    return array;
};
var fmap = function (func, gen) {
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return func(gen.apply(null, params));
    };
};
function add(a, b) {
    return a + b;
}
var partial = function (func) {
    var Mparams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        Mparams[_i - 1] = arguments[_i];
    }
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return func.apply(null, Mparams.concat(params));
    };
};
function mult(a, b, c, d) { return a * b * c * d; }
var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5
console.log(add5(2)); // 7
console.log(add5(10)); // 15
console.log(add5(8)); // 13
var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3
console.log(mult23(4, 5)); // 2*3*4*5 = 120
console.log(mult23(1, 1)); // 2*3*1*1 = 6
