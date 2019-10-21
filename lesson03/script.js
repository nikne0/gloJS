"use strict";

/*
* 1) Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
* */
let money = +prompt("Ваш месячный доход?", "10000.00");


/*
* 2) Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses,
* вывести в консоль в виде массива
* */
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую:", "100,250,50 etc.");
//console.log(addExpenses.split(','));
/*
* 3) Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булевое значение true/false)
* */
const deposit = confirm("Есть ли у вас депозит в банке?");
//console.log(deposit);

let income = 'freelance';
let mission = 100000;
/*
* 4) Вывести в консоль типы данных money, income, deposit
* */
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(typeof addExpenses);

/*
* 5) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в переменные
    “Какие обязательные ежемесячные расходы у вас есть?”
    “Во сколько это обойдется?”
в итоге 4 вопроса и 4 переменных
* */

let qestion1 = () => {
  return prompt("Какие обязательные ежемесячные расходы у вас есть?", "");
};

let qestion2 = () => {
    return prompt("Во сколько это обойдется?", "");
};

let answer1 = (qestion1());
let answer2 = (qestion1());
let answer3 = (qestion2());
let answer4 = (qestion2());

console.log(answer1);
console.log(answer2);
console.log(answer3);
console.log(answer4);

/*
* 6) Вычислить доход за месяц, учитывая обязательные расходы, сохранить в переменную budgetMonth и вывести результат в консоль
* */
let budgetMonth = () => {
    return money - (+answer3 + +answer4);
};
//console.log(budgetMonth());

/*
* 7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону
* */
let timeMission = Math.ceil(mission / budgetMonth());
console.log(timeMission);

/*
* 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход.
* Вывести в консоль  округлив в меньшую сторону (методы объекта Math в помощь)
* */
let budgetDay = budgetMonth() / 30;
console.log(Math.floor(budgetDay));

/*
* 9) Написать конструкцию условий
    Если budgetDay больше 800, то “Высокий уровень дохода”
    Если budgetDay больше 300 и меньше 800, то сообщение “Средний уровень дохода”
    Если budgetDay больше 0 и меньше 300 то в консоль вывести сообщение “Низкий уровень дохода”
    Если отрицательное значение то вывести “Что то пошло не так”
    учесть варианты 0, 300 и 800
* */

if ( budgetDay > 800 ) {
    console.log("Высокий уровень дохода");
} else if ( budgetDay <= 800 || budgetDay >= 300 ) {
    console.log("Средний уровень дохода");
} else if ( budgetDay >= 0 || budgetDay < 300 ) {
    console.log("Низкий уровень дохода");
} else {
    console.log("AHTUNG!!!!!!!Что то пошло не так");
}



