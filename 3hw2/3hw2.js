"use strict";

// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

const picAlbum = document.querySelector(".pics__album");
const picsArr = Array.from(picAlbum.querySelectorAll(".pic"));
const btnBack = document.querySelector(".pics__btn-back");
const btnFwd = document.querySelector(".pics__btn-fwd");
const btnBulls = document.querySelector(".pics__bulls");
const btnBullArr = Array.from(btnBulls.querySelectorAll(".pics__bull"));

btnBack.addEventListener("click", () => {
  const picActive = picAlbum.querySelector(".active");
  const picActiveIndex = picsArr.indexOf(picActive);
  const previousInd = getPrevious(picActiveIndex);
  picActive.classList.remove("active");
  picsArr[previousInd].classList.add("active");
  showBtnBull(previousInd);
});

btnFwd.addEventListener("click", () => {
  const picActive = picAlbum.querySelector(".active");
  const picActiveIndex = picsArr.indexOf(picActive);
  const nextInd = getNext(picActiveIndex);
  picActive.classList.remove("active");
  picsArr[nextInd].classList.add("active");
  showBtnBull(nextInd);
});

btnBulls.addEventListener("click", ({ target }) => {
  if (!target.closest(".pics__bull")) {
    return;
  }
  const chosenBull = target.closest(".pics__bull");
  const chosenBullIndex = btnBullArr.indexOf(chosenBull);
  picAlbum.querySelector(".active")?.classList.remove("active");
  picsArr[chosenBullIndex].classList.add("active");
  showBtnBull(chosenBullIndex);
});

function getPrevious(number) {
  if (number === 0) {
    return picsArr.length - 1;
  }
  return number - 1;
}

function getNext(number) {
  if (number === picsArr.length - 1) {
    return 0;
  }
  return number + 1;
}

function showBtnBull(index) {
  btnBullArr.forEach((bull) => bull.classList.remove("shown"));
  btnBullArr[index].classList.add("shown");
}
