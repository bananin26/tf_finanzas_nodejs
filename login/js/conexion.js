const loginForm = document.querySelector('.sign-in-form');

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const emailValue = document.querySelector('.sign-in-form .input-field[type="text"]').value;
  const passwordValue = document.querySelector('.sign-in-form .input-field[type="password"]').value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue
    })
  })
  .then(response => {
    if (!response.ok) {
    throw new Error(response.statusText);
    }
    return response.json();
   })
   .then(data => {
    console.log(data);
    window.location.href = '/app_finance/app_finance.html?userId=' + data.userId;
   })   
  .catch(error => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Invalid email or password!',
    footer: '<a href="">Forgot your password?</a>'
  }))
});

const toggleLink1 = document.querySelector('.sign-in-form .toggle');

toggleLink1.addEventListener('click', () => {
  const emailInput = document.querySelector('.sign-in-form .input-field[type="text"]');
  const passwordInput = document.querySelector('.sign-in-form .input-field[type="password"]');

  emailInput.value = '';
  passwordInput.value = '';
});

const registerForm = document.querySelector('.sign-up-form');

registerForm.addEventListener('submit', event => {
  event.preventDefault();

  const usernameValue = registerForm.querySelector('input[type="text"]').value;
  const emailValue = registerForm.querySelector('input[type="email"]').value;
  const passwordValue = registerForm.querySelector('input[type="password"]').value;

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: usernameValue,
      email: emailValue,
      password: passwordValue
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.text();
  })
  .then(data => {
    Swal.fire(
        'Successfully!',
        'User has been registered successfully!',
        'success'
      )
    
    console.log(data);
  })
  .catch(error => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'This email is already registered!',
  }))
});

const toggleLink2 = document.querySelector('.sign-up-form .toggle');

toggleLink2.addEventListener('click', () => {
  const usernameInput = document.querySelector('.sign-up-form .input-field[type="text"]');
  const emailInput = document.querySelector('.sign-up-form .input-field[type="email"]');
  const passwordInput = document.querySelector('.sign-up-form .input-field[type="password"]');

  usernameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
});