/*
* Created by NikNet 28.10.2019
*/
"use strict";

/*
* 1) Создать массив week и записать в него дни недели в виде строк
·        Вывести на экран все дни недели
·        Каждый из них с новой строчки
·        Выходные дни - курсивом
·        Текущий день - жирным шрифтом(использовать объект даты)
* */
const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let today = new Date().getDay(); // получаем текущий день недели
console.log(`Today is ${today}`);

for ( let i = 0; i < week.length; i++ ) {

    if ( i === today ) {  // если сегодня:
        if ( week[i] === 'Saturday' || week[i] === 'Sunday' ) {  // если сегодня + выходной
            document.write(`<p><b><i>${week[i]}</i></b></p>`) // выводим жир+курсив
        } else {
            document.write(`<p><b>${week[i]}</b></p>`)  // если обычн. день выводим Жир
        }
    } else if ( week[i] === 'Saturday' || week[i] === 'Sunday' ) {  //  если другие дни выходные
        document.write(`<p><i>${week[i]}</i></p>`) // выводим Курс.
    } else {
        document.write(`<p>${week[i]}</p>`); //  просто текст
    }

    console.log(week[i]);
}
    