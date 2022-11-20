import items from "../data/items.json" assert {type:"json"}; 

let suits = document.getElementById("suits");
let ties = document.getElementById("ties");
let accs = document.getElementById("accesories");
let suitsStyle = window.getComputedStyle(suits);
let tiesStyle = window.getComputedStyle(ties);
let accsStyle = window.getComputedStyle(accs);

let backgroundDisplays = {
  black: {
    bg: "url('../images/test-bg.jpg')",
    h1: "Never stop pushing.",
    h1Color: "white",
    h1Opacity: "0.6",
    tBoxMarginRight: "0%",
    tBoxMarginBottom: "10%",
    middleAlign: false,
  },

  pink: {
    bg: "url('../images/pink-bg.jpeg')",
    h1: "Stay Clean.",
    h1Color: "white",
    h1Opacity: "1",
    tBoxMarginRight: "0%",
    tBoxMarginBottom: "0%",
    middleAlign: true,
  },

  sitting: {
    bg: "url('../images/sitting.jpg')",
    h1: "Tailoring &amp; designing fits with precision, inspired by north-west Africa.",
    h1Color: "black",
    h1Opacity: "1",
    tBoxMarginRight: "65%",
    tBoxMarginBottom: "0%",
    middleAlign: true,
  },
};

function displayTies() {
  if (tiesStyle.opacity == 0) {
    ties.style.opacity = 1;
    suits.style.opacity = 0;
    accs.style.opacity = 0;
    ties.style.position = "relative";
    suits.style.position = "absolute";
    accs.style.position = "absolute";
    suits.style.zIndex = "0";
    ties.style.zIndex = "1";
    accs.style.zIndex = "0";
  }
}

function displaySuits() {
  if (suitsStyle.opacity == 0) {
    suits.style.opacity = 1;
    ties.style.opacity = 0;
    accesories.style.opacity = 0;
    suits.style.position = "relative";
    ties.style.position = "absolute";
    accs.style.position = "absolute";
    suits.style.zIndex = "1";
    ties.style.zIndex = "0";
    accs.style.zIndex = "0";
  }
}

function displayAcc() {
  if (accsStyle.opacity == 0) {
    accs.style.opacity = 1;
    suits.style.opacity = 0;
    ties.style.opacity = 0;
    accs.style.position = "relative";
    ties.style.position = "absolute";
    suits.style.position = "absolute";
    accs.style.zIndex = "1";
    suits.style.zIndex = "0";
    ties.style.zIndex = "0";
  }
}
let options = Object.keys(backgroundDisplays);
let currentIndex = 0;

/**
 * @param {string} bgType desired background config
 */
function changeHero1Background(bgType) {
  let hero1 = document.getElementsByClassName("hero1")[0];
  let textBox = hero1.children[0];
  let bgConfig = {};
  console.log(bgType);
  console.log(currentIndex);

  switch (bgType) {
    case "black":
      bgConfig = backgroundDisplays.black;
      break;

    case "pink":
      bgConfig = backgroundDisplays.pink;
      break;

    case "sitting":
      bgConfig = backgroundDisplays.sitting;
      break;
  }

  let heroH1 = textBox.children[0];

  if (bgConfig.middleAlign) {
    textBox.style.display = "flex";
    textBox.style.justifyContent = "center";
    textBox.style.alignItems = "center";
  }

  heroH1.style.color = bgConfig.h1Color;
  heroH1.style.opacity = bgConfig.h1Opacity;
  heroH1.innerHTML = bgConfig.h1;
  textBox.style.marginRight = bgConfig.tBoxMarginRight;
  textBox.style.paddingBottom = bgConfig.tBoxMarginBottom;
  hero1.style.backgroundImage = bgConfig.bg;
  currentIndex = incrementIndex(currentIndex);
}


function incrementIndex(index) {
  if (currentIndex >= 2) {
    index = 0;
  } else {
    index++;
  }
  return index;
}

class Shop {
  constructor(){
    let this.items = []
  }
}

class ShopItem{
  constructor(name,price){
    this.name = name
    this.price = price
  }

}

console.log(items)

setInterval(function () {
  changeHero1Background((bgType = options[currentIndex]));
}, 60000);

