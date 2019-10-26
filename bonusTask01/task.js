/*
* Created by NikNet 24.10.2019
*/
"use strict";
/*
*
Задача №1
Написать программу, которая последовательно запрашивает два числа, после чего сравнивает их и выводит сообщение:
«Первое число больше второго», «Второе число больше первого» или «Числа равны».
Необходимо учесть ситуации, когда пользователь ввел строку или вообще не ввел ничего.
* */

let a = 0;
let b = 0;
let num;

let compareNumber = () => {

    for (let i = 0; i < 2; i++) {
        do {
            num = prompt("Entra number:", "0");

              if (i === 0) { a = +num; }
              if (i === 1) { b = +num; }

          if (typeof num === 'number') { break }

      } while ( num == null || !isFinite(num) || num === ' ' );

    }

    if ( a > b ) {
        console.log("Первое число больше второго");
    } else if (a === b) {
        console.log("Числа равны");
    } else {
        console.log("Второе число больше первого");
    }
};


compareNumber();


    