/*
* Created by NikNet 31.10.2019
*/
"use strict";

/*
*
* 1) Привязать контекст вызова функции start к appData
+2) В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)
+3) Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
4) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать, после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
Метод reset должен всю программу возвращать в исходное состояние*
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
    divClass = document.querySelector('.calc'),
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
    periodAmount = document.querySelector('.period-amount'),
    divData = document.querySelector('div[class="data"]'),
    inputData = divData.querySelectorAll('input[type="text"]'),
    divResult = document.querySelector('.result'),
    valueResult = divResult.querySelectorAll('input[type="text"]');


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
            // start.removeAttribute('disable', '');
            start.hidden = true;
            cancel.style.display = 'inline';
        }

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        //this.addIncomeBlock();
        this.getTargetMonth();
        this.getAddExpenses();
        //appData.getStatusIncome();
        this.getAddIncome();
        this.getBudget();
        this.getPeriod();
        this.inputBlock();

        this.showResults();

    },

    showResults: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());

        // дублирован метод в функция, хотя  работает и так
        this.getPeriod();



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

//appData.addExpenses = addExpenses.toLowerCase().split(',');

    getIncome: function() {

        incomeItems.forEach(function (item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if ( incomeTitle !== '' && incomeAmount !== '' ) {
                appData.income[incomeTitle] = incomeAmount;
            }
        });

        for ( let key in this.income ) {
            this.incomeMonth += +this.income[key];
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
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },

    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);  // округление в мен. сторону
    },

    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;
    },

    getStatusIncome: function() {
        if ( this.budgetDay >= 800 ) {
            console.log("Высокий уровень дохода");
        } else if ( this.budgetDay >= 300 ) {
            console.log("Средний уровень дохода");
        } else if ( this.budgetDay >= 0 ) {
            console.log("Низкий уровень дохода");
        } else {
            console.log("ВНИМАНИЕ!!!!!!!Что то пошло не так");
        }

    },

    getInfoDeposit: function () {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt("Какой % по депозиту?", "");
            } while ( isNaN(this.percentDeposit) || (this.percentDeposit) === " " || (this.percentDeposit) === null );

            do {
                this.moneyDeposit = prompt("Какая сумма депозита?", 1000000);
            } while ( isNaN(this.moneyDeposit) || (this.moneyDeposit) === " " || (this.moneyDeposit) === null );

        }
    },

    getPeriod: function() {
        periodAmount.innerHTML = periodSelect.value;
        if ( periodAmount.innerHTML === periodSelect.value ) {
            incomePeriodValue.value = appData.calcPeriod();
        }

    },

    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },

    inputBlock: function () {
        inputData.forEach(function (item) {
            item.disabled = true;
        });
    },

    // Функция для очистки и сброса кнопки и очистки форм Слева и Справс
    resetForm: function () {
        // Сброс кнопок и очистка блока DATA + Range со значением
        inputData.forEach(function (item) {
            item.disabled = false;
            item.value = '';
            periodAmount.innerHTML = 1;
            periodSelect.value = 1;
            start.hidden = false;
            cancel.style.display = 'none';
        });

        // С брос и очистка блока Result
        valueResult.forEach(function (item) {
            item.value = '';
            item.disabled = false;
        });

    }

};

// привязка контекст вызова функции start к appData через bind
start.addEventListener('click', appData.start.bind(appData));

// Сброс и очистка форм при клике
cancel.addEventListener('click', appData.resetForm);



incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
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






