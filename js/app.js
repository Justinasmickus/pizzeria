'use strict';

let formEl = document.querySelector('form');
let toppingsContainer = document.querySelector('.toppings');
let pictureContainer = document.querySelector('.pictures');

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
        <input class="cb" type="checkbox" name="${t}" id="${t}" value="${t}" />
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
