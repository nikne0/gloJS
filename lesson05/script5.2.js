/*
* Created by NikNet 23.10.2019
*/
"use strict";

/*
* 1) Создать массив arr = []
— Записать в него 7 любых многозначных чисел в виде строк
— Вывести в консоль только те, что начинаются с цифры 2 или 4 (Должны присутствовать в массиве)
* */
let arr = ["245", "589", "490", "323", "281", "649","472"];

function arrFunc(arr) {
    arr.forEach( function(item) {

       if ( item.split('').shift().includes(2) || item.split('').shift().includes(4)  ) {
            return console.log(item);
       }

    });

}

arrFunc(arr);

/*
* 2) Вывести в столбик все простые числа от 1 до 100
— Статья про простые числа - КЛИК
— Рядом с каждым числом написать оба делителя данного числа
    Например: “Делители этого числа: 1 и n”
* */

nextPrime:
for ( let i = 2; i <= 100; i++ ) {

    for ( let j = 2; j < i; j++ ) {
        if (i % j == 0) continue nextPrime;
    }
    console.log(`${i} Делители этого числа: 1 и ${i}`);
}