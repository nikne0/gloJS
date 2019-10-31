/*
* Created by NikNet 30.10.2019
*/
"use strict";

/*
*     Используя только файл скрипта (html руками не трогать) выполнить такие действия:
   + Восстановить порядок книг.
  +  Заменить картинку заднего фона на другую из папки image
   + Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
 +   Удалить рекламу со страницы
   + Восстановить порядок глав во второй и пятой книге
    в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
* */

//Восстановить порядок книг.
let asideBooks = document.querySelector('.books'); // получаем массив с заголовками книг
let divBook = document.querySelectorAll('.book'); // получаем массив с заголовками книг

console.log(divBook);
asideBooks.before(divBook[1], divBook[0]);
asideBooks.append(divBook[2]);
asideBooks.before(divBook[4], divBook[3]);

//Удалить рекламу со страницы
let divAdv = document.querySelector('.adv'); // Находи блок с рекламой
divAdv.remove();                                      // удаление рекламы

// Заменить картинку заднего фона на другую из папки image
document.body.style.background = 'url(image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
let booksTitle = document.querySelectorAll('.book a[target="_blank"]');
booksTitle[2].textContent = "Книга 3. this и Прототипы Объектов";
console.log(booksTitle);

// Восстановить порядок глав во второй и пятой книге
let elemUL = document.querySelectorAll('ul'); //Получаем  <ul>

// Восстановить порядок глав во второй книге
let elemLi2 = elemUL[1].querySelectorAll('li'); //Получаем  <li> Главы 2
elemUL[1].insertBefore(elemLi2[2], elemLi2[9]);
elemUL[1].insertBefore(elemLi2[8], elemLi2[6]);
elemUL[1].insertBefore(elemLi2[6], elemLi2[4]);
elemUL[1].insertBefore(elemLi2[8], elemLi2[4]);

// Восстановить порядок глав в пятой книге
let elemLi5 = elemUL[4].querySelectorAll('li'); //Получаем  <li> Главы 5
console.log(elemLi5);
elemUL[4].insertBefore(elemLi5[9], elemLi5[2]);
elemUL[4].insertBefore(elemLi5[2], elemLi5[6]);
elemUL[4].insertBefore(elemLi5[5], elemLi5[8]);

//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let newLi = document.createElement('li');
newLi.textContent = "Глава 8: За пределами ES6"; //добавить главу “Глава 8: За пределами ES6”
let elemLi6 = elemUL[5].querySelectorAll('li'); //Получаем  <li> Главы 5
elemLi6[8].appendChild(newLi);  //поставить её в правильное место
console.log(elemLi6[8]);









