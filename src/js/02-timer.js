import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
      document.querySelector('[data-start]').setAttribute('disabled', 'disabled');
    } else {
      document.querySelector('[data-start]').removeAttribute('disabled');
    }
  },
};

flatpickr("#datetime-picker", options);

const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval = null;

function startCountdown(selectedDate) {
  countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.success("Countdown complete!");
      return;
    }

    const timeValues = convertMs(timeDifference);
    updateTimerDisplay(timeValues);
  }, 1000);
}

function updateTimerDisplay(timeValues) {
  timerFields.days.textContent = addLeadingZero(timeValues.days);
  timerFields.hours.textContent = addLeadingZero(timeValues.hours);
  timerFields.minutes.textContent = addLeadingZero(timeValues.minutes);
  timerFields.seconds.textContent = addLeadingZero(timeValues.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value);
  startCountdown(selectedDate);
  document.querySelector('[data-start]').setAttribute('disabled', 'disabled');
});