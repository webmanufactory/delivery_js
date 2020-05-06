'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const logInInput = document.querySelector('#login');
const passwordInput = document.querySelector ('#password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const buttonLogin = document.querySelector('.button-login');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('delivery');
let password = localStorage.getItem('delivery');

function toggleModal() {
  modal.classList.toggle("is-open");
}

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

//day2

function createCardRestaurant() {
  const card = `
    <a class="card card-restaurant">
              <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title">Пицца плюс</h3>
                  <span class="card-tag tag">50 мин</span>
                </div>
                <div class="card-info">
                  <div class="rating">
                    4.5
                  </div>
                  <div class="price">От 900 ₽</div>
                  <div class="category">Пицца</div>
                </div>
              </div>
            </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
                    <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
                    <div class="card-text">
                      <div class="card-heading">
                        <h3 class="card-title card-title-reg">Пицца Классика</h3>
                      </div>
                      <div class="card-info">
                        <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
                          грибы.
                        </div>
                      </div>
                      <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                          <span class="button-card-text">В корзину</span>
                          <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">510 ₽</strong>
                      </div>
                    </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend',card);
}

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest('.card-restaurant'); // ищу элемент до класса

  if (restaurant) {
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');


    createCardGood();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function () {
      containerPromo.classList.remove('hide');
      restaurants.classList.remove('hide');
      menu.classList.add('hide');
});

checkAuth();

createCardRestaurant()