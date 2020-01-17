'use strict'

class Start {
    constructor() {

        if(active) {
            if(active.newModule) htmlGen.hideCreateModule();
        }
        
        this.class = 'start';
        this.id = '';
        this.el;

        this.html = /*html*/
        `
        <div class="container">
            <div class="start__content">

                <div class="start__intro">
                    <div class="start__welcome">
                            <h1>Welcome to Flash Cards</h1>
                    </div>
                    <button class="btn bcc-lightblue pad30-50 brr5 white fz175 h-grey h-bcc-yellow" onclick="htmlGen.log_in()">Get started</button>
                </div>
                <!-- <div class="start__img">
                    <img src="" alt="">
                </div> -->

            </div>
        </div>
        `
        this.render();

    }

    render() {

        if(active) {
            htmlGen.deleteEl(`${active.class}`);
        }
        
        
        let el = htmlGen.createEl(this);

        htmlGen.toggleSpinner();
        document.body.appendChild(el);
    }
}