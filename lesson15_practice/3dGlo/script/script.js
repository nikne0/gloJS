/*
 *** Created by NikNet 19.11.2019
*/
"use strict";

/*
*1) Реализовать калькулятор на сайте по видео
2) Проверить, чтобы все работало и не было ошибок в консоли
3) Добавить папку с уроком на GitHub
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

            // Создаем один обработчик на события меню и его элементы
            let closeBtn = document.querySelector('.close-btn');
            let elemMenu = [btnMenu, menu];

            elemMenu.forEach((item) => {
                item.addEventListener('click', (event) => {
                    let target = event.target;

                    if (target.closest('.menu')) handlerMenu();
                    if (target.tagName === 'A') handlerMenu();

                });
            });

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

        /**************SLIDER**********************/
        const slider = () => {
            const slider = document.querySelector('.portfolio-content'),
                slide = document.querySelectorAll('.portfolio-item'),
                btn = document.querySelectorAll('.portfolio-btn'),
                portfolioDots = document.querySelector('.portfolio-dots');

            let currentSlide = 0,
                interval,
                li;

            // Содаем Dots
            slide.forEach((item) => {
                li = document.createElement('li');
                li.className = 'dot';
                portfolioDots.appendChild(li);
            });

            // создаем переменную dots после их создания
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

                if (currentSlide >= slide.length) currentSlide = 0;

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            };

            const startSlide = (time = 1500) => {
                interval = setInterval(autoPlaySlide, time);
            };

            const stopSlide = () => {
                clearInterval(interval);
            };

            slider.addEventListener('click', (event) => {
                event.preventDefault();
                let target = event.target;

                if (!target.matches('.portfolio-btn, .dot')) return;

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');

                if (target.matches('#arrow-right')) {
                    currentSlide++;
                } else if (target.matches('#arrow-left')) {
                    currentSlide--;
                } else if (target.matches('.dot')) {
                    dot.forEach((elem, index) => {
                        if (elem === target)
                            currentSlide = index;
                    });
                }

                if (currentSlide >= slide.length) currentSlide = 0;
                if (currentSlide < 0) currentSlide = slide.length - 1;

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            });

            slider.addEventListener('mouseover', (event) => {
                let target = event.target;
                if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                    stopSlide();
                }
            });

            slider.addEventListener('mouseout', (event) => {
                let target = event.target;
                if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                    startSlide();
                }
            });

            startSlide(1500);

        };
        slider();

        /***************TEAM PHOTO*************************/
        const photos = () => {
            let commandPhoto = document.querySelectorAll('.command__photo');

            commandPhoto.forEach((item) => {
                const srcImg = item.getAttribute('src');

                item.addEventListener('mouseenter', (event) => {
                    let target = event.target;
                    target.src = target.dataset.img;
                });

                item.addEventListener('mouseleave', (event) => {
                    let target = event.target;
                    target.src = srcImg;
                });

            });
        };
        photos();

        /***********************CALCULATE VALIDATION + PRACTICE***********/
        const calc = (price = 100) => {
            const calcBlock = document.querySelector('.calc-block'),
                calcType = document.querySelector('.calc-type'),
                calcSquare = document.querySelector('.calc-square'),
                calcCount = document.querySelector('.calc-count'),
                calcDay = document.querySelector('.calc-day'),
                calcItem = document.querySelectorAll('.calc-item'),
                totalValue = document.getElementById('total');

            // Валидатор + доп.условие на исключение из проверки первого текст.поля
            calcBlock.addEventListener('input', () => {
                calcItem.forEach((item) => {
                    if ( !item[0] ) {
                        item.value = item.value.replace(/[^0-9]/g, "");
                    }
                });
            });

            // Калькулятор
            const countSum = () => {
                let total = 0;
                let countValue = 1;
                let dayValue = 1;
                const typeValue = calcType.options[calcType.selectedIndex].value,
                    squareValue = +calcSquare.value;

                if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10;

                if (calcDay.value && calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value && calcDay.value < 10) {
                    dayValue *= 1.5;
                }

                if (typeValue && squareValue) {
                    total = price * typeValue * squareValue * countValue * dayValue;
                }

                totalValue.textContent = total;

            };

            calcBlock.addEventListener('click', (event) => {
                const target = event.target;

                // Variant 1
                /* if (target.matches('.calc-type') || target.matches('.calc-square') ||
                     target.matches('.calc-count') || target.matches('.calc-day')) {
                     console.log("1");

                 }*/

                // Variant 2
                /*if ( target === calcType || target === calcSquare || target === calcCount || target === calcDay ) {
                    console.log("1");
                }*/

                // Variant 3
                if (target.matches('select') || target.matches('input')) {
                      countSum();
                }

            });
        };
        calc(100);

    }
);


    