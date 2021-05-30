const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirm_password');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form_control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form_control success';
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkValue(inputArr) {
  inputArr.forEach((item) => {
    if (item.value.trim() === '') {
      showError(item, `${getFieldName(item)} is required`);
    } else showSuccess(item);
  });
}

function checkLength(input, min, max) {
  if (input.value.length > min && input.value.length < max) showSuccess(input);
  else
    showError(
      input,
      `${getFieldName(
        input
      )} should more than ${min} and less than ${max} characters`
    );
}

function validateEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) showSuccess(input);
  else showError(input, 'Email is not valid');
}
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkValue([username, email, password, confirmPassword]);
  checkLength(username, 3, 10);
  checkLength(password, 3, 9);
  validateEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
