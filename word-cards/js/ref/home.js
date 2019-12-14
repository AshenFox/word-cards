'use strict'

class Home {
    constructor() {
        this.class = 'home';
        this.html = /*html*/ `
        
        <div class="container">

            <div class="home__content">

                <div class="home__navbar">
                    <!-- some content -->
                </div>

                <div class="home__content-header">
                    <div class="home__user-info">

                        <div class="home__nickname">
                            <h1>HoarFox</h1>
                        </div>

                        <div class="home__module-filter">
                            Filter for sorting cards bsaed on date/recency
                        </div>

                    </div>
                </div>

                <div class="home__content-module-cont">

                    <div class="home__module-search">

                        <div class="home__textarea-cont">
                            <div contenteditable="true" class="textarea"></div>
                        </div>
                        
                    </div>

                    <div class="home__modules">


                        <div class="home__module">

                            <div class="home__module-info">

                                <div class="home__term-number">
                                    Terms: 5
                                </div>
                                <div class="home__module-author">
                                    HoarFox
                                </div>

                            </div>

                            <div class="home__module-title">
                                A few words challange 1
                            </div>
                        </div>


                        <div class="home__module">

                            <div class="home__module-info">

                                <div class="home__term-number">
                                    Terms: 5
                                </div>
                                <div class="home__module-author">
                                    HoarFox
                                </div>

                            </div>

                            <div class="home__module-title">
                                A few words challange 1
                            </div>

                        </div>

                        



                    </div>
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