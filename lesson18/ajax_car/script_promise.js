document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const selCars = (response) => {
        response.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
            }
        });
    };

    const getData = () => {

        return new Promise((resolve, reject) => {

            select.addEventListener('change', () => {
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-type', 'application/json');
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) return;
                    if (request.status === 200) {
                        const response = JSON.parse(request.responseText);
                        resolve(response);
                    } else {
                        // reject(output.innerHTML = 'Произошла ошибка');
                        reject(request.status);
                    }
                });
                request.send();
            });
        });
    };

    getData(select)
        .then(selCars)
        .catch(error => console.error(error));
});


