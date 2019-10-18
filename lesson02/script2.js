"use strict";

/*
* Необходимо выполнить в отдельном JS файле, подключенному к отдельной HTML странице
1) Создать переменную num со значением 266219
   ·  Вывести в консоль произведение (умножение) цифр этого числа
2) Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)
   ·  Вывести на экран первые 2 цифры полученного числа
3) Добавить папку или ветку со вторым уроком в свой репозиторий на GitHub
* */

let num = 266219;
let arrDig = num.toString().split('');
let sum = arrDig.map(Number).reduce(function(a, b) {
    return a * b;
});
console.log(sum);

let sumPow = sum ** 3;
console.log(sumPow);
alert('First digitals: ' + sumPow.toString().slice(0, 2));