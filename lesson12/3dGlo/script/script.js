/*
 *** Created by NikNet 11.11.2019
*/
"use strict";

/*
* 1) Написать таймер обратного отсчета
+ 2) Переписать таймер с помощью setInterval
+3) Проверить, чтобы все работало и не было ошибок в консоли
+4) У таймера есть проблема (нужно исправить):
  - Если дата уже прошла, а мы заходим на страницу, то получим
+5) Изменить скрипт так, чтобы в таком случае выводилось: 00:00:00
  - Необходимо подставлять 0 перед значениями, которые состоят из одной цифры (из 4:6:50 сделает 04:06:50)
* */

window.addEventListener('DOMContentLoaded', function () {
    // Timer
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    "use strict";
    function countTimer(deadline) {

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor((timeRemaining / 60 / 60) % 24);

            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            let timer = getTimeRemaining();

            timerHours.textContent = timer.hours < 10 ? "0" + timer.hours : timer.hours;
            timerMinutes.textContent = timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
            timerSeconds.textContent = timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;

            let idInterval = setInterval(updateClock, 1000);
            if ( timer.timeRemaining > 0 ) {
                setTimeout(updateClock, 1000);
            } else {
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }

        }
        updateClock();

    }

    countTimer('01 december 2019');
    // countTimer('01 november 2019');

});