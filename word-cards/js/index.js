"use strict";

let active = { empty: true };
let modal = false;

const stages = [
  {
    stage: 2,
    nextRep: 900000,
    prevStage: 2700000,
  },
  {
    stage: 3,
    nextRep: 3600000,
    prevStage: 10800000,
  },
  {
    stage: 4,
    nextRep: 10800000,
    prevStage: 32400000,
  },
  {
    stage: 5,
    nextRep: 86400000,
    prevStage: 259200000,
  },
  {
    stage: 6,
    nextRep: 172800000,
    prevStage: 518400000,
  },
  {
    stage: 7,
    nextRep: 345600000,
    prevStage: 1036800000,
  },
  {
    stage: 8,
    nextRep: 604800000,
    prevStage: 1814400000,
  },
  {
    stage: 9,
    nextRep: 1209600000,
    prevStage: 3628800000,
  },
  {
    stage: 10,
    nextRep: 2419200000,
    prevStage: 7257600000,
  },
  {
    stage: 11,
    nextRep: 4838400000,
    prevStage: 14515200000,
  },
];

const url =
  location.host === "127.0.0.1:8080"
    ? "http://localhost:5000"
    : "https://word-cards-15-12-2019.herokuapp.com";

const hashValues = {
  start: "#start",
  home: "#home",
  module: "#module",
  edit: "#edit",
  flashcards: "#flashcards",
  write: "#write",
};

const publicVapidKey =
  "BO-nIcm9sOZzf2YK6W7YkQsPrxjeFwdjoBfETtk7Fu1WOXNATlphUt1Khu5vwZs9WcI9EbgxwPMUuoFLLgmumMc";

const voice = new Voice();

let device;
let register;
let subscriptionSent = false;
const screenWidth = screen.width;

if (screenWidth < 620) {
  device = "mobile";
} else if (screenWidth < 991) {
  device = "tablet";
} else {
  device = "pc";
}

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

  toggleGameButtons(add, study) {
    let title = document.querySelector(".header__title").classList;
    let btnRegular = document.querySelector(".header__buttons-regular")
      .classList;
    let btnBack = document.querySelector(".header__button-game-back").classList;
    let btnOptions = document.querySelector(".header__button-game-options")
      .classList;
    if (add) {
      title.add("hidden__media-tablet");
      btnRegular.add("hidden__media-tablet");
      btnBack.remove("hidden");
      if (!study) btnOptions.remove("hidden");
    } else {
      title.remove("hidden__media-tablet");
      btnRegular.remove("hidden__media-tablet");
      btnBack.add("hidden");
      btnOptions.add("hidden");
    }
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
    let { url, hash, id } = formatHash();

    let el = document.querySelector(".header__buttons-start");

    if (hash === "start" && !el.classList.contains("hidden")) return;
    el.classList.toggle("hidden");
  },

  regularDashboard() {
    let { url, hash, id } = formatHash();

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

  flashcards(id, number) {
    active = new Flashcards(id, number); // id parameter
  },

  write(id, number) {
    active = new Write(id, number); // id parameter
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
    let httpParam = new HttpParam("GET", false, true);
    let response = await fetch(url + "/home/auth", httpParam);

    if (response.status == 200) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }

  return false;
}

async function log_out() {
  localStorage.removeItem("value");

  location.href = hashValues.start;
}

window.addEventListener("load", async (e) => {
  let { url, hash, id, number } = formatHash();
  number = parseInt(number, 10);

  htmlGen.toggleSpinner(true);

  if (!(await loggedInCheck())) {
    if (hash != "start") {
      location.href = hashValues.start;
    } else {
      hashHandler(hash, id, number);
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
      hashHandler(hash, id, number);
    }
  }
});

window.addEventListener("hashchange", async (e) => {
  let { url, hash, id, number } = formatHash();
  number = parseInt(number, 10);

  htmlGen.toggleSpinner(true);

  if (!(await loggedInCheck())) {
    if (hash != "start") {
      location.href = hashValues.start;
    } else {
      hashHandler(hash, id, number);
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
      hashHandler(hash, id, number);
    }
  }
});

async function hashHandler(hash, id, number) {
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
      htmlGen.flashcards(id, number);
      break;

    case "write":
      htmlGen.regularDashboard();
      htmlGen.write(id, number);
      break;

    case "edit":
      htmlGen.regularDashboard();
      htmlGen.edit(id);
      break;

    default:
  }
}

function formatHash() {
  let result = {};
  let str = location.href;
  let [url, rest] = str.split(/\/#/);
  result.url = url;

  if (!rest) return result;

  let [hash, params] = rest.split("?");

  result.hash = hash;

  if (!params) return result;

  params = params.split("&");
  params.forEach((param) => {
    let [key, value] = param.split("=");
    result[key] = value;
  });

  return result;
}

const spinner = document.querySelector(".spinner__container");
const spinnerBackground = document.querySelector(".spinner__background");
const main = document.querySelector("main");

function reveal() {
  htmlGen.toggleSpinner(true);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function preparePush() {
  if ("serviceWorker" in navigator) {
    if (subscriptionSent) return;

    console.log("preparing push...");

    try {
      register = await navigator.serviceWorker.register("js/worker.js");

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await sendSubscription(subscription);

      subscriptionSent = true;
    } catch (err) {
      console.log(err);
    }
  }
}

async function sendSubscription(subscription) {
  let reqData = {
    device,
    subscription,
  };
  let httpParam = new HttpParam("POST", reqData, true);
  let response = await fetch(url + "/notifications/subscribe", httpParam);

  if (response.ok) {
    let result = JSON.parse(await response.text());
    return result;
  }

  return false;
}
