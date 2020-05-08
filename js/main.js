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
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');
const inputSearch = document.querySelector('.input-search');

let login = localStorage.getItem('delivery');
let password = localStorage.getItem('delivery');

const getData = async function(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, 
      статус ошибка ${response.status}!`);
  }

  return await response.json();
};

const valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str);
}

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

    if(valid(logInInput.value)){
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
      passwordInput.style.borderColor = 'red';
      logInInput.value = '';
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

function createCardRestaurant({ image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery }) {

  const card = `
    <a class="card card-restaurant" 
    data-products="${products}"
    data-info="${[name, price, stars, kitchen]}"
    >
              <img src="${image}" alt="image" class="card-image"/>
              <div class="card-text">
                <div class="card-heading">
                  <h3 class="card-title">${name}</h3>
                  <span class="card-tag tag">${timeOfDelivery} мин</span>
                </div>
                <div class="card-info">
                  <div class="rating">
                    ${stars}
                  </div>
                  <div class="price">От ${price} ₽</div>
                  <div class="category">${kitchen}</div>
                </div>
              </div>
            </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood({ description, image, id, name, price }) {

  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
                    <img src="${image}" alt="image" class="card-image"/>
                    <div class="card-text">
                      <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                      </div>
                      <div class="card-info">
                        <div class="ingredients">${description}</div>
                      </div>
                      <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                          <span class="button-card-text">В корзину</span>
                          <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                      </div>
                    </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend',card);
}

function openGoods(event) {
  const target = event.target;

  if (login) {

    const restaurant = target.closest('.card-restaurant'); // ищу элемент до класса
    if(restaurant) {

      const info = restaurant.dataset.info.split(',');

      const [ name, price, stars, kitchen ] = info;
      cardsMenu.textContent = '';
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');
      
      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = `От ${price} руб`;
      category.textContent = kitchen;
      
      getData(`./db/${restaurant.dataset.products}`).then(function(data){
        data.forEach(createCardGood);
      });
    }
    } else {
      toogleModalAuth();
    }
}

function init() {
  getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant);
  });
  
  cartButton.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);
  cardsRestaurants.addEventListener('click', openGoods);
  logo.addEventListener('click', function () {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
  });

  inputSearch.addEventListener('keydown', function(event){
    if (event.keyCode === 13) {
      const target = event.target;

      const value = target.value.toLowerCase().trim();
      target.value = '';
      if (!value || value.length < 3) {
        target.style.backgroundColor = 'tomato';
        setTimeout(function(){
          target.style.backgroundColor = '';
        }, 2000);
        return;
      }
      

      const goods = [];

      getData('./db/partners.json')
      .then(function(data){
        const products = data.map(function(item){
          return item.products;
        });
        products.forEach(function(product){
          getData(`./db/${product}`)
          .then(function(data){
            goods.push(...data);

            const searchGoods = goods.filter(function(item){
              return item.name.toLowerCase().includes(value)
            });
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
      
            restaurantTitle.textContent = 'Результат поиска';
            rating.textContent = '';
            minPrice.textContent = '';
            category.textContent = '';

            return searchGoods;

          })
          .then(function(data){
            data.forEach(createCardGood);
          })
        })
      });
    }
  });
  
  checkAuth();
  
  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    sliderPerView: 1,
    sliderPerColumn: 1,
  });
}

init();