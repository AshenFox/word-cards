'use strict'

class Module {
    constructor(id) {

        if(active.newModule) htmlGen.hideCreateModule();

        this.class = 'module';
        // this.html = /*html*/ `
        
        // `;

        this.render(id);
        
    }

    homeHtml() {
        this.html = /*html*/ `
            <div class="module__header">

            <div class="container">

                <div class="module__header-top">
                    <div class="module__title">
                        <h1>${this.title}</h1>
                    </div>
                    <div class="module__return">
                        <button class="btn bcc-lightblue pad12-30 brr10 white fz15 fw-normal h-grey h-bcc-yellow" onclick="htmlGen.home()">
                            Return
                        </button>
                    </div>

                </div>

                

                <div class="module__study">

                    <div class="module__study-title">
                        STUDY:
                    </div>

                    <div class="module__study-item">
                        <button class="btn" onclick="htmlGen.game();">
                            <svg height="31" width="31" viewBox="0 0 315.944 315.943">
                                <g>
                                    <path d="M198.587,206.706c0.231,0.031,0.464,0.047,0.696,0.047c0.774,0,1.539-0.168,2.246-0.49l111.254-50.746
                                        c2.305-1.047,3.564-3.552,3.043-6.033c-0.527-2.473-2.7-4.253-5.231-4.282c-0.907-0.011-90.988-1.928-130.961-81.815
                                        c-3.775-7.539-13.067-12.042-21.097-10.115L65.675,75.646c-4.482,1.081-8.052,3.937-9.79,7.831
                                        c-1.701,3.807-1.463,8.234,0.648,12.149C72.663,125.579,118.8,196.349,198.587,206.706z M65.739,87.882
                                        c0.364-0.81,1.26-1.448,2.463-1.732l92.865-22.373c0.459-0.113,0.949-0.169,1.45-0.169c2.984,0,6.117,1.943,7.456,4.617
                                        c30.987,61.923,89.817,80.18,120.604,85.554l-92.121,42.021c-73.915-10.421-117.192-76.998-132.43-105.29
                                        C65.67,89.831,65.325,88.821,65.739,87.882z"/>
                                    <rect y="251.726" width="196.331" height="11.385"/>
                                    <polygon points="310.542,212.739 310.542,201.358 199.262,251.726 199.262,263.116 		"/>
                                    <path d="M310.542,197.383h-28.931l-83.014,39.624l-3.618,0.016c-50.195,0-90.624-8.88-120.849-19.311L0,247.586h196.673
                                        L310.542,197.383z"/>
                                    <path d="M21.146,181.398c21.574,13.632,81.923,45.331,176.217,44.788l109.877-52.445c0,0-5.922,0.032-15.625-0.253l-93.894,42.831
                                        l-1.534-0.2c-53.687-6.972-92.027-41.212-116.105-71.542l-57.997,26.259C16.654,173.299,16.103,178.214,21.146,181.398z"/>
                                </g>
                            </svg>
                            <span>Flashcards</span>
                        </button>
                    </div> 
                    <div class="module__study-item">
                        <button class="btn">
                        <svg height="30" width="30" viewBox="0 0 25.588 25.588">
                            <g>
                                <path d="M18.724,9.903l3.855,1.416l-3.206,8.729c-0.3,0.821-1.927,3.39-3.06,3.914l-0.275,0.75
                                    c-0.07,0.19-0.25,0.309-0.441,0.309c-0.054,0-0.108-0.01-0.162-0.029c-0.243-0.09-0.369-0.359-0.279-0.604l0.26-0.709
                                    c-0.575-1.117-0.146-4.361,0.106-5.047L18.724,9.903z M24.303,0.667c-1.06-0.388-2.301,0.414-2.656,1.383l-2.322,6.326l3.854,1.414
                                    l2.319-6.325C25.79,2.673,25.365,1.056,24.303,0.667z M17.328,9.576c0.108,0.04,0.219,0.059,0.327,0.059
                                    c0.382,0,0.741-0.234,0.882-0.614l2.45-6.608c0.181-0.487-0.068-1.028-0.555-1.208c-0.491-0.178-1.028,0.068-1.209,0.555
                                    l-2.45,6.608C16.592,8.855,16.841,9.396,17.328,9.576z M13.384,21.967c-0.253-0.239-0.568-0.537-1.078-0.764
                                    c-0.42-0.187-0.829-0.196-1.128-0.203c-0.031,0-0.067-0.001-0.103-0.002c-0.187-0.512-0.566-0.834-1.135-0.96
                                    c-0.753-0.159-1.354,0.196-1.771,0.47c0.037-0.21,0.098-0.46,0.143-0.64c0.144-0.58,0.292-1.18,0.182-1.742
                                    c-0.087-0.444-0.462-0.774-0.914-0.806c-1.165-0.065-2.117,0.562-2.956,1.129c-0.881,0.595-1.446,0.95-2.008,0.749
                                    c-0.686-0.244-0.755-2.101-0.425-3.755c0.295-1.49,0.844-4.264,2.251-5.524c0.474-0.424,1.16-0.883,1.724-0.66
                                    c0.663,0.26,1.211,1.352,1.333,2.653c0.051,0.549,0.53,0.952,1.089,0.902c0.55-0.051,0.954-0.539,0.902-1.089
                                    c-0.198-2.12-1.192-3.778-2.593-4.329C6.058,7.07,4.724,6.982,3.107,8.429c-1.759,1.575-2.409,4.246-2.88,6.625
                                    c-0.236,1.188-0.811,5.13,1.717,6.029c1.54,0.549,2.791-0.298,3.796-0.976c0.184-0.124,0.365-0.246,0.541-0.355
                                    c-0.167,0.725-0.271,1.501,0.167,2.155c0.653,0.982,1.576,1.089,2.742,0.321c0.045-0.029,0.097-0.063,0.146-0.097
                                    c0.108,0.226,0.299,0.475,0.646,0.645c0.42,0.206,0.84,0.216,1.146,0.224c0.131,0.003,0.31,0.007,0.364,0.031
                                    c0.188,0.083,0.299,0.185,0.515,0.389c0.162,0.153,0.333,0.312,0.55,0.476c0.18,0.135,0.39,0.199,0.598,0.199
                                    c0.304,0,0.605-0.139,0.801-0.4c0.331-0.442,0.241-1.069-0.201-1.4C13.61,22.183,13.495,22.072,13.384,21.967z"/>
                            </g>
                        </svg>
                        <span>Write</span>
                        </button>
                    </div> 

                </div>

                <div class="module__info">
                    <div class="module__author">
                        <span class="module__author-created">Created by:</span>
                        <span class="module__author-nickname">${this.author}</span>
                    </div>

                    <div class="module__nav">
                        <div id="edit-item" class="module__nav-item">
                            
                            <svg width="25" height="25" viewBox="0 0 528.899 528.899">
                                <g>
                                    <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
                                        c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
                                        C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
                                        L27.473,390.597L0.3,512.69z"/>
                                </g>
                            </svg>
                        </div>
                        <div id="remove-item" class="module__nav-item">
                            <svg width="25" height="25" viewBox="0 0 612.002 612.002">
                                <g>
                                    <path d="M540.346,19.437H389.4C388.323,8.529,379.114,0,367.917,0H244.084c-11.201,0-20.405,8.529-21.489,19.437H71.655
                                        c-11.93,0-21.599,9.669-21.599,21.602v41.036c0,11.934,9.669,21.6,21.599,21.6h468.691c11.93,0,21.599-9.667,21.599-21.6V41.04
                                        C561.945,29.106,552.276,19.437,540.346,19.437z"/>
                                    <path d="M95.34,590.403c0,11.923,9.665,21.599,21.599,21.599h378.127c11.934,0,21.599-9.674,21.599-21.599V145.167H95.34V590.403z
                                        "/>
                                </g>
                            </svg>

                        </div>

                    </div>
                </div>

            </div>
        </div>


        <div class="module__body">


            <div class="container">

                <div class="module__param">
                    <div class="module__count">
                        <span>Terms in this set (</span>
                        <span id="module__counter">${this.number}</span>
                        <span>)</span>
                    </div>

                    <div class="module__filter">
                        <input type="text" class="input pad5 fz17 height4r br-bottom2 bc-none brc-grey f-brc-yellow" placeholder="Type to filter ...">
                    </div>
                </div>

                <div class="module__card-cont">

                </div>

            </div>

        </div>
        `;
    }

