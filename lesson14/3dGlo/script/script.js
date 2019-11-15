/*
 *** Created by NikNet 14.11.2019
*/
"use strict";

/*
* +1) Реализовать табы по видео.
2) В функции toggleMenu() много обработчиков событий. Используя делегирование событий, сделать обработчики для:
+-  Крестика закрытия меню и пунктов меню.
+-  На кнопку меню.
+3) У вас должно быть максимум 2 обработчика события в  функции toggleMenu()
4) Проверить, чтобы все работало и не было ошибок в консоли
* */

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
    const toggleMenu = () => {
        const  btnMenu = document.querySelector('.menu'),
               menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menu.addEventListener('click', ( event ) => {
            if ( event.target.tagName === 'A' ) handlerMenu();
        });

        btnMenu.addEventListener('click', handlerMenu);

    };
    toggleMenu();


    /************POPUP***********************/
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');

        // Animations for PopUp
        // let clientWidth = document.documentElement.clientWidth;
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

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if ( target.classList.contains('popup-close') ) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if ( !target ) {
                    popup.style.display = 'none';
                }
            }
        });

    };
    togglePopUp();

    /************TABS***************************/
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for ( let i = 0; i < tabContent.length; i++ ) {
                if ( index === i ) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }

            }

        };

        // Old Style
        /*tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            while ( target !== tabHeader ) {
                if (target.classList.contains('service-header-tab')) {
                    tab.forEach((item, i) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                    return;
                }
                target = target.parentNode;
            }
        })*/

        // New Style
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
                if ( target ) {
                    tab.forEach((item, i) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                }
        });
    };
    tabs();




});
    