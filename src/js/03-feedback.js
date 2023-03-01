import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');
const buttonRef = document.querySelector('button');

console.log(inputRef.value);
formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput), 500);

populateForm();

function onFormSubmit(e) {
  e.preventDefault();

  e.target.reset();
  localStorage.removeItem('key');
  localStorage.removeItem('key1');
}

function onFormInput(e) {
  if (inputRef.value === e.target.value) {
    const email = e.target.value;
    localStorage.setItem('key', email);
  } else if (textareaRef.value) {
    const message = e.target.value;
    localStorage.setItem('key1', message);
  }
}

function populateForm() {
  const savedEmail = localStorage.getItem('key');
  const savedMessage = localStorage.getItem('key1');
  if (savedEmail || savedMessage) {
    inputRef.value = savedEmail;
    textareaRef.value = savedMessage;
  }
}