    cardHtml({ term, defenition }) {
        return {
            class: 'module__card',
            id: '',
            html: /*html*/`
                <div class="module__card-term">
                    ${term}
                </div>
                <div class="module__card-definition">
                    ${defenition}
                </div>
            `
        }
    }

    nonefoundHtml({value}) {
        return {
            class: 'module__none-found',
            id: '',
            html: /*html*/`
            <p>No cards matching <b>'${value}'</b> found</p>
            `
        }
    }

    appendCards(arr) {

        let html;
        arr.forEach(item => {

            if(typeof item.term == 'string') {
                html = this.cardHtml(item);
            } else {
                html = this.nonefoundHtml(item);
            };
    
            let el = htmlGen.createEl(html);
            this.cardsContainer.appendChild(el);
        });
    }

    async render(id) {

        htmlGen.deleteEl(active.class);

        let response = await this.getModule(id);
        Object.assign(this, response);
        this.homeHtml();

        let el = htmlGen.createEl(this);

        htmlGen.toggleSpinner();
        document.body.appendChild(el);
        this.cardsContainer = document.querySelector('.module__card-cont');
        this.matchFilter = document.querySelector('.module__filter');

        this.filterTimeout = false;

        let edit = document.getElementById('edit-item');
        let remove = document.getElementById('remove-item');

        edit.addEventListener('click', () => {
            htmlGen.edit(this._id);
        });

        remove.addEventListener('click', () => {
            htmlGen.delete();
        });

        

        this.matchFilter.addEventListener('input', (e) => {
            clearTimeout(this.filterTimeout);

            this.filterTimeout = setTimeout(() => {

                this.cardsContainer.innerHTML = '';

                let result;

                if(e.target.value != '') {

                    if (!this.findMatch(e.target.value)) {

                        this.filteredCards = [
                            {
                                value: e.target.value,
                            }
                        ]
                    }

                    result = this.filteredCards
                    
                } else {
                    result = this.cards;
                }

                this.appendCards(result);

                // if(this.findMatch(e.target.value)) {

                //     this.appendCards(this.filteredCards);

                // } else {
                    
                //     this.appendCards(this.cards);
                // }

            }, 800);

        });

        this.appendCards(this.cards);
    }

