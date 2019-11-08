/*
* Created by NikNet 07.11.2019
*/
"use strict";

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

const AppData = function () {

    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

};

AppData.prototype.check = function () {
    if ( salaryAmount.value !== '' ) {
        start.removeEventListener('disabled');
    }
};

AppData.prototype.start = function() {

    if ( salaryAmount.value === "" ) {
        start.setAttribute('disable', '');
        return;
    } else {
        // start.removeAttribute('disable', '');
        start.hidden = true;
        cancel.style.display = 'inline';
    }

    this.budget = +salaryAmount.value;

    // periodSelect.addEventListener('change', _this.getPeriod);




    this.getPeriod();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getTargetMonth();
    this.getAddExpenses();
    //appData.getStatusIncome();
    this.getAddIncome();
    this.getBudget();
    this.inputBlock();
    this.calcPeriod();
    this.showResults();

    this.eventListeners();

};

AppData.prototype.showResults = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();


};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if ( expensesItems.length === 3 ) {
        expensesPlus.style.display = 'none';
    }


};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if ( incomeItems.length === 3 ) {
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if ( itemExpenses !== '' && cashExpenses !== '' ) {
            _this.expenses[itemExpenses] = cashExpenses;

        }

    });

};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function (item) {
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;
        if ( incomeTitle !== '' && incomeAmount !== '' ) {
            _this.income[incomeTitle] = incomeAmount;
        }
    });

    for ( let key in this.income ) {
        this.incomeMonth += +this.income[key];
    }

};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        if ( item !== " " ) {
            _this.addExpenses.push(item);
        }
    });

};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if ( itemValue !== '' ) {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);  // округление в мен. сторону
};

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function() {
    if ( this.budgetDay >= 800 ) {
        console.log("Высокий уровень дохода");
    } else if ( this.budgetDay >= 300 ) {
        console.log("Средний уровень дохода");
    } else if ( this.budgetDay >= 0 ) {
        console.log("Низкий уровень дохода");
    } else {
        console.log("ВНИМАНИЕ!!!!!!!Что то пошло не так");
    }

};

AppData.prototype.getInfoDeposit = function () {
    if(this.deposit) {
        do {
            this.percentDeposit = prompt("Какой % по депозиту?", "");
        } while ( isNaN(this.percentDeposit) || (this.percentDeposit) === " " || (this.percentDeposit) === null );

        do {
            this.moneyDeposit = prompt("Какая сумма депозита?", 1000000);
        } while ( isNaN(this.moneyDeposit) || (this.moneyDeposit) === " " || (this.moneyDeposit) === null );

    }
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;

};

AppData.prototype.inputBlock = function () {
    inputData.forEach(function (item) {
        item.disabled = true;
    });
};

// Функция для очистки и сброса кнопки и очистки форм Слева и Справс
AppData.prototype.resetForm = function () {
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

};

// const appData = new AppData();
AppData.prototype.getPeriod = function () {
    periodAmount.innerHTML = periodSelect.value;
};

AppData.prototype.eventListeners = function () {
    const _this = this;
    incomePlus.addEventListener('click', _this.addIncomeBlock);
    expensesPlus.addEventListener('click', _this.addExpensesBlock);
    periodSelect.addEventListener('change', _this.getPeriod);

// Сброс и очистка форм при клике
    cancel.addEventListener('click', _this.resetForm);

};

const appData = new AppData();

// привязка контекст вызова функции start к appData через bind
start.addEventListener('click', appData.start.bind(appData));
