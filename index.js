const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const timeFormatting = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`;
};

const createTimerAnimator = () => {
  let start;
  let remainingSeconds;
  const step = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    const elapsed = Math.floor((timestamp - start) / 1000);
    if (elapsed >= remainingSeconds) {
      timerEl.textContent = '00:00:00';
    } else {
      timerEl.textContent = timeFormatting(remainingSeconds - elapsed);
      requestAnimationFrame(step);
    }
  };

  return (seconds) => {
    remainingSeconds = seconds;
    start = null;
    timerEl.textContent = timeFormatting(seconds);
    requestAnimationFrame(step);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = '';
});
