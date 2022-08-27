// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import convertMs from './convertMs';
// console.log(convertMs());
const refs = {
  button: document.querySelector('button[data-start]'),
  input: document.querySelector('input[type="text"]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  selectedDate: null,
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date();
    refs.selectedDate = selectedDates[0];

    if (refs.selectedDate.getTime() < currentTime) {
      if (!refs.button.hasAttribute('disabled')) {
        refs.button.setAttribute('disabled', '');
      }

      return Notify.failure('Please choose a date in the future');
    }

    if (refs.selectedDate.getTime() >= currentTime) {
      refs.button.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.input, options);

const timer = {
  intervalId: null,
  onActive: false,
  start() {
    if (this.onActive) return;
    this.onActive = true;
    const timerId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = refs.selectedDate - currentTime;
      console.log(
        '🚀 ~ file: 02-timer.js ~ line 50 ~ timerId ~ deltaTime',
        deltaTime
      );

      if (deltaTime < 1000) {
        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
        clearInterval(timerId);
      }

      updateTimer(convertMs(deltaTime));
      // console.log(`${days}::${hours}::${minutes}::${seconds}`);
    }, 1000);
  },
};

refs.button.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  timer.start();
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
  console.log(`${days}::${hours}::${minutes}::${seconds}`);
}
