"use strict";

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.

const productList = document.querySelector(".review__product-list");
const productNames = Object.keys(localStorage);
productNames.forEach((title) => {
  const productName = document.createElement("li");
  productName.innerHTML = title;
  productName.setAttribute("showing", "OFF");
  productList.appendChild(productName);
  productName.addEventListener("click", function (event) {
    let chosenProduct = event.target.innerHTML;
    if (productName.getAttribute("showing") === "OFF") {
      productName.after(showReviewsList(chosenProduct));
      productName.removeAttribute("showing", "OFF");
      productName.setAttribute("showing", "ON");
    } else {
      productName.after(removeReviewsList(chosenProduct));
      productName.removeAttribute("showing", "ON");
      productName.setAttribute("showing", "OFF");
    }
  });
});

let productReviews = "";

function showReviewsList(name) {
  const reviewsList = JSON.parse(localStorage.getItem(name));
  productReviews = document.createElement("ul");
  for (const item in reviewsList) {
    const review = document.createElement("li");
    review.classList.add("review-text");
    review.innerHTML = reviewsList[item];
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Удалить";
    removeButton.addEventListener("click", removeReview);
    review.appendChild(removeButton);
    productReviews.appendChild(review);
  }
  return productReviews;
}

function removeReviewsList(name) {
  const reviewsList = JSON.parse(localStorage.getItem(name));
  reviewsList.forEach(() => {
    const review = document.querySelector(".review-text");
    review.remove();
  });
  return productReviews;
}

// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом,
//  данный отзыв удаляется из LocalStorage).

function removeReview(event) {
  const reviewToRemove = event.target.parentElement;
  const reviewToRemoveFromLocal =
    reviewToRemove.parentElement.previousElementSibling.innerHTML;
  const reviewToRemoveTextContent = reviewToRemove.textContent;
  reviewToRemove.remove();

  const reviewInLocal = JSON.parse(
    localStorage.getItem(reviewToRemoveFromLocal)
  );
  for (const item in reviewInLocal) {
    if (reviewInLocal[item] + "Удалить" === reviewToRemoveTextContent) {
      reviewInLocal.splice(item, 1);
    }
  }
  localStorage.setItem(reviewToRemoveFromLocal, JSON.stringify(reviewInLocal));
}
