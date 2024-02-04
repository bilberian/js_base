"use strict";

// 1""Получение данных о пользователе""

// Реализуйте функцию getUserData, которая принимает идентификатор
// пользователя (ID) в качестве аргумента и использует fetch для получения
// данных о пользователе с заданным ID с удаленного сервера. Функция должна
// возвращать промис, который разрешается с данными о пользователе в виде объекта.
// Если пользователь с указанным ID не найден, промис должен быть отклонен с
// соответствующим сообщением об ошибке.

// Подсказка, с последовательностью действий:
// getUserData использует fetch для получения данных о пользователе с
// удаленного сервера. Если запрос успешен (с кодом 200), функция извлекает
// данные из ответа с помощью response.json() и возвращает объект с данными о
// пользователе. Если запрос неуспешен, функция отклоняет промис с сообщением об ошибке.
async function getUserData(ID) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => console.log(data.filter((user) => user.id === ID)))
    .catch((error) => console.log(error.message));
}
getUserData(3);

//2 ""Отправка данных на сервер""

// Реализуйте функцию saveUserData, которая принимает объект с данными о
// пользователе в качестве аргумента и использует fetch для отправки этих данных
// на удаленный сервер для сохранения. Функция должна возвращать промис, который
// разрешается, если данные успешно отправлены, или отклоняется в случае ошибки.

const user = {
  name: "John Smith",
  age: 30,
  email: "john@example.com",
};

async function saveUserData(user) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://httpbin.org/post");
  xhr.send(JSON.stringify(user, null, 4));
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      console.log(`user: ${xhr.response}`);
    }
  };
  xhr.onerror = function () {
    console.log("Request error");
  };
}

saveUserData(user)
  .then(() => {
    console.log("User data saved successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

// saveUserData использует fetch для отправки данных о пользователе на удаленный
// сервер для сохранения. Она отправляет POST-запрос на URL-адрес /users с
// указанием типа содержимого application/json и сериализует объект с данными о
// пользователе в JSON-строку с помощью JSON.stringify(). Если запрос успешен
// (с кодом 200), функция разрешает промис. Если запрос неуспешен, функция
// отклоняет промис с сообщени

//3 ""Изменение стиля элемента через заданное время""

// Напишите функцию changeStyleDelayed, которая принимает идентификатор элемента
// и время задержки (в миллисекундах) в качестве аргументов. Функция должна
// изменить стиль элемента через указанное время.
function changeStyleDelayed(el, time) {
  setTimeout(function () {
    document.getElementById(el).style.color = "blue";
  }, time);
}
// Пример использования функции
changeStyleDelayed("myElement", 2000); // Через 2 секунды изменяет стиль элемента с id 'myElement'"
