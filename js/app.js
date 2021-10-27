'use strict';

let formEl = document.querySelector('form');
let toppingsContainer = document.querySelector('.toppings');
let pictureContainer = document.querySelector('.pictures');
let menuContainer = document.querySelector('.menu--container');

let toppingArr = [
  'bacon',
  'chicken',
  'cheese',
  'pepperoni',
  'salami',
  'champignons',
];

let pizzaImgArr = [
  'https://images.pexels.com/photos/208537/pexels-photo-208537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/1069449/pexels-photo-1069449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
];

renderToppings();
renderPizzaImages();

// Generating toppings from the toppingArr

function renderToppings() {
  let toppingArrCopy = [...toppingArr];
  toppingArrCopy.map((t) => {
    toppingsContainer.innerHTML += `
        <input class="checkbox" type="checkbox" name="${t}" id="${t}" value="${t}" />
        <label for="${t}">${t}</label>
        `;
  });
}

// Generating pictures from the pizzaImgArr

function renderPizzaImages() {
  let pizzaImgArrCopy = [...pizzaImgArr];

  for (let i = 0; i < pizzaImgArrCopy.length; i++) {
    let pizzaImgCard = document.createElement('div');
    let url = `url(${pizzaImgArrCopy[i]})`;
    pizzaImgCard.style.backgroundImage = url;
    pizzaImgCard.className = 'picture--card';
    pizzaImgCard.id = `pic${[i]}`;

    pictureContainer.append(pizzaImgCard);
  }
}

// adding event listenerers

// selecting a picture

pictureContainer.addEventListener('click', (e) => {
  if (e.target.className.includes('picture--card')) {
    e.target.classList.toggle('checked');
  }
});

// saving form data to sessionStorage
sessionStorage.removeItem('IsThisFirstTime_Log_From_LiveServer');

formEl.addEventListener('submit', (e) => {
  let checkedToppingEl = document.querySelectorAll('.checkbox');
  let checkedToppingArr = [];
  checkedToppingEl.forEach((el) => {
    if (el.checked) {
      checkedToppingArr.push(el.value);
    }
  });

  let formData = {
    name: document.querySelector('.name').value,
    price: document.querySelector('.price').value,
    heat: document.querySelector('.heat').value,
    toppings: checkedToppingArr,
    picture: document.querySelector('.checked').style.backgroundImage,
  };
  sessionStorage.setItem(formData.name, JSON.stringify(formData));
  formEl.reset();

  e.preventDefault();
});

// getting data from sessionStorage to display on the menu
let keyValues = Object.keys(sessionStorage);
// console.log(key);
let storedData = [];
for (let i = 0; i < keyValues.length; i++) {
  let dataObj = JSON.parse(sessionStorage.getItem(`${keyValues[i]}`));
  storedData.push(dataObj);
}
// console.log(storedData);

function generatePizza() {
  storedData.forEach((el) => {
    let pizzaCard = document.createElement('div');
    let pizzaCardData = document.createElement('div');
    pizzaCardData.innerHTML += `  
              <h3>${el.name}</h3>
              <p>${el.price}</p>
              <p>${el.toppings}</p>
              <p>${el.heat}</p>           
              `;
    let pizzaCardImg = document.createElement('div');
    pizzaCardImg.style.backgroundImage = el.picture;
    pizzaCardImg.className = 'picture--card';

    pizzaCard.append(pizzaCardImg);
    pizzaCard.append(pizzaCardData);
    menuContainer.append(pizzaCard);
  });
}
generatePizza();
