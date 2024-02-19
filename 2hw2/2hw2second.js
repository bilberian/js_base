"use strict";

// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут
// оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные
// сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки
// и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако
// если длина введенного отзыва менее 50 или более 500 символов, функция должна
// генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими
// отзывами, а не заменять их.

const reviewsButton = document.querySelector(".reviews-btn");
const allReviews = document.querySelector(".reviews-all__container");
const reviewInput = document.querySelector(".reviews-text");
let count = 1;

reviewsButton.addEventListener("click", () => {
  if (reviewInput.value.length >= 50 && reviewInput.value.length <= 500) {
    allReviews.insertAdjacentHTML(
      "beforeend",
      `<div class="reviews-all__review">
        Отзыв №${count}: <br>
        ${reviewInput.value}
      </div>`
    );
    reviewInput.value = "";
    count++;
  } else {
    alert("Ваш отзыв менее 50 или более 500 символов!");
  }
});

