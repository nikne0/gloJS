/*
 *** Created by NikNet 14.11.2019
*/
"use strict";

/*
* Написать скрипт Меню и модального окна по видео
2) Написать анимацию появления модального окна
·        Использовать JS анимацию. Использовать нативный JavaScript. Использование сторонних библиотек запрещено!
Необходимо манипулировать элементами по средством JS. СSS анимация не подходит.
Сделать можно по аналогии с летающим червем из урока. Есть пример с паровозом здесь.
·        Если пользователь заходит на сайт с устройства, у которого ширина экрана меньше 768px (мобильного устройства) - анимация отключается
3) Проверить, чтобы все работало и не было ошибок в консоли
4) Добавить папку с уроком на GitHub
* * */

window.addEventListener('DOMContentLoaded', function () {

    "use strict";

    /****************TIMER*************************/
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
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


    /*************MENU**********************/
    const  toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul > li');

        // Закрытие меню с помощь if-else
        /*    const handlerMenu = () => {
                if ( !menu.style.transform || menu.style.transform === `translate(-100%)`) {
                    menu.style.transform = `translate(0)`;
                } else {
                    menu.style.transform = `translate(-100%)`;
                }
            };*/

        // Закрытие меню с помощь CSS
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));


    };
    toggleMenu();


    /************POPUP***********************/
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose= document.querySelector('.popup-close');

        // Animations for PopUp
        let clientWidth = document.documentElement.clientWidth;
        let start= 1;
        let animation;

        const popupGo = () => {
            let clientWidth = document.documentElement.clientWidth;
            animation = requestAnimationFrame(popupGo);
                start += 5;
                popupContent.style.left = start + 'px';
                if ( start > ( clientWidth / 2 ) ) {
                    start = 0;
                    cancelAnimationFrame(animation);
                }
        };

        popupBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    let clientWidth = document.documentElement.clientWidth;
                    if ( clientWidth > 768 ) {
                        popup.style.display = 'block';
                        popupGo();
                    } else {
                        popup.style.display = 'block';
                    }
                });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

    };
    togglePopUp();

});
    