"use strict";

/*
* 1) Следующим переменным присвоить значения
   - money - любое число “Доход за месяц”,
   - income - строка с дополнительными доходом (например, фриланс или такси),
   - addExpenses - строка с перечислением дополнительных расходов через запятую (минимум 3 значения),
   - deposit - любое булевое значение,
   - mission - любое число (Какую сумму хотите накопить),
   - period - число от 1 до 12
* */

let money = 6000;
let income = 'freelance';
let addExpenses = 'Taxi, Avia, Viaggio';
const deposit = true;
let mission = 100000;
const period = 12;

console.log(addExpenses);

/*
* 2) Используя методы и свойства:
   - Вывести в консоль тип данных значений переменных money, income, deposit;
   - Вывести в консоль длину строки income
   - Вывести в консоль “Период (period) месяцев” и “Цель заработать (mission) рублей/долларов/гривен/юани”
   - Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль
   - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30), вывести в консоль результат и остаток        от деления
* */

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(income.length);

console.log(`Период ${period} месяцев`);
console.log(`Цель заработать ${mission} euro`);

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = () => {
    let dayBudg = money / 30;
    let resDivis = money % 30;
    return console.log(`Mio giorni profit e ${dayBudg} euro. \nE resto della divisione ${resDivis} euro.`);
};
budgetDay();



