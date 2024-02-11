import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = {
days: document.querySelector('[data-days]'),
hours: document.querySelector('[data-hours]'),
minutes: document.querySelector('[data-minutes]'),
seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

const setTime = document.querySelector('[#datetime-picker]');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= new Date()) {
        Notiflix.Notify.warning("Please choose a date in the future", {timeout: 2500});
        return;
      }
      startButton.disabled = false;
    },
  };

const fp = flatpickr("#datetime-picker", options);
  

function convertMs(ms) {
    // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
    // Remaining days
      const days = Math.floor(ms / day);
    // Remaining hours
      const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
      return { days, hours, minutes, seconds };
    }
    
    console.log(convertMs(2000));// {days: 0, hours: 0, minutes: 0, seconds: 2}
    console.log(convertMs(140000));// {days: 0, hours: 0, minutes: 2, seconds: 20}
    console.log(convertMs(24140000));// {days: 0, hours: 6 minutes: 42, seconds: 20}
    
    function setTimer ({ days, hours, minutes, seconds }, ms) {
        let timerCountdown = convertMs(ms);
        days.textContent = String(timerCountdown.days).padStart(2, "0");
        hours.textContent = String(timerCountdown.hours).padStart(2, "0");
        minutes.textContent = String(timerCountdown.minutes).padStart(2, "0");
        seconds.textContent = String(timerCountdown.seconds).padStart(2, "0");
    };

startButton.addEventListener('click', () => {
    if (startButton.textContent = "Start") {
        startButton.textContent = "Stop"
        startButton.disabled = true;
        countdown();
        timerId = setInterval(countdown, 1000);
    } else {
        clearInterval(timerId);
        startButton.textContent = "Start";
        setDate.disabled = false;
    }
});

function countdown() {
    const newDate = new Date (setDate.value);
    let ms = newDate.getTime() - new Date().getTime();
    if (ms > 1000) {
        setTimer(timer, ms);
        return;
    }
    setTimer(timer, 0);
    clearInterval(timerId);
    startButton.textContent = "Start";
    startButton.disabled = true;
    Notiflix.Notify.success('Yay! This it IT :D', {timeout: 2000});
};