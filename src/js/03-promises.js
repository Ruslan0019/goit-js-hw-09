
import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const delay = parseInt(this.querySelector('[name="delay"]').value);
  const step = parseInt(this.querySelector('[name="step"]').value);
  const amount = parseInt(this.querySelector('[name="amount"]').value);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + (i - 1) * step;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // Використовуй notiflix для відображення повідомлень:
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});