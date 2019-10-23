/*
* Created by NikNet 23.10.2019
*/
"use strict";
/*
* 1) Создайте функцию, которая принимает 1 аргумент (название произвольное)
— Если как аргумент передана не строка - функция оповещает об этом пользователя
— В полученной (как аргумент) строке функция должна убрать все пробелы в начале и в конце
— Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)
* */

let userString = prompt("Entra String:", "string");

function funcString (string) {
    if ( typeof string != "string" ) {
        return alert("Entra STRING only!!!!!");
    }
    if ( typeof string && string.length > 30 ) {
        return string.trim().slice(0, 30) + "...";
    } else {
        return string;
    }
}

console.log(funcString(userString));
    