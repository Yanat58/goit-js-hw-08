import throttle from 'lodash.throttle';

const FORM_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput), 500);

populateForm();

const formData = {};

function onFormSubmit(e) {
  e.preventDefault();

  if (inputRef.value == '' || textareaRef.value == '') {
    return alert('Please fill in all the fields!');
  }
  console.log({
    email: inputRef.value,
    message: textareaRef.value,
  });
  e.target.reset();
  localStorage.removeItem(FORM_KEY);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(FORM_KEY));
  if (savedData) {
    inputRef.value = savedData.email;
    textareaRef.value = savedData.message;
  }
}
