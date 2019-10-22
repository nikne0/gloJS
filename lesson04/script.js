/*
* Created by NikNet 22.10.2019
*/
"use strict";

/*
* 1.Создать следующие функции:
— функция  getExpensesMonth. Функция возвращает сумму всех расходов за месяц
— функция getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
Результат сохранить в переменную accumulatedMonth
— функция  getTargetMonth. Подсчитывает за какой период будет достигнута цель,
зная результат месячного накопления и возвращает результат

2) Все консоль логи которые были до этого почистить и вывести в консоль:
— Оставить функции showTypeof и getStatusIncome, которые написали в уроке
— Накопления за период
— Срок достижения цели в месяцах (значение округлить в меньшую сторону)
* */


let money = +prompt("Ваш месячный доход?", "10000.00");
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую:", "100,250,50 etc.");
addExpenses.split(',');

const deposit = confirm("Есть ли у вас депозит в банке?");
let income = 'freelance';
let mission = 100000;

let showTypeOf = (data) => {
    return (data, typeof data);
};

console.log(showTypeOf(money));
console.log(showTypeOf(addExpenses));
console.log(showTypeOf(deposit));
console.log(showTypeOf(income));
console.log(showTypeOf(mission));



let question1 = () => {
    return +prompt("Какие обязательные ежемесячные расходы у вас есть?", "");
};

let question2 = () => {
    return +prompt("Во сколько это обойдется?", "");
};

let answer1 = (question1());
let answer2 = (question1());
let answer3 = (question2());
let answer4 = (question2());


let budgetMonth = () => {
    return money - (+answer3 + +answer4);
};

let timeMission = Math.ceil(mission / budgetMonth());

let budgetDay = budgetMonth() / 30;

let getStatusIncome = () => {

    if ( budgetDay > 800 ) {
        return ("Высокий уровень дохода");
    } else if ( budgetDay <= 800 || budgetDay >= 300 ) {
        return ("Средний уровень дохода");
    } else if ( budgetDay >= 0 || budgetDay < 300 ) {
        return ("Низкий уровень дохода");
    } else {
        return ("ВНИМАНИЕ!!!!!!!Что то пошло не так");
    }

};

console.log(getStatusIncome());



let getExpensesMonth = () => {
    return (+answer3 + +answer4);
};

let accumulatedMonth = 0;

let getAccumulatedMonth = () => {
    return accumulatedMonth = money - getExpensesMonth();
};

console.log(getAccumulatedMonth());
console.log(accumulatedMonth);

let getTargetMonth = () => {
    return Math.floor(mission / getAccumulatedMonth());
};

console.log(`Final Mission after ${getTargetMonth()} month.`);