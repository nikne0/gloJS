/*
* Created by NikNet 24.10.2019
*/
"use strict";
/*
*
* Задача №4
Написать простой игровой бот, который:
+1) Загадывает число от 1 до 100
+2) Задает вопрос пользователю: «Угадай число»
+3) Если пользователь ввел число меньше, чем загаданное, то бот сообщает «Больше!» и предлагает ввести новый вариант
+4) Если пользователь ввел число больше, чем загаданное, то бот выводит «Меньше!» и предлагает ввести новый вариант
+5) Если пользователь ввел правильное число, то бот выводит «Поздравляю вы угадали!!!»
+6) После угаданного число бот спрашивает «Хотите сыграть еще?»
+7) Если пользователь ввел не число, то выводит «Введи число!» и предлагает ввести новый вариант
+8) Если пользователь нажимает «Отмена», то игра заканчивается
*/


    let random = (min, max) => {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    };

    let a = random(1, 100);
    console.log(a);



    let number;

    while (number = prompt("What is the number?", "")) {
        if (isNaN(number)) {
            alert("Enter NUMBER ONLY!!!");
        } else if (+number > a) {
            alert("Меньше");
        } else if (+number < a) {
            alert("Больше");
        } else if (+number === a) {
            alert("BRAVISSIMO!!!!!");
            let ask = confirm("Хотите сыграть еще?");
            if ( ask === true ) {
                continue;
                //random();
            } else {
                break;
            }
        }
    }

    /*
    * НЕмного не доделано, так как при согласии «Хотите сыграть еще?» не реализована рандомизация нового числа
    * соответственно нужно реализовать, хотя в условии этого и нет, но логика подсказываает
    * */





