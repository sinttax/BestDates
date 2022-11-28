const logForm = document.forms[0];
const loginDiv = document.querySelector('.login');
const errorMsg = document.querySelector('.error-msg');

function formVaulues() {
  let loginObj = {
    user_email: logForm.elements[0].value,
    user_password: logForm.elements[1].value,
  };
  return loginObj;
}

async function signIn(data) {
  const response = await fetch('http://localhost:3020/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

logForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signIn(formVaulues()).then((data) => {
    console.log(data);
    if (data.error) {
      errorMsg.innerText = data.error;
    }
    if (data.message) {
      window.location.pathname = '/dashboard';
    }
  });
});
