/*
 *** Created by NikNet 19.11.2019
*/
"use strict";

const newToDo = () => {
    const mxAuto = document.querySelectorAll('.mx-auto')[1],
        formControl = document.querySelector('.form-control'),
        button = document.querySelector('.btn');

    let liBorder = document.querySelectorAll('.border'),
        li;


    button.addEventListener('click', () => {

        if (formControl.value !== "") {
            li = document.createElement('li');
            li.className = 'border';
            li.textContent = formControl.value;
            mxAuto.appendChild(li);
            formControl.value = "";
        }
    });


    mxAuto.addEventListener('click', () => {
        liBorder = document.querySelectorAll('.border');

        liBorder.forEach((item) => {
            item.addEventListener('click', (event) => {
                let target = event.target;
                if (target.style.textDecoration === 'none') {
                    target.style.textDecoration = 'line-through';
                } else {
                    target.style.textDecoration = 'none';
                }
            });
        });
    });
};

newToDo();
    