class Game {
  constructor() {
    if (active.newModule) htmlGen.hideCreateModule();

    this.class = "game";
    this.render();
  }

  gameHtml() {
    this.html = /*html*/ `
        
        <div class="container">
            <div class="game__main">

                <div class="game__controls-container">

                    <div class="game__controls">

                        <div class="game__back">
                            <button class="btn grey ai-c ta-l fz17 width100 pad15-20 h-bcc-yellow" onclick="location.href = hashValues.home">
                                <svg height="15" width="15" viewBox="0 0 490.661 490.661">
                                    <g>
                                        <g>
                                            <path d="M453.331,1.424c-3.307-1.899-7.381-1.899-10.688,0L37.309,236.091c-3.285,1.92-5.312,5.44-5.312,9.237
                                                s2.027,7.317,5.312,9.237l405.333,234.667c1.664,0.96,3.499,1.429,5.355,1.429c1.835,0,3.691-0.469,5.333-1.429
                                                c3.285-1.899,5.333-5.419,5.333-9.237V10.661C458.664,6.843,456.616,3.323,453.331,1.424z"/>
                                        </g>
                                    </g>
                                </svg>
                                <span>Back</span>
                                
                            </button>
                        </div>

                        <div class="game__title">
                        
                            <svg height="40" width="40" viewBox="0 0 315.944 315.943">
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
                        
                        </div>


                        <div class="game__progress">
                            <div class="game__progress-bar">
                                <div class="game__bar-fill"></div>
                            </div>
                            <div class="game__progress-info">

                                <div class="game__progress-title">
                                    <span>progress</span>
                                </div>

                                <div class="game__progress-count">
                                    <span>3</span><span>/6</span>
                                </div>

                            </div>
                        </div>

                        <div class="game__control-buttons">

                            <div class="game__method">
                                <div class="game__method-tilte">
                                    Answer with:
                                </div>
                                <button class="btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow" onclick="active.methodMenuToggle();">
                                    
                                    <svg height="13" width="13" viewBox="0 0 512 512" >
                                        <g>
                                            <path d="M506.157,132.386c-7.803-7.819-20.465-7.831-28.285-0.029l-207.73,207.299c-7.799,7.798-20.486,7.797-28.299-0.015
                                                L34.128,132.357c-7.819-7.803-20.481-7.79-28.285,0.029c-7.802,7.819-7.789,20.482,0.029,28.284l207.701,207.27
                                                c11.701,11.699,27.066,17.547,42.433,17.547c15.358,0,30.719-5.846,42.405-17.533L506.128,160.67
                                                C513.946,152.868,513.959,140.205,506.157,132.386z"/>
                                        </g>
                                    </svg>
                                    <span>Term</span>

                                    
                                    
                                </button>
                                <div class="game__method-menu-container hidden">
                                    <div class="game__method-menu">
                                        <div class="game__method-menu-item">
                                            <span>Term</span>
                                        </div>
                                        <div class="game__method-menu-item">
                                            <span>Defenition</span>
                                        </div>
                                    </div>
                                </div>

                                
                                
                            </div>

                            <div class="game__shuffle">
                                <button class="btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow" onclick="active.toggleShuffle(active.cardShuffle);">

                                    <svg height="20" width="20" viewBox="0 0 512 512">
                                        
                                        <g>
                                            <path d="M506.24,371.7l-96-80c-4.768-4-11.424-4.8-17.024-2.208c-5.632,2.656-9.216,8.288-9.216,14.496v48h-26.784
                                                c-22.208,0-42.496-11.264-54.272-30.08l-103.616-165.76c-23.52-37.664-64.096-60.16-108.544-60.16H0v64h90.784
                                                c22.208,0,42.496,11.264,54.272,30.08l103.616,165.76c23.552,37.664,64.128,60.16,108.544,60.16H384v48
                                                c0,6.208,3.584,11.84,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.248,10.24-3.712l96-80
                                                c3.68-3.04,5.76-7.552,5.76-12.288C512,379.252,509.92,374.74,506.24,371.7z"/>
                                        </g>
                                        <g>
                                            <path d="M506.24,115.7l-96-80c-4.768-3.968-11.424-4.8-17.024-2.176C387.584,36.116,384,41.78,384,47.988v48h-26.784
                                                c-44.448,0-85.024,22.496-108.544,60.16l-5.792,9.28l37.728,60.384l22.336-35.744c11.776-18.816,32.064-30.08,54.272-30.08H384v48
                                                c0,6.208,3.584,11.872,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.28,10.24-3.712l96-80
                                                c3.68-3.04,5.76-7.552,5.76-12.288C512,123.252,509.92,118.74,506.24,115.7z"/>
                                        </g>
                                        <g>
                                            <path d="M167.392,286.164l-22.304,35.744c-11.776,18.816-32.096,30.08-54.304,30.08H0v64h90.784
                                                c44.416,0,84.992-22.496,108.544-60.16l5.792-9.28L167.392,286.164z"/>
                                        </g>
                                        
                                    </svg>
                                    <span>Shuffle</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div class="game__content-container">

                    <div class="game__content">

                        <div class="game__components">


                            <div class="game__cards-container">

                                <div class="game__card">
                                    <div class="game__card-front prev transparent">
                                        <div class="game__img-container">
                                            <div class="game__img" style="background-image: url(https://img.huffingtonpost.com/asset/5dcc613f1f00009304dee539.jpeg?cache=QaTFuOj2IM&ops=crop_834_777_4651_2994%2Cscalefit_720_noupscale);"></div>
                                        </div>

                                        <div class="game__defenition-container">
                                            <div class="game__defenition">
                                                <p>
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit ipsum esse, nobis facilis sapiente doloribus impedit beatae laudantium sed atque animi rerum recusandae molestiae maxime nostrum similique suscipit culpa explicabo.
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="game__card-back rearside prev transparent">
                                        <div class="game__term">
                                            <p>Cat</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="game__card">
                                    <div class="game__card-front">
                                        <div class="game__img-container">
                                            <div class="game__img" style="background-image: url(https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687);"></div>
                                        </div>

                                        <div class="game__defenition-container">
                                            <div class="game__defenition">
                                                <p>
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit ipsum esse, nobis facilis sapiente doloribus impedit beatae laudantium sed atque animi rerum recusandae molestiae maxime nostrum similique suscipit culpa explicabo.
                                                    
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="game__card-back rearside">
                                        <div class="game__term">
                                            <p>Turquoise</p>
                                        </div>
                                    </div>
                                </div>

                                

                                <div class="game__card">

                                    <div class="game__card-front next transparent">
                                        <div class="game__img-container">
                                            <div class="game__img" style="background-image: url(https://www.billboard.com/files/styles/article_main_image/public/media/Billie-Eilish-bb12-2019-feat-billboard-strgoia-1548.jpg);"></div>
                                        </div>

                                        <div class="game__defenition-container">
                                            <div class="game__defenition">
                                                <p>
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit ipsum esse, nobis facilis sapiente doloribus impedit beatae laudantium sed atque animi rerum recusandae molestiae maxime nostrum similique suscipit culpa explicabo.
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="game__card-back rearside next transparent">
                                        <div class="game__term">
                                            <p>Billie Eilish</p>
                                        </div>
                                    </div>

                                </div>

                                <div class="game__card">

                                    <div class="game__card-front unturnable next transparent">
                                        <h1 class="game__card-message">Nice work!</h1>
                                        <p class="game__card-message-info">You've just studied 3 terms!</p>
                                        <button class="btn bcc-lightblue pad30 brr5 white fz175 h-grey h-bcc-yellow width50">Finish up</button>
                                    </div>

                                    <div class="game__card-back unturnable rearside next transparent">
                                        
                                    </div>

                                </div>



                            
                            </div>

                            <div class="game__nav">

                                <div class="game__nav-item prev">
                                    <button class="btn pad15 bcc-white brr50p d-f h-bcc-yellow mar-left-a p-r" onclick="active.switchCard(false)">
                                        <svg viewBox="0 0 490.661 490.661">
                                            
                                            <path d="M453.331,1.424c-3.307-1.899-7.381-1.899-10.688,0L37.309,236.091c-3.285,1.92-5.312,5.44-5.312,9.237
                                                s2.027,7.317,5.312,9.237l405.333,234.667c1.664,0.96,3.499,1.429,5.355,1.429c1.835,0,3.691-0.469,5.333-1.429
                                                c3.285-1.899,5.333-5.419,5.333-9.237V10.661C458.664,6.843,456.616,3.323,453.331,1.424z"/>
                                                
                                        </svg>
                                    </button>
                                </div>

                                <div class="game__nav-item next">
                                    <button class="btn pad15 bcc-white brr50p d-f h-bcc-yellow p-r" onclick="active.switchCard(true)">
                                        <svg viewBox="0 0 490.661 490.661">
                                            
                                            <path d="M453.352,236.091L48.019,1.424c-3.285-1.899-7.36-1.899-10.688,0c-3.285,1.899-5.333,5.419-5.333,9.237v469.333
                                                c0,3.819,2.048,7.339,5.333,9.237c1.643,0.939,3.499,1.429,5.333,1.429c1.856,0,3.691-0.469,5.355-1.429l405.333-234.667
                                                c3.285-1.92,5.312-5.44,5.312-9.237S456.637,237.989,453.352,236.091z"/>
                                                
                                        </svg>
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
  }

  async render() {
    htmlGen.deleteEl(active.class);
    htmlGen.toggleGameButtons();

    // let response = await this.getModule(id);  edit/get-module

    this.gameHtml();

    let el = htmlGen.createEl(this);

    htmlGen.toggleSpinner(false);
    document.body.appendChild(el);

    this.cards = [...document.querySelectorAll(".game__card")];
    this.cardsContainer = document.querySelector(".game__cards-container");
    this.methodMenu = document.querySelector(".game__method-menu-container");
    this.buttonMenu = document.querySelector(".game__method-menu-container");
    this.cardShuffle = document.querySelector(".game__shuffle");

    console.log(this.cards[1]);

    this.activeCard = this.cards[1];

    this.cardsContainer.addEventListener("click", this.flipCard);

    // console.log(this.nextCard());

    // this.prevBtn = document.querySelectorAll('.game__nav-item.prev');
    // this.nextBtn = document.querySelectorAll('.game__nav-item.next');
  }

  get activeFront() {
    return this.activeCard.querySelector(".game__card-front");
  }

  get activeBack() {
    return this.activeCard.querySelector(".game__card-back");
  }

  switchCard(forward) {
    let ind = this.cards.indexOf(this.activeCard);
    if (ind == (forward ? this.cards.length - 1 : 0)) return;

    this.activeFront.classList.add("transparent");
    this.activeFront.classList.add(forward ? "prev" : "next");
    this.activeFront.classList.remove("rearside");
    this.activeBack.classList.add("transparent");
    this.activeBack.classList.add(forward ? "prev" : "next");
    this.activeBack.classList.add("rearside");

    this.activeCard = this.cards[ind + (forward ? 1 : -1)];

    this.activeFront.classList.remove("transparent");
    this.activeFront.classList.remove(forward ? "next" : "prev");
    this.activeBack.classList.remove("transparent");
    this.activeBack.classList.remove(forward ? "next" : "prev");
  }

  flipCard(event) {
    if (event.target.closest(".game__card")) {
      active.activeFront.classList.toggle("rearside");
      active.activeBack.classList.toggle("rearside");
    }
  }

  methodMenuToggle() {
    let target;
    modal ? (target = modal.methodMenu) : (target = active.methodMenu);
    target.classList.toggle("hidden");

    if (target.classList.contains("hidden")) {
      setTimeout(() => {
        document.removeEventListener("click", active.methodMenuToggle);
      }, 0);
    } else {
      setTimeout(() => {
        document.addEventListener("click", active.methodMenuToggle);
      }, 0);
    }
  }

  methodChange(type) {
    switch (type) {
      case "term":

      case "defenition":
    }
  }

  toggleShuffle(target) {
    target.classList.toggle("active");
  }
  // async getUserData() {
  //     let httpParam = new HttpParam('GET', false, true);
  //     let response = await fetch(url + '/home/get_user_data', httpParam);
  //     return JSON.parse(await response.text());
  // }
}

/* <div class="game__card">
    <h1>Second card</h1>
</div> */