    findMatch(value) {
        
        value = value.toLowerCase();

        let result = false;
        
        this.filteredCards = this.cards.filter(card => {
            if (card.term.toLowerCase().indexOf(value) != -1) {
                result = true;
                return true;
            }
            return false;
        }).map(card => {
            let newCard = Object.assign({}, card);
            let regExp = new RegExp(`${value}`, 'g');
            let replacement = `<span class='bcc-yellow'>${value}</span>`;
            newCard.term = newCard.term.replace(regExp, replacement);
            return newCard;
        });

        return result;
    }

    // findMatch(value) {
    //     if (value == '') return false;
        
    //     value = value.toLowerCase();
        
    //     this.filteredCards = this.cards.filter(card => {
    //         if (card.term.toLowerCase().indexOf(value) != -1) return true;
    //         return false;
    //     }).map(card => {
    //         let newCard = Object.assign({}, card);
    //         let regExp = new RegExp(`${value}`, 'g');
    //         let replacement = `<span class='bcc-yellow'>${value}</span>`;
    //         newCard.term = newCard.term.replace(regExp, replacement);
    //         return newCard;
    //     });

    //     return true;
    // }
    
    async deleteModule(_id) {
        let reqData = {
            _id,
        }
        let httpParam = new HttpParam('POST', reqData, true);
        let response = await fetch(url + '/edit/delete', httpParam);
        htmlGen.home();
    }

    async getModule(id) {
        let reqData = {
            id,
        }
        let httpParam = new HttpParam('POST', reqData, true);
        let response = await fetch(url + '/edit/get_module', httpParam);
        return JSON.parse(await response.text());
    }

    
    
};