const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//day1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const logInInput = document.querySelector('#login');
const passwordInput = document.querySelector ('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const buttonLogin = document.querySelector('.button-login');

let login = localStorage.getItem('delivery');
let password = localStorage.getItem('delivery');

function toogleModalAuth() {
  modalAuth.classList.toggle('is-open');
}


function authorized() {

  function logOut() {
    login = '';
    password = 'null';
    localStorage.removeItem('delivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }
  console.log('Авторизован');
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);

}

function notAuthorized() {
    console.log('Не авторизован');

    function logIn(event) {
    event.preventDefault();
    logInInput.style.borderColor = '';

    if(logInInput.value.trim()){
      login = logInInput.value;
    password = passwordInput.value;
    localStorage.setItem('delivery', login);
    localStorage.setItem('delivery', password);
    toogleModalAuth();
    buttonAuth.removeEventListener('click', toogleModalAuth);
    closeAuth.removeEventListener('click', toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
    } else {
      logInInput.style.borderColor = 'red';
    }
  }

    buttonAuth.addEventListener('click', toogleModalAuth);
    closeAuth.addEventListener('click', toogleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login && password) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();

// function checkForm() {
//   if () {
//     authorized();
//   } else {
//     notAuthorized();
//   }
// }

// checkForm();

