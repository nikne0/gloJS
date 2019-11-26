document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        fetch('./cars.json', {
            method: "GET",  // тип запросо
            mode: "same-origin",   // запрет на получение апи со сторонних линков (либо разрешение "cors")
            cache: "default",   // хеширование как правило дефолт
            credentials: "same-origin", // запрет на передачу учетных данных на стронние сервисы
            // 'include' - прохождение идентификации с помощью куков
            headers: {  // казываются все передаваемые заголовки
                'Content-type': 'application/json'
            },
            redirect: "follow",   // автоиатический редирект
            referrer: "client",  // клиент, как правило это наш браузер
            body: JSON.stringify(data)  // отправка данных на сервер
        })
            .then((response) => {
                if (response.status !== 200) throw new Error('Error! Status network not 200');
                return (response.json());
            })
            .then((data) => {
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
            })
            .catch((error) => console.error(error));
    });

});