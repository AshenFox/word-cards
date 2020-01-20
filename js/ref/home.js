'use strict'

class Home {
    constructor() {

        if(active.newModule) htmlGen.hideCreateModule();

        this.class = 'home'; 
        this.render();
    }

    moduleHtml({ author, number, title, draft }) {
        return {
            class: 'home__module',
            id: '',
            html: /*html*/`
                <div class="home__module-info">

                    <div class="home__term-number">
                        ${number} Terms
                    </div>

                    ${draft ? '' : `<div class="home__module-author">${author}</div>`}
                    
                </div>

                <div class="home__module-title ${draft ? 'blue' : ''}">
                    ${draft ? '(Draft)' : title}
                </div>
            `
        }
    }

    separatorHtml(separatorName) {
        return {
            class: 'home__divider',
            id: '',
            html: /*html*/`
            <div class="home__divider-text">${separatorName}</div>
            <div class="home__divider-line"></div>
            `
        }
    }

    homeHtml() {
        this.html = /*html*/ `
        
        <div class="container">

            <div class="home__content">

                <div class="home__content-header">
                    <div class="home__user-info">

                        <div class="home__nickname">
                            <h1>${this.username}</h1>
                        </div>

                        <div class="home__filter-container">
                            <ul class="home__filter">
                                <li class="home__filter-item active">Recent</li>
                                <li class="home__filter-item">Created</li>
                                <li class="home__filter-item">Studied</li>
                                
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="home__content-module-cont">

                    <div class="home__module-search">

                        <div class="home__textarea-cont">
                            <input type="text" class="input pad5 fz17 height4r br-bottom2 bc-none brc-grey f-brc-yellow" placeholder="Type to filter ...">
                        </div>
                        
                    </div>

                    <div class="home__modules">

                    </div>
                </div>
            </div>
        </div>`;
    }

    appendModules(arr) {

        let newSeparator = this.separatorHtml('created');
        let elSeparator = htmlGen.createEl(newSeparator);
        this.moduleContainer.insertBefore(elSeparator, this.moduleContainer.firstChild);

        arr.forEach(module => {
            let id = module._id;
            let newModule = this.moduleHtml(module);
            let el = htmlGen.createEl(newModule);

            el.dataset.id = id;
            this.moduleListener(el, module.draft);

            if(module.draft) {
                this.moduleContainer.insertBefore(el, this.moduleContainer.firstChild);
                let newSeparator = this.separatorHtml('in progress');
                let elSeparator = htmlGen.createEl(newSeparator);
                this.moduleContainer.insertBefore(elSeparator, this.moduleContainer.firstChild);
            } else {
                this.moduleContainer.appendChild(el);
            }
            
        });
    }

    moduleListener(module, draft) {

        

        module.addEventListener('click', async (e) => {
            let id = e.currentTarget.dataset.id

            draft ? htmlGen.edit() : htmlGen.module(id);

            
        })
    }
    
    async render() {
        htmlGen.deleteEl(active.class);

        let response = await this.getUserData();
        

        this.username = response.username;
        this.modules = response.modules;

        this.homeHtml();
        
        let el = htmlGen.createEl(this);

        
        htmlGen.toggleSpinner();
        document.body.appendChild(el);

        this.moduleContainer = document.querySelector('.home__modules');

        this.appendModules(this.modules);
    }


    async getUserData() {
        let httpParam = new HttpParam('GET', false, true);
        let response = await fetch(url + '/home/get_user_data', httpParam);
        return JSON.parse(await response.text());
    }
};