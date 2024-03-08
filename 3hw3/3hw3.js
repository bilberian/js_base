"use strict";

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочек then.

const accessKey = "";
const counterLikes = document.querySelector(".pics__likes-total>span");
const pic = document.querySelector(".pic__downloaded>img");
const photographer = document.querySelector(".pic__photographer>span");
const likeButton = document.querySelector(".pic__like-btn");
const historyContainer = document.querySelector(".history__container");
const historyKey = "History";
const historyPics = getHistoryFromLS(historyKey);
const totalLikesKey = "TotalLikes";
let totalLikes = getTotalLikesFromLS();
const likedPicsKey = "LikedPics";
let likedPicsArray = getHistoryFromLS(likedPicsKey);
let currentPicURL = "";
counterLikes.textContent = totalLikes;

function saveToLS() {
  localStorage.setItem("TotalLikes", totalLikes.toString());
  localStorage.setItem("History", JSON.stringify(historyPics));
  localStorage.setItem("LikedPics", JSON.stringify(likedPicsArray));
}

function getHistoryFromLS(key) {
  if (!localStorage.getItem(key)) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

function getTotalLikesFromLS() {
  if (!localStorage.getItem(totalLikesKey)) {
    return 0;
  } else {
    return JSON.parse(localStorage.getItem(totalLikesKey));
  }
}

function showHistory(callback) {
  for (const i in historyPics) {
    updateHistory(historyPics[i]);
    if (likedPicsArray[i] === "true") {
      historyContainer
        .getElementsByClassName("history__pic")
        [i].querySelector("img")
        .classList.add("pic__liked");
    }
  }
  callback();
}

showHistory(() => getRandomPic());

async function getRandomPic() {
  likeButton.querySelector("span")?.classList.remove("pic__liked-heart");
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    currentPicURL = data.urls.regular;
    pic.src = currentPicURL;
    photographer.textContent = data.user.name;
    historyPics.push(currentPicURL);
    likedPicsArray.push("false");
    updateHistory(currentPicURL);
    saveToLS();
  } catch (error) {
    console.error("Error fetching random photo:", error);
  }
}

pic.addEventListener("click", () => {
  getRandomPic();
});

likeButton.addEventListener("click", () => {
  likeButton.querySelector("span").classList.toggle("pic__liked-heart");
  historyContainer
    .getElementsByClassName("history__pic")
    [historyPics.indexOf(currentPicURL)].querySelector("img")
    .classList.toggle("pic__liked");
  if (likeButton.querySelector("span").classList.contains("pic__liked-heart")) {
    counterLikes.textContent = ++totalLikes;
    likedPicsArray.splice(likedPicsArray.length - 1, 1, "true");
  } else {
    counterLikes.textContent = --totalLikes;
    likedPicsArray.splice(likedPicsArray.length - 1, 1, "false");
  }
  saveToLS();
});

function updateHistory(current) {
  historyContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="history__pic">
      <img src="${current}" alt="new_pic"/>
    </div>`
  );
}
