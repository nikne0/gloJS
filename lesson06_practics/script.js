/*
* Created by NikNet 29.10.2019
*/
"use strict";

let money;

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 10000,
    period: 3,
    asking: function () {

        let cashIncome;
        let itemIncome;
        let addExpenses;
        if (confirm("Есть ли у Вас дополнительный заработок?")) {

            do {
                itemIncome = prompt("Какой дополнительнй заработок?", "Taxi");
            } while ( !isNaN(itemIncome) || itemIncome === " " || itemIncome === null );

            do {
                cashIncome = prompt("Сколько в месяц на этом зарабатываете?", "1000");
            } while ( isNaN(cashIncome) || cashIncome === " " || cashIncome === null );
            appData.income[itemIncome] = cashIncome;
        }

        do {
            addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую:", "100,250,50 etc.");
        } while ( !isNaN(addExpenses) || addExpenses === " " || addExpenses === null );
        appData.addExpenses = addExpenses.toLowerCase().split(',');

// Функци для работы со строкой
        function arrString(str) {
            return str.split(',').map(
                    (word, index) => word[0].toUpperCase() + word.slice(1)
                ).join(', ');
        }
        console.log(arrString(addExpenses));


        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        let question;
        let answer;

        for (let i = 0; i < 2; i++) {
            do {
                question = prompt("Какие обязательные ежемесячные расходы у вас есть?", "Taxi");
                answer = prompt("Во сколько это обойдется?", "100");

            } while ( isNaN(answer) || answer === "" || answer === null );
            appData.expenses[question] = +answer;

        }



    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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

    },
    getInfoDeposit: function () {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt("Какой % по депозиту?", "");
            } while ( isNaN(appData.percentDeposit) || (appData.percentDeposit) === " " || (appData.percentDeposit) === null );

            do {
                appData.moneyDeposit = prompt("Какая сумма депозита?", 1000000);
            } while ( isNaN(appData.moneyDeposit) || (appData.moneyDeposit) === " " || (appData.moneyDeposit) === null );

        }
    },

    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period;
    }

};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();


console.log( "Расходы за месяц: " + appData.expensesMonth);

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

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());




    