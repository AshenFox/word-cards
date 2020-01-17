'use strict'

class Edit {
    constructor(id) {

        !id ? this.newModule = true : this.newModule = false;

        this.class = 'edit';

        
        if(this.newModule) {
            this.timer = false;
            htmlGen.hideCreateModule();
        };
        
        this.render(id);
    }

    editHtml() {
        this.html = /*html*/ `
        
        <!-- INTRO -->
            
            <div class="edit__intro">
            <div class="container">
                <div class="edit__intro-content">
                    <div class="edit__intro-info">
                        <h2>${this.newModule ? 'Create a new study set!' : 'Edit the study set! :)'}</h2>
                    </div>
                    <div class="edit__intro-return">
                        <button class="btn bcc-lightblue pad12-30 brr10 white fz15 fw-normal h-grey h-bcc-yellow" type="button" onclick="active.newModule ? htmlGen.home() : htmlGen.module(active._id)">
                            ${this.newModule ? 'Cancel' : 'Return'}
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
                        <div contenteditable="true" class="textarea textarea--module">${this.title ? this.title : ''}</div>
                        <div class="label" id="title-error">TITLE</div>
                    </div>
                </div>
            </div> <!-- container -->
        </div> <!-- edit__module -->

        <!-- CARDS -->

        <div class="edit__cards">
            <div class="container">
                <div class="edit__cards-container">

                </div> <!-- cards__container -->

                <div class="edit__cards-newcard">
                    <button class="btn fz15 uppercase grey h-yellow pad-bot10 br-bottom5 brc-lightblue h-brc-yellow" type="button" onclick="active.addCard()">+ add card</button>
                </div>
            </div> <!-- container -->
            
        </div> <!-- edit__cards -->

        <!-- SAVE -->

        <div class="edit__save">
            <div class="container">
                <div class="edit__save-module">
                    <button class="btn bcc-lightblue pad30-70 brr10 white fz20 fw-bold h-grey h-bcc-yellow" type="button" onclick="active.newModule ? active.saveModule(active._id) : active.edit(active._id)">
                        Save
                    </button>
                </div>
            </div>
            
        </div>`;
    }

    cardHtml({ term = '', defenition = '' }) {
        return {
            class: 'edit__cards-card',
            id: '',
            html: /*html*/`
                
                <div class="edit__cards-header">
                    <div class="edit__cards-number"></div>
                    <div class="edit__cards-delete">
                        <button class="btn">
                            <svg width="17" height="17" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612.002 612.002" style="enable-background:new 0 0 612.002 612.002;" xml:space="preserve">
                                <g>
                                    <path d="M540.346,19.437H389.4C388.323,8.529,379.114,0,367.917,0H244.084c-11.201,0-20.405,8.529-21.489,19.437H71.655
                                        c-11.93,0-21.599,9.669-21.599,21.602v41.036c0,11.934,9.669,21.6,21.599,21.6h468.691c11.93,0,21.599-9.667,21.599-21.6V41.04
                                        C561.945,29.106,552.276,19.437,540.346,19.437z"/>
                                    <path d="M95.34,590.403c0,11.923,9.665,21.599,21.599,21.599h378.127c11.934,0,21.599-9.674,21.599-21.599V145.167H95.34V590.403z
                                        "/>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="edit__cards-items">
                    <div class="edit__cards-term">
                        <div contenteditable="true" class="textarea">${term}</div>
                        <div class="edit__cards-label">TERM</div>
                    </div>

                    <div class="edit__cards-definition">
                        <div contenteditable="true" class="textarea" placeholder="Something">${defenition}</div>
                        <div class="edit__cards-label" for="cards__definition-input1">DEFINITION</div>
                    </div>
                </div>
                
            `,
        }
    }

    async render(id) {
        htmlGen.deleteEl(active.class);

        if (!this.newModule) {
            let response = await this.getModule(id);
            console.log(response);
            Object.assign(this, response);
        } else {
            let response = await this.getModule(id, true);
            console.log(response);
            Object.assign(this, response);
        }
        
        this.editHtml();
        
        let el = htmlGen.createEl(this);

        el.addEventListener('paste', (el) => { // Influences paste on the page
            el.preventDefault();
            let text = (el.originalEvent || el).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, text);
        });

        htmlGen.toggleSpinner();
        document.body.appendChild(el);

        this.titleCont = document.querySelector('.edit__module-title');
        this.cardsCont = document.querySelector('.edit__cards-container');
        this.title_err = document.getElementById('title-error');

        this.titleCont.querySelector('.textarea').addEventListener('input', async (e) => {
            await this.editDraft();
        });

