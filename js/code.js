import items from "../data/items.json" assert { type: "json" };

let suits = document.getElementById("suits");
let ties = document.getElementById("ties");
let accs = document.getElementById("accesories");
let suitsStyle = window.getComputedStyle(suits);
let tiesStyle = window.getComputedStyle(ties);
let accsStyle = window.getComputedStyle(accs);

const unCamelCase = function (word) {
  return word
    .split(/(?=[A-Z])/)
    .map((p) => {
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" ");
};

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
  constructor() {
    this.cart = [];
    this.cartHoverHtml = document.getElementsByClassName("shop-hover")[0];
    this.cartItemCount = document.querySelector(".n-items");
  }

  renderItemCount(increment) {
    if (increment) {
      this.cartItemCount.textContent =
        parseInt(this.cartItemCount.textContent) + 1 + "";
    } else {
      this.cartItemCount.textContent =
        parseInt(this.cartItemCount.textContent) - 1 + "";
    }
  }

  addToCart(ShopItem) {
    if (!this.cart.length) {
      ShopItem.count++;
      this.cart.push(ShopItem);
      this.renderItemCount(true);
      this.buildHoverHtml();
      return;
    } else {
      for (let el of this.cart) {
        if (el.name == ShopItem.name) {
          el.count++;
          this.renderItemCount(true);
          this.buildHoverHtml();
          return;
        }
      }
      ShopItem.count++;
      this.cart.push(ShopItem);
      this.renderItemCount(true);
    }
    this.buildHoverHtml();
  }

  removeFromCart(ShopItem) {
    for (let [i, el] of this.cart.entries()) {
      if (el.name == ShopItem.name) {
        el.count--;
        this.renderItemCount(false);
        if (!el.count) {
          this.cart.splice(i, 1);
          let itemsHtml = document.querySelector(".shop-hover");
          for (let child of itemsHtml.children) {
            if (child.id === "li-" + ShopItem.name) {
              console.log("removing");
              itemsHtml.removeChild(child);
            }
          }
        }
      }
    }
    console.log(this.cart);
    this.buildHoverHtml();
  }
  buildHoverHtml() {
    if (!this.cart.length) {
      this.cartHoverHtml.innerHTML =
        "<li id='emptyCart'><p>No items on cart</p></li>";
    } else {
      let htmlString = "";
      refreshIconEvents();
      for (const el of this.cart) {
        const htmlEl = document.querySelector(`#li-${el.name}`);
        let hasListener = "";
        if (htmlEl) {
          hasListener = htmlEl.children[0].children[0].getAttribute("listener");
        }

        htmlString += `<li id = 'li-${
          el.name
        }' class='hover-item'><div class='pre-count'><i class='material-icons add-item' style=color:white listener = '${hasListener}'>expand_less</i><span>${unCamelCase(
          el.name
        )}</span><i class='material-icons subtract-item' style=color:white listener='${hasListener}'>expand_more</i></div><span id='item-count'>${
          el.count
        }</span></li><hr>`;
      }
      this.cartHoverHtml.innerHTML = htmlString;
      refreshIconEvents();
      return htmlString;
    }
  }
}

class ShopItem {
  constructor(name, price, imageDir) {
    this.name = name;
    this.price = price;
    this.imageDir = imageDir;
    this.count = 0;
  }
}

let shopItemsInfo = [];
let myShop = new Shop();
myShop.buildHoverHtml();

for (const [k, v] of Object.entries(items)) {
  shopItemsInfo.push(new ShopItem(k, v["price"], v["image"]));
}

for (let i = 0; i < shopItemsInfo.length; i++) {
  let iterShopEl = shopItemsInfo[i];
  let collection = document.getElementById(iterShopEl.name).children;
  if (!isNaN(iterShopEl.price)) {
    collection[1].innerHTML = "" + iterShopEl.price + "&euro;";
  } else {
    collection[1].innerHTML = "Contact";
  }
}
let suitsButton = document.getElementById("displaySuits");
let tiesButton = document.getElementById("displayTies");
let accsButton = document.getElementById("displayAcc");

suitsButton.addEventListener("click", displaySuits, false);
tiesButton.addEventListener("click", displayTies, false);
accsButton.addEventListener("click", displayAcc, false);

function addItemToCartFromButtonClick(itemDict, shop, button) {
  let id = button.parentNode.id;
  let item = new ShopItem(id, itemDict[id]["price"], itemDict[id]["image"]);
  shop.addToCart(item);
}

function shopItemModifyCountFromIconClick(itemDict, shop, i) {
  let id = i.parentNode.parentNode.id.slice(3);
  let item = new ShopItem(id, itemDict[id]["price"], itemDict[id]["image"]);
  if (i.className.includes("add-item")) {
    shop.addToCart(item);
  } else {
    shop.removeFromCart(item);
  }
}

let addToShopButtons = document.getElementsByClassName("add-to-shop-button");
for (const button of addToShopButtons) {
  button.addEventListener("click", function () {
    addItemToCartFromButtonClick(items, myShop, button);
  });
}

const refreshIconEvents = function () {
  let addOrDecreaseIcons = document.querySelectorAll(".material-icons");
  for (const icon of addOrDecreaseIcons) {
    icon.addEventListener("click", function () {
      shopItemModifyCountFromIconClick(items, myShop, icon);
    });
    icon.setAttribute("listener", "true");
  }
};

setInterval(function () {
  changeHero1Background(options[currentIndex]);
}, 30000);
