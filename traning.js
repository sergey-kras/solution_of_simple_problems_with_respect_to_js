"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var partialAny = function (func) {
    var Mparams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        Mparams[_i - 1] = arguments[_i];
    }
    var obj = { e: 0 };
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        for (var Mitem in Mparams) {
            if (Mparams[Mitem] === undefined) {
                Mparams[Mitem] = params[obj.e];
                params.splice(obj.e--, 1);
                obj.e++;
            }
        }
        Mparams = Mparams.concat(params);
        Mparams.splice(func.length, Mparams.length - func.length);
        console.log(Mparams);
        return func.apply(null, Mparams);
    };
};
var bind = function (func, ctx) {
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return func.apply(ctx, params);
    };
};
var pluck = function (arr, name) {
    var result = [];
    for (var Aitem in arr) {
        for (var Oitem in arr[Aitem]) {
            Oitem === name ? result.push(arr[Aitem][Oitem]) : null;
        }
    }
    return result;
};
var filter = function (arr, func) {
    var res = [];
    for (var item in arr) {
        func(arr[item]) ? res.push(arr[item]) : null;
    }
    return res;
};
var count = function (obj) {
    var count = 0;
    for (var item in obj) {
        count++;
    }
    return count;
};
var a = { a: 1, b: 2 };
console.log(count(a)); // 2
var b = function () { };
console.log(count(b)); // 0
var c = [1, 2, 3];
console.log(count(c)); // 3
var d = [];
d[100] = 1;
console.log(count(d)); // 1
