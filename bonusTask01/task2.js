/*
* Created by NikNet 24.10.2019
*/
"use strict";
/*
* Задача №2
Написать программу, которая спрашивает у пользователя начальный год и конечный, после выводит в консоль високосные годы.
Алгоритм определения високосного года следует найти в интернете самостоятельно.
Если пользователь ввел первый год больше второго, то тот, который меньше, принять за начало отчета, а который больше за конечную точку.
* */

let startYear = prompt("Enter first Year:", "1900");
let endYear = prompt("Enter second Year:", "2019");

if ( startYear < endYear) {
    for (let i = startYear; i <= endYear; i++) {
        if (((i % 4 == 0) && (i % 100 != 0)) || (i % 400 == 0)) {
            console.log(i)
        }
    }
} else {
    for (let i = endYear; i <= startYear; i++) {
        if (((i % 4 == 0) && (i % 100 != 0)) || (i % 400 == 0)) {
            console.log(i)
        }
    }
}

