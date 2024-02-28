"use strict";

// Урок 1. Dom-дерево
// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// Начальные данные (JSON):

const initialJson = `
[
  {
    "id": 1,
    "name": "Йога",
    "time": "10:00 - 11:00",
    "maxParticipants": 15,
    "currentParticipants": 8
  },
  {
    "id": 2,
    "name": "Пилатес",
    "time": "11:30 - 12:30",
    "maxParticipants": 10,
    "currentParticipants": 5
  },
  {
    "id": 3,
    "name": "Кроссфит",
    "time": "13:00 - 14:00",
    "maxParticipants": 20,
    "currentParticipants": 20 
  },
  {
    "id": 4,
    "name": "Танцы",
    "time": "14:30 - 15:30",
    "maxParticipants": 12,
    "currentParticipants": 10
  },
  {
    "id": 5,
    "name": "Бокс",
    "time": "16:00 - 17:00",
    "maxParticipants": 8,
    "currentParticipants": 6
  }
]`;

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при
// перезагрузке страницы.

const timetable = document.querySelector(".timetable");
const lsSportsKey = "Sports";
const lsClientKey = "Client's activities";

saveInitial(lsSportsKey, initialJson);
saveInitial(lsClientKey, JSON.stringify([]));

const sportsAll = JSON.parse(localStorage.getItem(lsSportsKey));
let clientParticipation = JSON.parse(localStorage.getItem(lsClientKey));

function saveInitial(key, item) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, item);
  }
}

function saveAlltoLS(clientKeys, sportsKeys) {
  localStorage.setItem(lsClientKey, JSON.stringify(clientKeys));
  localStorage.setItem(lsSportsKey, JSON.stringify(sportsKeys));
}

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже
// записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие,
// иначе она должна быть неактивна.

function showTimetable(item) {
  const isFull = item.currentParticipants >= item.maxParticipants;
  const isSubscribed = clientParticipation.includes(item.id);

  timetable.insertAdjacentHTML(
    "beforeend",
    `
      <div class="course" courseID="${item.id}">
        <div class="course__title">Наименование: ${item.name}</div>
        <div class="course__time">Время: ${item.time}</div>
        <div class="course__participants-max">Рассчитан на: ${
          item.maxParticipants
        } человек</div>
        <div class="course__participants-current">Записано: ${
          item.currentParticipants
        }</div>
        <div class="course__btns">
          <button class="course__btn-subscribe" ${
            isFull || isSubscribed ? "disabled" : ""
          }>Записаться</button>
          <button class="course__btn-unsubscribe" ${
            isSubscribed ? "" : "disabled"
          }>Отменить запись</button>
        </div>
      </div>
    `
  );
}

sportsAll.forEach(showTimetable);

// Пользователь может записаться на один курс только один раз.
// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.
// Если количество участников уже максимально, то пользователь не может записаться,
// даже если он не записывался ранее.

const subscriptionButtons = timetable.querySelectorAll(".course__btns");

subscriptionButtons.forEach((item) =>
  item.addEventListener("click", ({ target }) => {
    const courseDiv = target.closest(".course");
    const courseParticipants = courseDiv.querySelector(
      ".course__participants-current"
    );
    const courseSubscribeBtn = courseDiv.querySelector(
      ".course__btn-subscribe"
    );
    const courseUnsubscribeBtn = courseDiv.querySelector(
      ".course__btn-unsubscribe"
    );
    const courseID = parseInt(courseDiv.getAttribute("courseID"));
    const courseCurrent = sportsAll.find((i) => i.id === courseID);

    if (target.closest(".course__btn-subscribe")) {
      courseParticipants.textContent = `Записано: ${++courseCurrent.currentParticipants}`;
      courseSubscribeBtn.setAttribute("disabled", true);
      courseUnsubscribeBtn.removeAttribute("disabled");
      clientParticipation.push(courseCurrent.id);
    } else if (target.closest(".course__btn-unsubscribe")) {
      courseParticipants.textContent = `Записано: ${--courseCurrent.currentParticipants}`;
      courseSubscribeBtn.removeAttribute("disabled");
      courseUnsubscribeBtn.setAttribute("disabled", true);
      clientParticipation = clientParticipation.filter(
        (courseId) => courseId !== courseCurrent.id
      );
    }
    saveAlltoLS(clientParticipation, sportsAll);
  })
);
