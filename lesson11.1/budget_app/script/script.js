/*
* Created by NikNet 08.11.2019
*/
"use strict";

// Получаем переменные с HTML
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    buttons = document.getElementsByTagName('button'),
    incomePlus = buttons[0],
    expensesPlus = buttons[1],
    divClass = document.querySelector('.calc'),
    depositCheck = document.querySelector('#deposit-check'),
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
    valueResult = divResult.querySelectorAll('input[type="text"]'),
    depositBank = document.querySelector('.deposit-bank');


const AppData = function () {

    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.depositAmount = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

};

AppData.prototype.check = function() {
    if ( salaryAmount.value !== '' ) {
        start.removeEventListener('disabled');
    }
};

AppData.prototype.start = function() {

    if ( salaryAmount.value === "" ) {
        start.setAttribute('disable', '');
        return;
    } else {
        start.hidden = true;
        cancel.style.display = 'inline';
    }

    this.budget = +salaryAmount.value;

    this.getAddData(additionalExpensesItem.value, this.addExpenses);
    this.getAddData(additionalIncomeItem, this.addIncome);
    this.getPeriod();
    this.getExpInc();
    this.getExpensesMonth();
    this.getTargetMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.inputBlock();
    this.calcPeriod();
    this.eventListeners();

    this.showResults();

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

// Общая функция для значений Доходов и Расходов
AppData.prototype.getExpInc = function() {
    const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if ( itemTitle !== '' && itemAmount !== '' ) {
            this[startStr][itemTitle] = itemAmount;
        }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for ( let key in this.income ) {
        this.incomeMonth += +this.income[key];
    }
};

// Общая Функция для наименований расходов и доходов
AppData.prototype.getAddData = (  elem1, elem2 ) => {

    if ( typeof elem1 === 'string' ) {
        let arr = elem1.split(',');
        arr.forEach(function (item) {
            item = item.trim();
            if (item !== " ") {
                elem2.push(item);
            }
        });
    } else {
        elem1.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                elem2.push(itemValue);
            }
        });
    }
};

AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
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

AppData.prototype.getInfoDeposit = function() {
    if( this.deposit ) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;

};

AppData.prototype.inputBlock = function() {
    inputData.forEach(function (item) {
        item.disabled = true;
    });
};

// Функция для очистки и сброса кнопки и очистки форм Слева и Справа
AppData.prototype.resetForm = function() {
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

AppData.prototype.getPeriod = function() {
    periodAmount.innerHTML = periodSelect.value;
};

// Метод добавления блоков доп. расходов и доходов
AppData.prototype.addBlock = (elements, button, selector) => {
    let cloneElem = elements[0].cloneNode(true);
    elements[0].parentNode.insertBefore(cloneElem, button);

    // Снова получаем обновленный массив елементов-блоков
    elements = document.querySelectorAll(selector);

    // Обнуление техт при добавлении нового блока
    const newElem = elements[elements.length-1];
    newElem.querySelectorAll('input')[0].value = '';
    newElem.querySelectorAll('input')[1].value = '';

    if ( elements.length === 3 ) {
        button.style.display = 'none';
    }
};

AppData.prototype.eventListeners = function() {
    const _this = this;
// привязка контекст вызова функции start к appData через bind
    start.addEventListener('click', _this.start.bind(_this));

    // Выхов события на добавление + передача аргументов Блока доходов
    incomePlus.addEventListener('click', function () {
        _this.addBlock(incomeItems,incomePlus, '.income-items');

    });

    // Вызов события + передача аргументов на добавления блока расходов
    expensesPlus.addEventListener('click', function () {
        _this.addBlock(expensesItems, expensesPlus, '.expenses-items');
    });

    periodSelect.addEventListener('change', _this.getPeriod);

    depositCheck.addEventListener('change', function () {
        if ( depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            _this.deposit = 'true';
            depositBank.addEventListener('change', function () {
                let selectIndex = this.options[this.selectedIndex].value;
                if ( selectIndex === 'other' ) {
                    depositPercent.disabled = false;
                    depositPercent.style.display = 'inline-block';
                    depositPercent.value = '';
                } else {
                    depositPercent.style.display = 'none';
                    depositPercent.value = selectIndex;
                }
            })
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            _this.deposit = 'false';
        }

    });

// Сброс и очистка форм при клике
    cancel.addEventListener('click', _this.resetForm);

};

const appData = new AppData();

appData.eventListeners();