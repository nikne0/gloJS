"use strict"

/*
* 2) В файле скрипта создать переменные:
	    - money,
        - income,
        - addExpenses,
        - deposit,
        - mission,
        - period
*
* */

let money = 500;
let income = 5000;
let addExpenses = 500;

let totalExpenses = () => {
    return money + addExpenses * 12;
};

let profit = () => {
    return income * 12;
};

let deposit = () => {
    return profit() - totalExpenses();
};

const mission = "Impossible Mission";
const period = "Six weeks";

alert("Benvenuto Student!!!");

console.log("You started an " + mission + " length of " + period + ".");
console.log("A year later, you will be rewarded " + deposit() + " Euro!!!!!");
