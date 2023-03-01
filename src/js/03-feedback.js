import throttle from 'lodash.throttle';

const FORM__KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput), 500);

populateForm();

const formData = {};

function onFormSubmit(e) {
  e.preventDefault();

  e.target.reset();
  localStorage.removeItem(FORM__KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM__KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(FORM__KEY));
  if (savedData) {
    inputRef.value = savedData.email;
    textareaRef.value = savedData.message;
  }
}