        if(this.cards) {
            this.appendCards(this.cards);
            this.changeNumber();
        } else {
            for (let i = 1; i<=5; i++) {
                this.addCard();
            }
        };
    }

    async addCard(card = {}) {
        let newCard = this.cardHtml(card);

        let el = htmlGen.createEl(newCard);



        this.cardsCont.appendChild(el);

        if(this.cardsCont.children.length > 2) {
            this.toggleDelete(true);
        }

        this.changeNumber();

        el.querySelector('.edit__cards-delete').addEventListener('click', async (e) => {

            if (this.cardsCont.children.length > 2) {

                el.parentNode.removeChild(el);

                this.changeNumber();

                if(this.cardsCont.children.length <= 2) {

                    this.toggleDelete(false);
                };

                if(this.newModule) {
                    
                    await this.editDraft();
                };
            };
            
        });

        if(this.newModule) {
            
            el.querySelector('.edit__cards-term').querySelector('.textarea').addEventListener('input', async (e) => {
                await this.editDraft();
            });

            el.querySelector('.edit__cards-definition').querySelector('.textarea').addEventListener('input', async (e) => {
                await this.editDraft();
            });
        }

        if(this.newModule) {
            
            await this.editDraft();
        };
    }

    appendCards(arr) {
        arr.forEach(card => {
            this.addCard(card);
        });
    }

    changeNumber() {
        let i = 1;
        this.cardsCont.querySelectorAll('.edit__cards-card').forEach((card) => {
            card.querySelector('.edit__cards-number').innerHTML = i;
            i++;
        });
    }

    toggleDelete(opt) {
        this.cardsCont.querySelectorAll('.edit__cards-delete').forEach((deleteBTN) => {
            if(opt) {
                deleteBTN.classList.remove('edit__cards-delete-inactive');
            } else {
                deleteBTN.classList.add('edit__cards-delete-inactive');
            };
        });
    }

    // 

    collectData(titleCont, cardsCont) {
        let title = titleCont.querySelector('.textarea').innerHTML;
        let cards = [...cardsCont.children].map((item => {

            let term = item.querySelector('.edit__cards-term').querySelector('.textarea').innerHTML;
            let defenition = item.querySelector('.edit__cards-definition').querySelector('.textarea').innerHTML;
            return {
                term,
                defenition,
            }
        }));

        return {
            title,
            cards
        }
    }

    async edit(_id) {
        if (await this.isChanged(_id)) {
            
            let reqData = {
                _id,
                module: this.collectData(this.titleCont, this.cardsCont),
            }
            
            let httpParam = new HttpParam('POST', reqData, true);
            let response = await fetch(url + '/edit/edit', httpParam);
            console.log(response.status);

            if(response.status == 200) {
                htmlGen.module(_id);
                return;
            } else if (response.status == 500) {
                this.scrollToTop();
                this.errorTitle(); 
                return;
            }
        }

        htmlGen.module(_id);
        return;
        
    }

    async isChanged(_id) {

        let reqData = {
            _id,
            module: this.collectData(this.titleCont, this.cardsCont),
        }
        
        let httpParam = new HttpParam('POST', reqData, true);
        let response = await fetch(url + '/edit/is_changed', httpParam);
        if (response.status == 200) {
            return true;
        } else {
            return false;
        };
        // return JSON.parse(await response.text());
    }

    async getModule(id, draft) {
        let reqData = {
            id,
            draft,
        }
        let httpParam = new HttpParam('POST', reqData, true);
        let response = await fetch(url + '/edit/get_module', httpParam);
        return JSON.parse(await response.text());
    }

    async saveModule() {
        let reqData = this.collectData(this.titleCont, this.cardsCont);
        console.log(reqData);
        let httpParam = new HttpParam('POST', reqData, true);
        let response = await fetch(url + '/edit/save_module', httpParam);
        console.log(response.status);
        if(response.status == 200) {
            htmlGen.home();
        } else if (response.status == 500) {
            this.scrollToTop();
            this.errorTitle(); 
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    errorTitle() {
        console.log('You must enter the title');
        this.title_err.innerHTML = 'please enter a title to save your set.';
        this.title_err.classList.add("error");
        this.title_err.previousElementSibling.classList.add("error");
    }

    async editDraft() {

        clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
            
            let draftData = this.collectData(this.titleCont, this.cardsCont);
        
            let counter = 0;

            for (let i in draftData.cards) {
                let item = draftData.cards[i];
                if (item.term.length >= 4 || item.defenition.length >= 4) {
                    counter++
                };
                if (counter == 2) break;
            }

            if(counter <2 ) return;

            let reqData = {   
                draftData,
            }
            
            let httpParam = new HttpParam('POST', reqData, true);
            let response = await fetch(url + '/edit/edit_draft', httpParam);
            console.log(response.status);

        }, 1000);
    }
};

