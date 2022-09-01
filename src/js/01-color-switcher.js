const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.body;

const randomColorObject = {
  intervalId: null,
  onActive: false,
  start() {
    if (this.onActive) return;
    this.onActive = true;
    this.intervalId = setInterval(() => {
      let randomColor = getRandomHexColor();
      body.style.backgroundColor = `${randomColor}`;
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.onActive = false;
  },
};

start.addEventListener('click', () => {
  randomColorObject.start();
});
stop.addEventListener('click', () => {
  randomColorObject.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
