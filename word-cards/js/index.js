'use strict'

let active = { empty: true };
let modal = false;

const url = 'https://word-cards-15-12-2019.herokuapp.com'// 'http://localhost:5000'



const htmlGen = {

    menuListner: false,

    deleteEl(el) {
        let target = document.querySelector(`.${el}`);
        if(target) {
            target.parentNode.removeChild(target);
        }  
    },

    createEl(type) {
        let el = document.createElement('div');
        el.className = type.class;
        el.id = type.id;
        el.innerHTML = type.html;
        return el;
    },

    hideCreateModule() {
        let regularBTN = document.getElementById('new-module-regular');
        let menuBTN = document.getElementById('new-module-menu');
        regularBTN.classList.toggle("hidden");
        menuBTN.classList.toggle("hidden");
    },

    toggleHeaderMenu() {
        let headerMenuBtn = document.querySelector('.header__menu');
        headerMenuBtn.classList.remove("hidden");
        
        let listnerFunction = (e) => {
            let headerMenuBtn = document.querySelector('.header__menu');
            headerMenuBtn.classList.add("hidden");  
            this.menuListner = false;
            document.body.removeEventListener('click', listnerFunction);
            
        };
        
        if(!this.menuListner) {

            this.menuListner = true;

            setTimeout(() => { document.body.addEventListener('click', listnerFunction) }, 0);

        };
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
        let spinner =  document.querySelector('.spinner__container');
        spinner.classList.toggle('hidden');
    },

    start() {
        if(!active.empty) {
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
        if(!active.empty) {
            this.toggleSpinner();
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
};

class HttpParam {

    constructor(method, data, cred) {

        this.method = method;
        this.headers = {
            'Content-Type': 'text/plain'
        };
        if (data) this.body = JSON.stringify(data);
        if (cred) this.credentials = "include";
    }
};

async function loggedInCheck() {
    try {

        let httpParam = new HttpParam('GET', false, true);
        htmlGen.toggleSpinner();
        let response = await fetch(url + '/home/auth', httpParam);

        console.log(response);
        if(response.status == 200) {
            htmlGen.regularDashboard();
            htmlGen.home();
        } else {
            htmlGen.startDashboard();
            htmlGen.start();
        }

    } catch(err) {
        // add connection with the server is absent message
        console.log(err);
        htmlGen.startDashboard();
        htmlGen.start();
    }
};

async function log_out() { // add a cookie deletion
    let httpParam = new HttpParam('GET', false, true);
    let response = await fetch(url + '/home/log-out', httpParam);
    console.log(response.status);
    htmlGen.regularDashboard();
    htmlGen.startDashboard();
    htmlGen.start();
};




loggedInCheck();






















// let url1 = 'http://localhost:5000/'
// let url2 = 'http://localhost:5000/sign_up/test'

// async function fetchData(url) {

//     let httpParam = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/plain'
//         },
//         body: JSON.stringify({
//             username: 'HoarFox',
//         }),
//     }
    
//     let response = await fetch(url, httpParam);
//     let text = JSON.parse(await response.text());
//     // let text = await response.text();
//     console.log(text);
// }

//     async submitModule(data) {  
        
//         this.saveModule(cardsContainer);

//         let bodyParam = {
//             method: 'moduleSubmition'
//         }

//         let httpParam = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'text/plain'
//             },
//             body: JSON.stringify({
//                 param: bodyParam,
//                 module: data,
//             }),
//         }

//         let response = await fetch(url, httpParam);
//         let text = await response.text();

//         console.log(text);
//     }








