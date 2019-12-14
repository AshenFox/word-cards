'use strict'

class Module {
    constructor() {
        this.class = 'module';
        this.html = /*html*/ `
        
        <div class="module__header">

            <div class="container">

                <div class="module__title">

                    <h1>A few words challange 1</h1>
                    
                </div>

                <div class="module__study">

                    <div class="module__study-title">
                        STUDY
                    </div>

                    <div class="module__flashcards">
                        <button class="btn">
                            Flashcards
                        </button>
                    </div> 
                    <div class="module__write">
                        <button class="btn">
                            Write
                        </button>
                    </div> 

                </div>

                <div class="module__info">
                    <div class="module__author">
                        Created by: HoarFox
                    </div>

                    <div class="module__nav">

                        <div class="module__edit">
                            <button class="btn">
                                Edit
                            </button>
                        </div>
                        <div class="module__delete">
                            <button class="btn">
                                Delete
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>


        <div class="module__body">


            <div class="container">

                <div class="module__param">
                    <div class="module__count">
                        <h2>Terms in this set(n)</h2>
                    </div>

                    <div class="module__filter">
                        Filter<!-- Filter cards in a certain manner -->
                    </div>
                </div>

                <div class="module__card-cont">

                    <div class="module__card">
                        <div class="module__card-term">
                            condescending
                        </div>
                        <div class="module__card-definition">
                            Don't be ... ( treating someone as if you are more important or more intelligent than them )
                        </div>
                    </div>

                    <div class="module__card">
                        <div class="module__card-term">
                            white count
                        </div>
                        <div class="module__card-definition">
                            ... is elevatied but within range ( the total number of the white blood cells in blood usually stated as the number in one cubic millimeter )( a calculation, esp. a scientific one, of the number of units in a group )
                        </div>
                    </div>

                    <div class="module__card">
                        <div class="module__card-term">
                            to double up
                        </div>
                        <div class="module__card-definition">
                            Dude ... on me / Matt Damon doubled up, winning two Oscars that night ( to receive or use two of something )
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