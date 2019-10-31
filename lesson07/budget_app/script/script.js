/*
* Created by NikNet 30.10.2019
*/
"use strict";
/*
* Второе задание
    Скачать архив, прикрепленный к уроку (budget_app.zip)
    Задание по проекту
        +Получить кнопку "Рассчитать" через id
       + Получить кнопки “+” (плюс) через Tag, каждую в своей переменной.
      + получить чекбокс по id через querySelector
      + Получить поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
       + Получить все блоки в правой части программы через классы (которые имеют класс название-value, начиная с class="budget_day-value" и заканчивая class="target_month-value">)
       + Получить оставшиеся поля через querySelector каждый в отдельную переменную (Инпуты с левой стороны не забудьте про range)
* */

let idElem = document.getElementById('start'),
    buttons = document.getElementsByTagName('button'),
    incomePlus = buttons[0],
    expensesPlus = buttons[1],
    checkbox = document.querySelector('#deposit-check'),
    inputItem = document.querySelectorAll('.additional_income-item'),
    inputBudgetMonth = document.getElementsByClassName('result-total budget_month-value'),
    inputBudgetDay = document.getElementsByClassName('result-total budget_day-value'),
    inputExpMonth = document.getElementsByClassName('result-total expenses_month-value'),
    inputIncome = document.getElementsByClassName('result-total additional_income-value'),
    inputAddExp = document.getElementsByClassName('result-total additional_expenses-value'),
    inputPeriodIncome = document.getElementsByClassName('result-total income_period-value'),
    inputTarget = document.getElementsByClassName('result-total target_month-value');

let targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('input[type="range"]'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');









