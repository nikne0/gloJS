/*
* Created by NikNet 22.10.2019
*/
"use strict";

/*
*1. Переменная lang может принимать 2 значения: 'ru' 'en'.
Написать условия при котором в зависимости от значения lang будут выводится дни недели на русском или английском языке.
Решите задачу
    через if,
    через switch-case
    через многомерный массив без ифов и switch.
* */
let lang = prompt("Enter language for weeks days:", "ru or en");


/*if ( lang === "ru" ) {
    let langRU = "понедельник, вторник, среда, четверг, пятница, суббота, воскресенье";
    console.log(langRU);
} else if ( lang === "en" ) {
    let langEN = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday";
    console.log(langEN);
} else {
    alert("Enter CORRECT again");
};*/



/*switch ( lang ) {
    case "ru":
        let langRU = "понедельник, вторник, среда, четверг, пятница, суббота, воскресенье";
        console.log(langRU);
        break;
    case "en":
        let langEN = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday";
        console.log(langEN);
        break;
    default:
        alert("Enter CORRECT again");
}*/


let arrLang = [
    ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"],
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
];

( lang === "ru" ) ?
    console.log(arrLang[0]):
    ( lang === "en" ) ?
        console.log(arrLang[1]):
        alert("Enter CORRECT again");


/*
* 5. У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести в консоль “директор”,
* если значение “Максим” то вывести в консоль “преподаватель”, с любым другим значением вывести в консоль “студент”
	Решить задачу с помощью нескольких тернарных операторов, без использования if или switch
* */


let namePerson  = prompt("Enter you name Артем, Максим or....?", "Name");

( namePerson === "Артем" ) ?
    console.log("Директор") :
( namePerson === "Максим" ) ?
    console.log("Преподаватель") :
    console.log("Студент");




