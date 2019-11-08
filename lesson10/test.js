/*
 *** Created by NikNet 06.11.2019
*/
// методы animal
/*let animal = {
    walk() {
        if (!this.isSleeping) {
            alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
};

let rabbit = {
    name: "White Rabbit",
    __proto__: animal
};

// модифицирует rabbit.isSleeping
rabbit.sleep();
animal.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined (нет такого свойства в прототипе)
console.log(animal.walk()); // undefined (нет такого свойства в прототипе)*/

let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
document.body.before(div);