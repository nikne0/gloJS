/*
* Created by NikNet 25.10.2019
*/
"use strict";


let money;

let start = () => {
    do {
        money = prompt("Ваш месячный доход?", "10000.00");
        if (Number(money)) { break }

    } while (!isNaN(money) || money !== "" || money !== null);
    return money;
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 10000,
    period: 3,
    asking: function () {
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую:", "100,250,50 etc.");
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        let question1;
        let question2;
        let answer1;
        let answer2;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                do {
                    question1 = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Taxi");
                    answer1 = prompt("Во сколько это обойдется?", "100");

                } while ( isNaN(answer1) || answer1 === "" || answer1 === null );
                appData.expenses.question1 = +answer1;

            }
            if (i === 0)  {
                do {
                    question2 = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Casa");
                    answer2 = prompt("Во сколько это обойдется?", "200");

                } while ( isNaN(answer2) || answer2 === "" || answer2 === null  );
                appData.expenses.question2 = +answer2;

            }

        }

    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },

    getBudget: function() {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },

    getTargetMonth: function() {
        return Math.floor(appData.mission / appData.budgetMonth);
    },

    getStatusIncome: function() {
        if ( appData.budgetDay >= 800 ) {
            console.log("Высокий уровень дохода");
        } else if ( appData.budgetDay >= 300 ) {
            console.log("Средний уровень дохода");
        } else if ( appData.budgetDay >= 0 ) {
            console.log("Низкий уровень дохода");
        } else {
            console.log("ВНИМАНИЕ!!!!!!!Что то пошло не так");
        }

    }

};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.dir( "Расходы за месяц: " + appData.expensesMonth);

if ( appData.getTargetMonth() < 0 ) {
    console.log("Mission non be finish NEVER");
} else {
    console.log(`Final Mission after ${appData.getTargetMonth()} month.`);
}

console.log(appData);
console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
    console.log(`${key} : ${appData[key]}`);
}




