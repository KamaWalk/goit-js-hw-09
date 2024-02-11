import Notiflix from 'notiflix';

const form = document.querySelector(".form");
const delay = form.querySelector("[name='delay']");
const step = form.querySelector("[name='step']");
const amount = form.querySelector("[name='amount']");

delay.setAttribute('verified', 'N');
step.setAttribute('verified', 'N');
amount.setAttribute('verified', "N");

const submitButton = form.querySelector("[type='submit']");
submitButton.disabled = true;

form.addEventListener('input', (event) => {
  if (event.target.value <= 0) {
    Notiflix.Notify.warning('Please enter a number greater than 0');
    submitButton.disabled = true;
    return
  }
  event.target.setAttribute('verified', 'Y');
  if (
    delay.getAttribute('verified') == 'Y' &&
    step.getAttribute('verified') == 'Y' &&
    amount.getAttribute('verified') == 'Y'
  ) {
   
    submitButton.disabled = false;
  }
});

form.addEventListener('submit', () => {
  event.preventDefault();
  const delay = Number.parseInt(form.delay.value);
  const step = Number.parseInt(form.step.value);
  const amount = Number.parseInt(form.amount.value);
  let i = 1;
  createPromise(i, delay)
    .then(message => Notiflix.Notify.success(message))
    .catch(message => Notiflix.Notify.failure(message));
  i++;
  while (i <= amount) {
    let nthDelay = delay + i * step;
    createPromise(i, nthDelay)
      .then(message => Notiflix.Notify.success(message))
      .catch(message => Notiflix.Notify.failure(message));
    i++;
  };
  form.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay)
  })
}