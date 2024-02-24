"use strict";

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

const productNameClass = document.querySelector(".review__form_product-name");
const userReviewClass = document.querySelector(".review__form_user-review");
const reviewButton = document.querySelector(".review__form-add");

reviewButton.addEventListener("click", () => {
  const productName = productNameClass.value;
  const userReview = userReviewClass.value;
  if (localStorage.getItem(productName)) {
    let reviewsAll = JSON.parse(localStorage.getItem(productName));
    reviewsAll.push(userReview);
    localStorage.setItem(productName, JSON.stringify(reviewsAll));
  } else {
    localStorage.setItem(productName, JSON.stringify([userReview]));
  }
  productNameClass.value = "";
  userReviewClass.value = "";
});

