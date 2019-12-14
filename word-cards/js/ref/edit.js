'use strict'

class Edit {
    constructor() {
        this.class = 'edit';
        this.html = /*html*/ `
        
        <!-- INTRO -->
            
            <div class="edit__intro">
            <div class="container">
                <div class="edit__intro-content">
                    <div class="edit__intro-info">
                        <h2>Create a new study set</h2>
                    </div>
                    <div class="edit__intro-savemodule">
                        <button class="btn btn__save btn__save--sm" type="button" onclick="card.submitModule(card.module);">
                            Create
                        </button>
                    </div>
                </div>
            </div> <!-- container -->
        </div> <!-- edit__intro -->

        <!-- MODULE -->

        <div class="edit__module">

            <div class="container">
                <div class="edit__module-content">
                    <div class="edit__module-title">
                        <div contenteditable="true" class="textarea textarea--module"></div>
                        <div class="label">TITLE</div>
                    </div>
                </div>
            </div> <!-- container -->
        </div> <!-- edit__module -->

        <!-- CARDS -->

        <div class="edit__cards">
            <div class="container">
                <div class="edit__cards-container">

                    <!-- <div class="cards__card">

                        <div class="cards__header">
                            <div class="cards__number">1</div>
                            <div class="cards__delete">Delete BTN</div>
                        </div>

                        <div class="cards__items">
                            <div class="cards__term">
                                <div contenteditable="true" class="textarea"></div>
                                <div class="cards__label">TERM</div>
                            </div>

                            <div class="cards__definition">
                                <div contenteditable="true" class="textarea" placeholder="Something"></div>
                                <div class="cards__label" for="cards__definition-input1">DEFINITION</div>
                            </div>
                        </div>
                    </div> -->

                </div> <!-- cards__container -->

                <div class="edit__cards-newcard">
                    <button class="btn btn--newcard" type="button" onclick="card.addCardItem()">+ add card</button>
                </div>
            </div> <!-- container -->
            
        </div> <!-- edit__cards -->

        <!-- SAVE -->

        <div class="edit__save">
            <div class="container">
                <div class="edit__save-module">
                    <button class="btn btn__save" type="button" onclick="card.submitModule(card.module);">
                        Create
                    </button>
                </div>
            </div>
            
        </div>`;

        this.render();
    }

    render() {
        htmlGen.deleteEl('start');
        
        let el = htmlGen.createEl(this);

        document.body.appendChild(el);
    }
    
};


// let url = "http://localhost:5000/";

// class Card {
//     constructor () {
//         this.cardamount = 1;
//         this.module;
//         this.addCardItem();
//     }

//     addCardItem() {
//         let item = htmlGen.cardItem(this.cardamount);
//         this.cardamount++;
//         this.preventDeafult(item);
//         this.activateDeleteBTN(item);
//         cardsContainer.appendChild(item);
//     }


//     preventDeafult(el) {

//         el.addEventListener('paste', (el) => {
//             el.preventDefault();
//             let text = (el.originalEvent || el).clipboardData.getData('text/plain');
//             document.execCommand("insertHTML", false, text);
//         });
//     }

//     activateDeleteBTN(el) {

//         let btn = el.querySelector(".edit__cards-delete");
//         btn.addEventListener('click',() => {
//             el.remove();

//             this.cardamount--;
//             let numbers = [...document.getElementsByClassName('edit__cards-number')];
//             let counter = 1;
//             numbers.map((el) => {
//                 el.innerHTML = counter;
//                 counter++;
//             });

//         });
//     }

//     saveModule() {
        
//         const cardsArr = cardsContainer.getElementsByClassName("edit__cards-card");
//         const title = document.querySelector('.edit__module-title').querySelector('.textarea').textContent;

//         let counter = 1;
//         const cards = [...cardsArr].map((card) => {

//             let term = card.querySelector(".edit__cards-term");
//             let definition = card.querySelector(".edit__cards-definition");

//             return {
//                 id: counter++,
//                 term: term.querySelector(".textarea").textContent,
//                 definition: definition.querySelector(".textarea").textContent
//             }
//         });

//         let data = {
//             title,
//             cards,
//             author: '',
//         }

//         this.module = data;
//     }

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

//     async submitDraft() {

//         this.saveModule(cardsContainer);

//         let bodyParam = {
//             method: 'draftModuleSubmition'
//         }

//         let httpParam = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'text/plain'
//             },
//             body: JSON.stringify({
//                 param: bodyParam,
//                 module: this.module,
//             }),
//         }

//         let response = await fetch(url, httpParam);
//         let text = await response.text();

//         setTimeout(this.submitDraft.bind(card), 180000);
//     }

//     // async fetchData () {
//     //     let response = await fetch(url);
//     //     let text = await response.text();
//     //     console.log(text);
//     // }
    
    
// };

// const cardsContainer = document.querySelector(".edit__cards-container");

// const htmlGen = new HTMLgen();
// const card = new Card();

// card.submitDraft();


















// const textAreas = [...document.getElementsByClassName("cards__card")];
// textAreas.map(card.preventDeafult);


// console.log(textAreas);




// async function fetchData () {
//     let response = await fetch(url);
//     text = await response.text();
//     console.log(text);
// }

// async function sendData () {
//     let word = document.getElementById('cards__word-input1').value,
//         def = document.getElementById('cards__definition-input1').value;
    
//     let pair = { word, def };
//     console.log(JSON.stringify(pair));
//     console.log(pair);

//     let param = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/plain'
//         },
//         body: JSON.stringify(pair),
//     }

//     console.log(param.body);

//     let response = await fetch(url, param);
//     text = await response.text();

//     console.log(text);

// }