/*
* Created by NikNet 31.10.2019
*/
"use strict";

/*
* +1) Переписать метод getIncome аналогично getExpenses
+2) Создать метод addIncomeBlock аналогичный addExpensesBlock
+3) Округлить вывод дневного бюджета
+4) Число под полоской (range) должно меняться в зависимости от позиции range
+5) Добавить обработчик события внутри метода showResult, который будет отслеживать период и сразу менять значение в поле “Накопления за период”
+6) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать,
+* после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить (есть в верстке) на кнопку сбросить пока ничего не навешиваем
+7) Вместо проверки поля Месячный доход в методе Start, запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой
* */


// Функци для работы со строкой
function arrString(str) {
    return str.split(',').map(
        (word, index) => word[0].toUpperCase() + word.slice(1)
    ).join(', ');
}

// Получаем переменные с HTML

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    buttons = document.getElementsByTagName('button'),
    incomePlus = buttons[0],
    expensesPlus = buttons[1],
    checkbox = document.querySelector('#deposit-check'),
    additionalIncomeItem= document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount'),
    //incomeTitle = document.querySelector('.income-title'),
    // incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function() {

        if ( salaryAmount.value === "" ) {

            start.setAttribute('disable', '');
            return;
        } else {
            start.removeAttribute('disable', '');
            start.hidden = true;
            cancel.style.display = 'inline';
        }

        appData.budget = +salaryAmount.value;


        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.addIncomeBlock();
        appData.getTargetMonth();
        appData.getAddExpenses();
        //appData.getStatusIncome();
        appData.getAddIncome();
        appData.getBudget();
        appData.inputBlock();


        appData.showResults();
    },

    showResults: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());

        // Вызываем метод здесь, но можно и в другом месте
        appData.getPeriod();



    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if ( expensesItems.length === 3 ) {
            expensesPlus.style.display = 'none';
        }


    },

    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if ( incomeItems.length === 3 ) {
            incomePlus.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if ( itemExpenses !== '' && cashExpenses !== '' ) {
                appData.expenses[itemExpenses] = cashExpenses;
            }

        });

    },

    /*incomeItems.forEach(function (item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if ( incomeTitle !== '' && incomeAmount !== '' ) {
                appData.income[incomeTitle] = incomeAmount;
            }
        }),*/

//appData.addExpenses = addExpenses.toLowerCase().split(',');

    getIncome: function() {

        for ( let key in appData.income ) {
            appData.incomeMonth += +appData.income[key];

        }

    },

    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if ( item !== " " ) {
                appData.addExpenses.push(item);
            }
        });

    },

    getAddIncome: function() {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);  // округление в мен. сторону
    },

    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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

    //5) Добавить обработчик события внутри метода showResult,
    // который будет отслеживать период и сразу менять значение в поле “Накопления за период”
    getPeriod: function() {
        periodAmount.innerHTML = periodSelect.value;
        if ( periodAmount.innerHTML === periodSelect.value ) {
            incomePeriodValue.value = appData.calcPeriod();
        }

    },

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },

    // Для блоктровки инпутов
    inputBlock: function () {

        let divData = document.querySelector('div[class="data"]');
        let inputData = divData.querySelectorAll('input[type="text"]');
        inputData.forEach(function (item) {
            item.disabled = true;
        });

    },


};

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.getPeriod);


/*
console.log( "Расходы за месяц: " + appData.expensesMonth);
if ( appData.getTargetMonth() < 0 ) {
    console.log("Mission non be finish NEVER");
} else {
    console.log(`Final Mission after ${Math.ceil(appData.getTargetMonth())} month.`); // округляем до вверх до целого
}
*/



/*console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
    console.log(`${key} : ${appData[key]}`);
}*/






