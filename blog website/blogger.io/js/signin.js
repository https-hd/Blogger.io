const loginButton = document.getElementById('login-btn');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('[data-close-button]');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginForm = document.getElementById('login-form');
const loginSubmit = document.getElementById('login-submit');

// show modal on button click
loginButton.addEventListener('click', () => {
  modal.classList.add('show');
});

// hide modal on close button click
closeButton.addEventListener('click', () => {
  modal.classList.remove('show');
});

// handle form submission
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = emailInput.value;
  const password = passwordInput.value;
  
  // send login request to backend
  const response = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // handle login response
  const result = await response.json();
  
  if (result.success) {
    // redirect user to dashboard
    window.location.href = '/dashboard';
  } else {
    // display error message
    const errorText = document.querySelector('.error-txt');
    errorText.innerText = result.message;
    errorText.style.display = 'block';
  }
});