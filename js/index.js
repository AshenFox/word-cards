"use strict";

let active = { empty: true };
let modal = false;

const url = "https://word-cards-15-12-2019.herokuapp.com"; // "http://localhost:5000"
const hashValues = {
  start: "#start",
  home: "#home",
  module: "#module",
  edit: "#edit",
  flashcards: "#flashcards",
  write: "#write",
};

const voice = new Voice();

const htmlGen = {
  menuListner: false,

  deleteEl(el) {
    let target = document.querySelector(`.${el}`);
    if (target) {
      target.parentNode.removeChild(target);
    }
  },

  createEl(params) {
    const { id, html, style, type } = params;
    let el = document.createElement(`${type ? type : "div"}`);
    if (params.class) el.className = params.class;
    if (id) el.id = id;
    if (html) el.innerHTML = html;
    if (style) el.style = style;

    Object.keys(params).forEach((key) => {
      if (key.match(/data_/)) {
        let dataAttName = key.replace(/data_/, "");
        el.dataset[`${dataAttName}`] = params[key];
      }
    });

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
    let [url, hash, id] = formatHash();
    let el = document.querySelector(".header__buttons-start");

    if (hash === "start" && !el.classList.contains("hidden")) return;
    el.classList.toggle("hidden");
  },

  regularDashboard() {
    let [url, hash, id] = formatHash();
    let el = document.querySelector(".header__buttons-regular");

    if (
      (hash === "home" ||
        hash === "module" ||
        hash === "edit" ||
        hash === "flashcards" ||
        hash === "write") &&
      !el.classList.contains("hidden")
    )
      return;
    el.classList.toggle("hidden");
  },

  toggleSpinner(on) {
    if (on) {
      spinner.classList.remove("hidden");
      spinnerBackground.classList.remove("hidden");
      document.body.classList.add("overflow-hid");
    } else {
      spinner.classList.add("hidden");
      spinnerBackground.classList.add("hidden");
      document.body.classList.remove("overflow-hid");
    }
  },

  start() {
    // if (!active.empty) {
    //   this.toggleSpinner();
    // }
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
    active = new Home();
  },

  module(id) {
    active = new Module(id);
  },

  edit(id) {
    active = new Edit(id);
  },

  flashcards(id) {
    active = new Flashcards(id); // id parameter
  },

  write(id) {
    active = new Write(id); // id parameter
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
    if (cred && localStorage.getItem("value"))
      this.headers["Authorization"] = `Bearer ${localStorage.getItem("value")}`;
    console.log(this.headers);
    if (data) this.body = JSON.stringify(data);
    if (cred) {
      this.withCredentials = true;
      this.credentials = "include";
    }
  }
}

// NEW CODE ---------------------------------------------------------------------------

async function loggedInCheck() {
  try {
    // let token = localStorage.getItem('token');
    // console.log(token);
    let httpParam = new HttpParam("GET", false, true);
    let response = await fetch(url + "/home/auth", httpParam);

    if (response.status == 200) {
      return true;
    }
  } catch (err) {
    // add connection with the server is absent message
    console.log(err);
  }

  return false;
}

async function log_out() {
  // add a cookie deletion
  // let httpParam = new HttpParam("GET", false, true);
  // let response = await fetch(url + "/home/log-out", httpParam);

  localStorage.removeItem("value");

  location.href = hashValues.start;
}

window.addEventListener("load", async (e) => {
  let [url, hash, id] = formatHash();

  htmlGen.toggleSpinner(true);

  if (!(await loggedInCheck())) {
    if (hash != "start") {
      location.href = hashValues.start;
    } else {
      hashHandler(hash, id);
    }
  } else {
    if (
      hash != "home" &&
      hash != "module" &&
      hash != "edit" &&
      hash != "flashcards" &&
      hash != "write"
    ) {
      location.href = hashValues.home;
    } else {
      hashHandler(hash, id);
    }
  }
});

window.addEventListener("hashchange", async (e) => {
  let [url, hash, id] = formatHash();

  htmlGen.toggleSpinner(true);

  if (!(await loggedInCheck())) {
    if (hash != "start") {
      location.href = hashValues.start;
    } else {
      hashHandler(hash, id);
    }
  } else {
    if (
      hash != "home" &&
      hash != "module" &&
      hash != "edit" &&
      hash != "flashcards" &&
      hash != "write"
    ) {
      location.href = hashValues.home;
    } else {
      hashHandler(hash, id);
    }
  }
});

async function hashHandler(hash, id) {
  console.log(hash, id);
  switch (hash) {
    case "start":
      if (!active.empty) {
        htmlGen.regularDashboard();
      }
      htmlGen.startDashboard();
      htmlGen.start();

      break;

    case "home":
      htmlGen.regularDashboard();
      htmlGen.home();
      break;

    case "module":
      htmlGen.regularDashboard();
      htmlGen.module(id);
      break;

    case "flashcards":
      htmlGen.regularDashboard();
      htmlGen.flashcards(id);
      break;

    case "write":
      htmlGen.regularDashboard();
      htmlGen.write(id);
      break;

    case "edit":
      htmlGen.regularDashboard();
      htmlGen.edit(id);
      break;

    default:
  }
}

function formatHash() {
  return location.href.split(/#|\?id=/);
}

const spinner = document.querySelector(".spinner__container");
const spinnerBackground = document.querySelector(".spinner__background");
const main = document.querySelector("main");
console.log(main);

function reveal() {
  htmlGen.toggleSpinner(true);
}
