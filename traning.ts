import { appendFile } from "fs";
import { Context } from "vm";

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
let partialAny = (func: Function, ...Mparams: Array<any>) => {
    let obj = { e: 0 };
    return (...params: Array<any>) => {
        for (let Mitem in Mparams) {
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
    }
}
let bind = (func: Function, ctx: Context) => {
    return (...params: Array<any>) => {
        return func.apply(ctx, params);
    }
}
let pluck = () => {

}
var characters = [
    { 'name': 'barney', 'age': 36 },
    { 'name': 'fred', 'age': 40 }
];

console.log(pluck(characters, 'name')); // ['barney', 'fred']
