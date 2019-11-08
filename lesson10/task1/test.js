/*
 *** Created by NikNet 06.11.2019
*/
/*
* Первое задание (1 балл)
1) Сделать класс DomElement, который
   содержит свойства
  - selector,
  - height,
  - width,
  - bg,
  - fontSize

содержит метод, который создает элемент на странице
- если строка selector начинается с точки, создаем div с классом
- если строка selector  начинается с решетки # то создаем параграф с id

* пример:
если передана строка '.block', то функция конструктор создает элемент с class="block"
если передана строка '#best', то функция конструктор создает элемент с id =best"

с помощью cssText задавать стили:
  - высотой - height,
  - шириной - width,
  - background - bg
  - размер текста fontSize

внутрь записывать любой текст

2) Создать новый объект на основе класса DomElement
3) Вызвать его метод чтобы получить элемент на странице
* */

function DomElement(selector, bg, height, width, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

};

DomElement.prototype.createElements = function () {

        let div;
        let p;
        if (this.selector.charAt(0) === '.') {
            div = document.createElement('div');
            div.className = this.selector.slice(1);
            div.style.cssText = `height: ${this.height};
    background: ${this.bg};
    width: ${this.width};
    font-size: ${this.fontSize};
  `;
            div.innerHTML = "<strong>Div!</strong> Molto Bene!!!!!";
            document.body.prepend(div);
        } else if (this.selector.charAt(0) === '#') {
            p = document.createElement('p');
            p.id = this.selector.slice(1);
            p.style.cssText = `height: ${this.height};
    background: ${this.bg};
    width: ${this.width};
    font-size: ${this.fontSize};
  `;
            p.innerHTML = "<strong>Параграф!</strong> Molto Bene!!!!!";
            document.body.prepend(p);
        }
    };


let domElementDiv = new DomElement('.block', 'green', '50px', '400px', '18px');
let domElementId = new DomElement('#best', 'red', '50px', '400px', '18px');

domElementDiv.createElements();
domElementId.createElements();





