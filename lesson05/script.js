/*
* Created by NikNet 23.10.2019
*/
"use strict";

let money;
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую:", "100,250,50 etc.");
addExpenses.split(',');

const deposit = confirm("Есть ли у вас депозит в банке?");
let income = 'freelance';
let mission = 100000;

let start = () => {
    do {
        money = +prompt("Ваш месячный доход?", "10000.00");
        if (Number(money)) { break }
    } while (!isNaN(money) || money !== "" || money !== null);
    /*money = +prompt("Ваш месячный доход?", "10000.00");
      while (isNaN(money) || money === "" || money === null) {
        money = +prompt("Ваш месячный доход?", "10000.00");
    }*/
    return money;
};

console.log(start());


let showTypeOf = (item) => {
    return (item, typeof item);
};

console.log(showTypeOf(money));
console.log(showTypeOf(addExpenses));
console.log(showTypeOf(deposit));
console.log(showTypeOf(income));
console.log(showTypeOf(mission));


let expenses1;
let expenses2;

let getExpensesMonth = () => {
    let sum = 0;
    let amountSum;
    for (let i = 0; i < 2; i++) {

        if (i === 0) { expenses1 = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Taxi"); }
        if (i === 1) { expenses2 = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Internet"); }
        do {
            amountSum = +prompt("Во сколько это обойдется?", "100");
            if (Number(amountSum)) { break }
        } while ((!isNaN(amountSum) || amountSum !== "" || amountSum !== null));
        sum += amountSum;
    }
    return sum;
};

let expensesAmount = getExpensesMonth();
console.log("Month Expenses = " + expensesAmount);

let accumulatedMonth = 0;

let getAccumulatedMonth = () => {
    return accumulatedMonth = money - expensesAmount;
};

let budgetDay = getAccumulatedMonth() / 30;
console.log("day budget = " + budgetDay);

let getStatusIncome = () => {

    if ( budgetDay >= 800 ) {
        return ("Высокий уровень дохода");
    } else if ( budgetDay >= 300 ) {
        return ("Средний уровень дохода");
    } else if ( budgetDay >= 0 ) {
        return ("Низкий уровень дохода");
    } else {
        return ("ВНИМАНИЕ!!!!!!!Что то пошло не так");
    }

};

console.log(getStatusIncome());


let getTargetMonth = () => {
    return Math.floor(mission / getAccumulatedMonth());
};

if ( getTargetMonth() < 0 ) {
    console.log("Mission non be finish NEVER");
} else {
    console.log(`Final Mission after ${getTargetMonth()} month.`);
}
