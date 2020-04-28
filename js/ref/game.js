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
                                <svg height="15" width="15">
                                  <use href="img/sprite.svg#icon__triangle_left"></use>
                                </svg>
                                <span>Back</span>
                                
                            </button>
                        </div>

                        <div class="game__title">
                            <svg height="40" width="40">
                                <use href="img/sprite.svg#icon__cards"></use>
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
                                    <svg height="13" width="13">
                                        <use href="img/sprite.svg#icon__down_arrow"></use>
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
                                    <svg height="20" width="20">
                                        <use href="img/sprite.svg#icon__shuffle"></use>
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
                                        <svg>
                                            <use href="img/sprite.svg#icon__triangle_left"></use>
                                        </svg>
                                    </button>
                                </div>

                                <div class="game__nav-item next">
                                    <button class="btn pad15 bcc-white brr50p d-f h-bcc-yellow p-r" onclick="active.switchCard(true)">
                                        <svg>
                                            <use href="img/sprite.svg#icon__triangle_right"></use>
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
