"use strict";

class Module {
  constructor(id) {
    if (active.newModule) htmlGen.hideCreateModule();
    if (active.class == "game") htmlGen.toggleGameButtons();

    this.class = "module";
    // this.html = /*html*/ `

    // `;

    this.render(id);
  }

  moduleHtml() {
    this.html = /*html*/ `
            <div class="module__header">

            <div class="container">

                <div class="module__header-top">
                    <div class="module__title">
                        <h1>${this.title}</h1>
                    </div>
                    <div class="module__return">
                        <button class="btn bcc-lightblue pad12-30 brr10 white fz15 fw-normal h-grey h-bcc-yellow" onclick="location.href = hashValues.home">
                            Return
                        </button>
                    </div>

                </div>

                

                <div class="module__study">

                    <div class="module__study-title">
                        STUDY:
                    </div>

                    <div class="module__study-item" id="flashcards-game">
                        <button class="btn">
                            <svg height="31" width="31">
                              <use href="img/sprite.svg#icon__cards"></use>
                            </svg>
                            <span>Flashcards</span>
                        </button>
                    </div> 
                    <div class="module__study-item" id="write-game">
                        <button class="btn">
                        <svg height="30" width="30">
                          <use href="img/sprite.svg#icon__write"></use>
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
                            <svg width="25" height="25">
                              <use href="img/sprite.svg#icon__edit"></use>
                            </svg>
                        </div>
                        <div id="remove-item" class="module__nav-item">
                            <svg width="25" height="25">
                              <use href="img/sprite.svg#icon__delete"></use>
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

  cardHtml({ term, defenition, imgurl }) {
    return {
      class: "module__card",
      id: "",
      html: /*html*/ `
                <div class="module__card-term" data-textfield="true">
                ${term}
                <div class="module__speaker" data-active="${
                  voice.working && term !== "" && voice.detectLanguage(term)
                    ? "true"
                    : "false"
                }" data-speaking="false">
                      <svg height="17" width="17">
                        <use href="img/sprite.svg#icon__speaker"></use>
                      </svg>
                    </div>
                </div>
                <div class="module__card-definition-container">
                    <div class="module__card-definition" data-textfield="true">
                    ${defenition}
                    <div class="module__speaker" data-active="${
                      voice.working &&
                      defenition !== "" &&
                      voice.detectLanguage(defenition)
                        ? "true"
                        : "false"
                    }" data-speaking="false">
                        <svg height="17" width="17">
                          <use href="img/sprite.svg#icon__speaker"></use>
                        </svg>
                      </div>
                    </div>
                    <div class="module__card-img-container" style="${
                      imgurl !== "" ? "" : "display: none"
                    }">
                        <div class="module__card-img" style="background-image: url(${
                          imgurl !== "" ? imgurl : ""
                        })">
                        </div>
                    </div>
                </div>
            `,
    };
  }

  nonefoundHtml({ value }) {
    return {
      class: "module__none-found",
      id: "",
      html: /*html*/ `
            <p>No cards matching <b>'${value}'</b> found</p>
            `,
    };
  }

  appendCards(arr) {
    let html;
    arr.forEach((item) => {
      if (typeof item.term == "string") {
        html = this.cardHtml(item);
      } else {
        html = this.nonefoundHtml(item);
      }

      let el = htmlGen.createEl(html);
      this.cardsContainer.appendChild(el);
    });
  }

  async render(id) {
    htmlGen.deleteEl(active.class);

    let response = await this.getModule(id);
    if (!response) {
      location.href = hashValues.home;
      return;
    }
    Object.assign(this, response);
    this.moduleHtml();

    let el = htmlGen.createEl(this);

    htmlGen.toggleSpinner(false);
    document.body.appendChild(el);
    this.cardsContainer = document.querySelector(".module__card-cont");
    this.matchFilter = document.querySelector(".module__filter");

    this.filterTimeout = false;

    let edit = document.getElementById("edit-item");
    let remove = document.getElementById("remove-item");
    let flashcards = document.querySelector("#flashcards-game button");
    let write = document.querySelector("#write-game button");

    edit.addEventListener("click", () => {
      // htmlGen.edit(this._id);
      location.href = `${hashValues.edit}?id=${this._id}`;
    });

    remove.addEventListener("click", () => {
      htmlGen.delete();
    });

    flashcards.addEventListener("click", () => {
      location.href = `${hashValues.game}?id=${this._id}`;
    });

    this.matchFilter.addEventListener("input", (e) => {
      clearTimeout(this.filterTimeout);

      this.filterTimeout = setTimeout(() => {
        this.cardsContainer.innerHTML = "";

        let result;

        if (e.target.value != "") {
          if (!this.findMatch(e.target.value)) {
            this.filteredCards = [
              {
                value: e.target.value,
              },
            ];
          }

          result = this.filteredCards;
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

    this.cardsContainer.addEventListener("click", (e) => {
      let speaker = e.target.closest(".module__speaker[data-active=true]");
      if (speaker && !voice.synth.speaking) {
        let text = speaker.closest("[data-textfield=true]").textContent;
        if (text !== "" && speaker.dataset.active !== "false") {
          speaker.dataset.speaking = true;
          let speakText = voice.speak(text);

          speakText.onend = (e) => {
            speaker.dataset.speaking = false;
          };
        }
      } else if (speaker && voice.synth.speaking) {
        voice.cancel();
      }
    });

    this.appendCards(this.cards);
  }

  findMatch(value) {
    value = value.toLowerCase();

    let result = false;

    this.filteredCards = this.cards
      .filter((card) => {
        if (card.term.toLowerCase().indexOf(value) != -1) {
          result = true;
          return true;
        }
        return false;
      })
      .map((card) => {
        let newCard = Object.assign({}, card);
        let regExp = new RegExp(`${value}`, "g");
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
    };
    let httpParam = new HttpParam("POST", reqData, true);
    await fetch(url + "/edit/delete", httpParam);
    location.href = hashValues.home;
  }

  async getModule(id) {
    let reqData = {
      id,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/edit/get_module", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }
}
