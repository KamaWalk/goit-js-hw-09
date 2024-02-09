const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerChangeColor = null;

startButton.disabled = false;
stopButton.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    document.body.style.backgroundColor = getRandomHexColor();
    timerChangeColor = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    });

stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timerChangeColor);
});
