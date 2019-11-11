/*
* Created by NikNet 11.11.2019
*/
"use strict";

// Получаем переменные с HTML
const start = document.getElementById('start'),
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
    targetAmount = document.querySelector('.target-amount'),
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];


let periodSelect = document.querySelector('.period-select'),
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
    depositBank = document.querySelector('.deposit-bank'),
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0];

class AppData {

    constructor() {
        this.income = {};
        this.expenses = {};
        this.addExpenses = [];
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expensesMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;

    }

check() {
    if ( salaryAmount.value !== '' ) {
        start.removeEventListener('disabled');
    }
};

start() {

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
    this.getIncome();
    this.getExpenses();
    this.getPeriod();
    this.getIncomeMonth();
    this.getExpensesMonth();
    this.getTargetMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.inputBlock();
    this.calcPeriod();
    this.eventListeners();

    this.showResults();

};

showResults() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

};

getExpenses() {
    const _this = this;
    expensesItems = document.querySelectorAll('.expenses-items'),
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if ( itemExpenses !== '' && cashExpenses !== '' ) {
                _this.expenses[itemExpenses] = cashExpenses;

            }

        });

};

getIncome() {
    const _this = this;
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;

        }
    });

};


getIncomeMonth() {
    for ( let key in this.income ) {
        this.incomeMonth += +this.income[key];
    }
};

getExpensesMonth() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

// Общая Функция для наименований расходов и доходов
getAddData(  elem1, elem2 ) {

    if ( typeof elem1 === 'string' ) {
        let arr = elem1.split(',');
        arr.forEach(function(item) {
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

getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12;
    this.budgetDay = Math.floor(this.budgetMonth / 30);  // округление в мен. сторону
};

getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
};

getStatusIncome() {
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

getInfoDeposit() {
    if( this.deposit ) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
};

calcPeriod() {
    return this.budgetMonth * periodSelect.value;

};

inputBlock() {
    inputData.forEach(function (item) {
        item.disabled = true;
    });
};

// Функция для удаления блоков, очистки и сброса кнопки, очистки форм Слева и Справа
resetForm() {

    // Удаляем добавленные блоки Расходов
    let expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function(item, index){
        if(index !== 0){
            item.remove();
            expensesPlus.style.display = 'block';
        }
    });

    // Удаляем добавленные блоки Доходов
    let incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(function(item, index){
        if(index !== 0){
            item.remove();
            incomePlus.style.display = 'block';
        }
    });

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

getPeriod() {
    periodAmount.innerHTML = periodSelect.value;
};

// Метод добавления блоков доп. расходов и доходов
addBlock(elements, button, selector)  {
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

eventListeners() {
    const _this = this;
// привязка контекст вызова функции start к appData через bind
    start.addEventListener('click', _this.start.bind(_this));

    // Вызов события на добавление + передача аргументов Блока доходов
    incomePlus.addEventListener('click', () => {
        _this.addBlock(incomeItems,incomePlus, '.income-items');
    });

    // Вызов события + передача аргументов на добавления блока расходов
    expensesPlus.addEventListener('click', () => {
        _this.addBlock(expensesItems, expensesPlus, '.expenses-items');
    });

    /*periodSelect.addEventListener('change', _this.getPeriod);*/

    periodSelect.addEventListener('mousemove', function () {
        _this.getPeriod();
        periodAmount.textContent = periodSelect.value;
        periodAmount.innerText = periodSelect.value;
        if (appData.budgetMonth) {
            incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
        }
    });

    depositCheck.addEventListener('change', function() {
        if ( depositCheck.checked ) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            _this.deposit = 'true';
            depositBank.addEventListener('change', function() {
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

}

const appData = new AppData();

appData.eventListeners();
