/*
 *** Created by NikNet 14.11.2019
*/
"use strict";

/*
+1) Реализовать слайдер на сайте по видеоуроку
2) Удалить все элементы со страницы с классом dot (из верстки Index.html)
3) Написать скрипт, который будет на страницу добавлять точки с классом dot равному количеству слайдов
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

            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
            let timer = getTimeRemaining();

            timerHours.textContent = timer.hours < 10 ? "0" + timer.hours : timer.hours;
            timerMinutes.textContent = timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
            timerSeconds.textContent = timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;

            let idInterval = setInterval(updateClock, 1000);
            if (timer.timeRemaining > 0) {
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
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') handlerMenu();
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
        let start = 1;
        let animation;

        const popupGo = () => {
            let clientWidth = document.documentElement.clientWidth;
            animation = requestAnimationFrame(popupGo);
            start += 5;
            popupContent.style.left = start + 'px';
            if (start > (clientWidth / 2)) {
                start = 0;
                cancelAnimationFrame(animation);
            }
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                let clientWidth = document.documentElement.clientWidth;
                if (clientWidth > 768) {
                    popup.style.display = 'block';
                    popupGo();
                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
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
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
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
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();


    /*************SLIDER************************/
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            // btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval,
            li;

        // Создаем Dots
        slide.forEach((item) => {
           li = document.createElement('li');
           li.className = 'dot';
           portfolioDots.appendChild(li);
        });

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;

            if ( currentSlide >= slide.length ) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });


        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1000);

    };
    slider();

});
    