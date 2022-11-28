const regForm = document.forms[0];
const header = document.querySelector('.header');
const errorMsg = document.querySelector('.error-msg');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#password-confirm');
const eye = document.querySelector('.fa-eye');
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const ageSpan = document.querySelector('.age-span');
const heightSpan = document.querySelector('.height-span');
const weightSpan = document.querySelector('.weight-span');

age.addEventListener('change', () => {
  ageSpan.innerText = regForm.elements[5].value;
});
height.addEventListener('change', () => {
  heightSpan.innerText = regForm.elements[6].value + 'cm';
});
weight.addEventListener('change', () => {
  weightSpan.innerText = regForm.elements[7].value + 'kg';
});

async function registerUser(data) {
  const response = await fetch('http://localhost:3020/auth/registration', {
    method: 'POST',
    body: data,
  });

  return response.json();
}

regForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formElement = e.target;
  const formData = new FormData(formElement);
  registerUser(formData).then((data) => {
    if (data.status == 'Error') {
      errorMsg.innerText = data.message;
    }
    if (data.status == 'OK') {
      errorMsg.innerText = '';
      header.innerText = 'Your account has been created !';
      setTimeout(() => {
        window.location.pathname = '/';
      }, 2300);
    }
  });
});

let passHidden = true;
function switchPassVisibility() {
  passHidden = !passHidden;
  passHidden
    ? (eye.className = 'fa-solid fa-eye') &
      password.setAttribute('type', 'password') &
      passwordConfirm.setAttribute('type', 'password')
    : (eye.className = 'fa-solid fa-eye-slash') &
      password.setAttribute('type', 'text') &
      passwordConfirm.setAttribute('type', 'text');
}

eye.addEventListener('click', switchPassVisibility);
