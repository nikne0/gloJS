/*
 *** Created by NikNet 18.11.2019
*/
"use strict";

/*
* 1) В нашем проекте есть Блок с картинками Наша Команда
    У каждой фото есть data атрибут с другой картинкой data-image.
    Необходимо реализовать, чтобы по наведению мышкой менялись фотографии,
    * а если увести мышку с элемента то возвращается прежняя фото.
2)  В калькуляторе разрешить ввод только цифр:
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
            console.log('111');
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

        /***************CALCULATE*****************************/
        const validationCalc = () => {
            const calcItem = document.querySelectorAll('.calc-item'),
                calcBlock = document.querySelector('.calc-block');

            calcBlock.addEventListener('input', () => {
                calcItem.forEach((item) => {
                   item.value = item.value.replace(/[^0-9]/g, "");
                });
            });
        };
        validationCalc();

    }
);


    