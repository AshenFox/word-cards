class Options {
  constructor() {
    this.class = "modal";
    this.id = "active-modal";
    this.el;

    this.html = /*html*/ `

		<div class="modal__dialog">
            
            <div class="delete-set">

                <div class="modal__header">
                    <div class="modal__title">
                        <h3>Options</h3>
                    </div>
                    <!-- cards -->
                    <div class="modal__close">
                      <svg height="17" width="17" fill="#fff">
                        <use href="img/sprite.svg#icon__close"></use>
                      </svg>
                    </div>
                </div>

                <div class="modal__content">

                        <div class="game__method">
                            <div class="game__method-tilte">
                                Answer with:
                            </div>
                            <button class="btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow" onclick="active.methodMenuToggle();">
                                <svg height="13" width="13">
                                  <use href="img/sprite.svg#icon__down_arrow"></use>
                                </svg>
                                <span>${
                                  active.answerWithDefenition
                                    ? "Defenition"
                                    : "Term"
                                }</span>
                            </button>
                            <div class="game__method-menu-container-modal hidden">
                                <div class="game__method-menu">
                                    <div class="game__method-menu-item" data-method="term">
                                        <span>Term</span>
                                    </div>
                                    <div class="game__method-menu-item" data-method="defenition">
                                        <span>Defenition</span>
                                    </div>
                                </div>
                            </div>

                            
                            
                        </div>

                        <div class="game__shuffle-modal">
                            <button class="btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow" onclick="active.toggleShuffle(modal.cardShuffle);">
                                <svg height="20" width="20">
                                  <use href="img/sprite.svg#icon__shuffle"></use>
                                </svg>
                                <span>Shuffle</span>
                            </button>
                        </div>
                    
                    

                </div>

            </div>	
            
        </div>`;

    this.render();
  }

  render() {
    this.checkForModal();

    let el = htmlGen.createEl(this);
    document.body.appendChild(el);

    this.cardShuffle = document.querySelector(".game__shuffle-modal");
    this.methodMenu = document.querySelector(
      ".game__method-menu-container-modal"
    );

    this.optionContent = document.querySelector(".modal__content");

    this.optionContent.addEventListener("click", (e) => {
      let el = e.target.closest(".game__method-menu-item");
      if (el) {
        if (el.dataset.method === "term") active.methodChange(false);
        if (el.dataset.method === "defenition") active.methodChange(true);
      }
    });

    setTimeout(() => {
      el.querySelector(".modal__dialog").classList.add("activated");
    }, 0);
    this.el = el;

    // Close modal

    el.querySelector(".modal__close").addEventListener("mousedown", () => {
      htmlGen.deleteEl(this.class);
      modal = false;
    });

    el.addEventListener("mousedown", (e) => {
      if (e.target === el) {
        htmlGen.deleteEl(this.class);
        modal = false;
      }
    });
  }

  checkForModal() {
    let el = document.getElementById("active-modal");
    if (el) {
      el.parentNode.removeChild(el);
    }
  }

  // methodMenuToggle() {
  //     modal.methodMenu.classList.toggle('hidden');

  //     if(active.methodMenu.classList.contains('hidden')) {
  //         setTimeout(() => {
  //             document.removeEventListener('click', active.methodMenuToggle);
  //         }, 0);

  //     } else {
  //         setTimeout(() => {
  //             document.addEventListener('click', active.methodMenuToggle);
  //         }, 0);
  //     }
  // }
}
