"use strict";

let active = { empty: true };
let modal = false;

const url = "https://word-cards-15-12-2019.herokuapp.com"; //  'http://localhost:5000 '
const htmlGen = {
  menuListner: false,

  deleteEl(el) {
    let target = document.querySelector(`.${el}`);
    if (target) {
      target.parentNode.removeChild(target);
    }
  },

  createEl(params) {
    // console.log(type);
    const { id, html, style, type } = params;
    let el = document.createElement(`${type ? type : "div"}`);
    if (params.class) el.className = params.class;
    if (id) el.id = id;
    if (html) el.innerHTML = html;
    if (style) el.style = style; // ?????

    // el.dataset["max"] = "max";
    // console.log(type["data-"]);
    // console.log(type);

    Object.keys(params).forEach((key) => {
      if (key.match(/data_/)) {
        let dataAttName = key.replace(/data_/, "");
        el.dataset[`${dataAttName}`] = params[key];
      }
    });

    // console.log(el["className"]);
    return el;
  },

  hideCreateModule() {
    let regularBTN = document.getElementById("new-module-regular");
    let menuBTN = document.getElementById("new-module-menu");
    regularBTN.classList.toggle("hidden");
    menuBTN.classList.toggle("hidden");
  },

  toggleGameButtons() {
    document
      .querySelector(".header__title")
      .classList.toggle("hidden__media-tablet");
    document
      .querySelector(".header__buttons-regular")
      .classList.toggle("hidden__media-tablet");
    document
      .querySelector(".header__button-game-back")
      .classList.toggle("hidden");
    document
      .querySelector(".header__button-game-options")
      .classList.toggle("hidden");
  },

  toggleHeaderMenu() {
    let headerMenuBtn = document.querySelector(".header__menu");
    headerMenuBtn.classList.remove("hidden");

    let listnerFunction = (e) => {
      let headerMenuBtn = document.querySelector(".header__menu");
      headerMenuBtn.classList.add("hidden");
      this.menuListner = false;
      document.body.removeEventListener("click", listnerFunction);
    };

    if (!this.menuListner) {
      this.menuListner = true;

      setTimeout(() => {
        document.body.addEventListener("click", listnerFunction);
      }, 0);
    }
  },

  startDashboard() {
    let el = document.querySelector(".header__buttons-start");
    el.classList.toggle("hidden");
  },

  regularDashboard() {
    let el = document.querySelector(".header__buttons-regular");
    el.classList.toggle("hidden");
  },

  toggleSpinner() {
    spinner.classList.toggle("hidden");
  },

  start() {
    if (!active.empty) {
      this.toggleSpinner();
    }
    active = new Start();
  },

  log_in() {
    modal = new Log_in();
  },

  sign_up() {
    modal = new Sign_up();
  },

  delete() {
    modal = new Delete();
  },

  home() {
    if (!active.empty) {
      if (spinner.classList.contains("hidden")) this.toggleSpinner();
    }
    active = new Home();
  },

  module(id) {
    this.toggleSpinner();
    active = new Module(id);
  },

  edit(id) {
    this.toggleSpinner();
    active = new Edit(id);
  },

  game() {
    // id parameter
    // this.toggleSpinner();
    active = new Game(); // id parameter
  },

  options() {
    modal = new Options();
  },
};

class HttpParam {
  constructor(method, data, cred) {
    this.method = method;
    this.headers = {
      "Content-Type": "text/plain",
    };
    if (data) this.body = JSON.stringify(data);
    if (cred) this.credentials = "include";
  }
}

async function loggedInCheck() {
  try {
    let httpParam = new HttpParam("GET", false, true);
    htmlGen.toggleSpinner();
    let response = await fetch(url + "/home/auth", httpParam);

    if (response.status == 200) {
      htmlGen.regularDashboard();
      htmlGen.home();
    } else {
      htmlGen.startDashboard();
      htmlGen.start();
    }
  } catch (err) {
    // add connection with the server is absent message
    console.log(err);
    htmlGen.startDashboard();
    htmlGen.start();
  }
}

async function log_out() {
  // add a cookie deletion
  let httpParam = new HttpParam("GET", false, true);
  let response = await fetch(url + "/home/log-out", httpParam);
  htmlGen.regularDashboard();
  htmlGen.startDashboard();
  htmlGen.start();
}

const spinner = document.querySelector(".spinner__container");

loggedInCheck();
// htmlGen.game();
