/*
 *** Created by NikNet 13.11.2019
*/
"use strict";
/*
* 1) Выведите на страницу текущую дату и время в формате '09:59:59 30.05.2018'
2) Напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)
3) Добавить папку с уроком на свой GitHub
* */

window.addEventListener('DOMContentLoaded', function () {

    function pageTimer() {

        let timeCurrent = document.querySelector('#time-current'),
            dateNow = new Date();

        function getCurrentTime(date) {
            let current = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2) + " " + ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
            return current;
        }

        timeCurrent.textContent = getCurrentTime(dateNow);

    }

    pageTimer();

});