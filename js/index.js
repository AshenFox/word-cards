'use strict'

let active;


const url = 'https://word-cards-15-12-2019.herokuapp.com';
const htmlGen = {

    deleteEl(el) {
        let target = document.querySelector(`.${el}`);
        target.parentNode.removeChild(target);
    },

    createEl(type) {
        let el = document.createElement('div');
        el.className = type.class;
        el.id = type.id;
        el.innerHTML = type.html;
        return el;
    },

    log_in() {
        active = new Log_in();
    },

    sign_up() {   
        active = new Sign_up();
    },

    home() {
        active = new Home();
    },

    module() {
        active = new Module();
    },

    edit() {
        active = new Edit();
    },

    









    // cardItem(num) {
    //     let el = document.createElement('div');
    //     el.className = 'edit__cards-card';
    //     el.innerHTML = `
    //         <div class="edit__cards-header">
    //             <div class="edit__cards-number">${num}</div>
    //             <div class="edit__cards-delete">Delete BTN</div>
    //         </div>

    //         <div class="edit__cards-items">
    //             <div class="edit__cards-term">
    //                 <div contenteditable="true" class="textarea"></div>
    //                 <div class="edit__cards-label">TERM</div>
    //             </div>

    //             <div class="edit__cards-definition">
    //                 <div contenteditable="true" class="textarea" placeholder="Something"></div>
    //                 <div class="edit__cards-label" for="edit__cards-definition-input1">DEFINITION</div>
    //             </div>
    //         </div>
    //     `;

    //     this.cardamount++;
    
    //     return el;
    // }
};






















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








