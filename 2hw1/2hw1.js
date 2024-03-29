"use strict";

// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция",
//который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет
// свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

const musicCollection = {
  albums: [
    {
      title: "The Rocker",
      artist: "Rocky Rock",
      year: "1988",
    },
    {
      title: "Proper Pop",
      artist: "Mr. Popper",
      year: "2011",
    },
    {
      title: "Dancing Bit",
      artist: "Bitterer",
      year: "2005",
    },
  ],
  [Symbol.iterator]() {
    const entries = this.albums;
    let index = 0;
    return {
      next: function () {
        if (index < entries.length) {
          const result = {
            value: `${entries[index].title} - ${entries[index].artist} (${
              entries[index].year})`,
            done: false,
          };
          index++;
          return result;
        } else {
          return { done: true };
        }
      },
    };
  },
};

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен
//  перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и
// вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

for (const obj of musicCollection) {
  console.log(obj);
}

// Задание 2
// Вы управляете рестораном, в котором работают разные повара,
// специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы
// на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для
// хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:
// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

let cookers = new Map();
cookers.set("Пицца", "Виктор");
cookers.set("Суши", "Ольга");
cookers.set("Десерты", "Дмитрий");

// Блюда и их повара:
// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

let dishes = new Map();
dishes.set('Пицца "Маргарита"', cookers.get("Пицца"));
dishes.set('Пицца "Пепперони"', cookers.get("Пицца"));
dishes.set('Суши "Филадельфия"', cookers.get("Суши"));
dishes.set('Суши "Калифорния"', cookers.get("Суши"));
dishes.set('Тирамису', cookers.get("Десерты"));
dishes.set('Чизкейк', cookers.get("Десерты"));

// Заказы:
console.log('Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.'); 
console.log(`Повара: ${dishes.get('Пицца "Маргарита"')} и ${
  dishes.get('Тирамису')}`);
console.log('Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".'); 
console.log(`Повара: ${dishes.get('Суши "Калифорния"')} и ${
  dishes.get('Пицца "Маргарита"')}`);
console.log('Клиент Ирина заказала: Чизкейк.'); 
console.log(`Повара: ${dishes.get('Чизкейк')}`);

