"use strict";

class Module {
  constructor(id) {
    if (active.newModule) htmlGen.hideCreateModule();
    if (active.class == "flashcards" || active.class == "write")
      htmlGen.toggleGameButtons(false);

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
                        <span class="module__author-nickname">${
                          this.author
                        }</span>
                    </div>

                    <div class="module__nav">

                        <div class="module__study-regime">
                          <input class="module__checkbox" type="checkbox" id="toggleswitch" ${
                            this.allCardsSR ? "checked" : ""
                          }/>
                          <svg height="30" width="30">
                            <use href="img/sprite.svg#icon__studyregime"></use>
                          </svg>
                          <span>All cards study regime:</span>
                          <label class="module__toggle-switch" for="toggleswitch"></label>
                        </div>
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

  cardHtml({ term, defenition, imgurl, studyRegime, _id }) {
    this.switchCounter++;

    return {
      class: "module__card",
      id: _id,
      html: /*html*/ `
                <div class="module__card-term" data-textfield="true">
                <p >${term}</p>
                <div class="module__card-study-regime">
                  <input class="module__checkbox" type="checkbox" id="toggleswitch${
                    this.switchCounter
                  }" ${studyRegime ? "checked" : ""}/>
                  <svg height="17" width="17">
                    <use href="img/sprite.svg#icon__studyregime"></use>
                  </svg>
                  <span>Card study regime:</span>
                  <label class="module__toggle-switch sm" for="toggleswitch${
                    this.switchCounter
                  }"></label>
                </div>
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
                    <p>${defenition}</p>
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

    this.cards = await this.getCards(this._id);

    this.allCardsSR = true;

    for (let card of this.cards) {
      if (!card.studyRegime) this.allCardsSR = false;
    }

    this.moduleHtml();

    let el = htmlGen.createEl(this);

    // document.body.appendChild(el);
    main.appendChild(el);
    htmlGen.toggleSpinner(false);
    this.moduleEl = document.querySelector(".module");
    this.cardsContainer = document.querySelector(".module__card-cont");
    this.matchFilter = document.querySelector(".module__filter");

    this.filterTimeout = false;
    this.switchCounter = 0;

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
      location.href = `${hashValues.flashcards}?id=${this._id}`;
    });

    write.addEventListener("click", () => {
      location.href = `${hashValues.write}?id=${this._id}`;
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
      }, 800);
    });

    this.moduleEl.addEventListener("click", async (e) => {
      if (e.target.classList.contains("module__checkbox")) return;
      e.preventDefault();
      let allCardsSR = e.target.closest(".module__study-regime");
      let cardSR = e.target.closest(".module__card-study-regime");

      if (allCardsSR) {
        let checkbox = allCardsSR.querySelector(".module__checkbox");

        let result = await this.studyRegime({
          moduleID: this._id,
          value: !checkbox.checked,
        });

        if (result) {
          checkbox.checked = !checkbox.checked;

          let checkboxArr = document.querySelectorAll(".module__checkbox");

          checkboxArr.forEach((item) => {
            item.checked = checkbox.checked;
          });
          this.cards.forEach((item) => {
            item.studyRegime = checkbox.checked;
          });
        }
      }

      if (cardSR) {
        let checkbox = cardSR.querySelector(".module__checkbox");
        let cardID = cardSR.closest(".module__card").id;

        let result = await this.studyRegime({ cardID });

        if (result) {
          checkbox.checked = !checkbox.checked;

          let card = this.cards.find((item) => item._id === cardID);
          card.studyRegime = checkbox.checked;

          this.allCardsSR = true;
          for (let item of this.cards) {
            if (!item.studyRegime) {
              this.allCardsSR = false;
              break;
            }
          }

          document
            .querySelector(".module__study-regime")
            .querySelector(".module__checkbox").checked = this.allCardsSR;
        }
      }
    });

    this.cardsContainer.addEventListener("click", (e) => {
      let speaker = e.target.closest(".module__speaker[data-active=true]");
      if (speaker && !voice.synth.speaking) {
        let textContainerEl = speaker.closest("[data-textfield=true]");

        let text;

        if (textContainerEl.classList.contains("module__card-definition")) {
          text = textContainerEl.textContent;
        } else {
          text = textContainerEl.querySelector("p").textContent;
        }

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

  async deleteModule(_id) {
    let reqData = {
      _id,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    await fetch(url + "/edit/delete_module", httpParam);
    location.href = hashValues.home;
  }

  async getModule(_id) {
    let reqData = {
      _id,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/edit/get_module", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }

  async getCards(id) {
    let reqData = {
      moduleID: id,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/edit/get_cards", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }

  async studyRegime(data) {
    let reqData = {
      ...data,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/study_regime/control", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }
}
