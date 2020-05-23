"use strict";

class Home {
  constructor() {
    if (active.newModule) htmlGen.hideCreateModule();
    if (active.class == "game") htmlGen.toggleGameButtons();

    this.class = "home";
    this.render();
  }

  moduleHtml({ author, number, title, draft, _id }, img) {
    return {
      class: "home__module",
      id: _id,
      html: /*html*/ `
                <div class="home__module-info">

                    <div class="home__term-number">
                        ${number} Terms
                    </div>

                    ${
                      draft
                        ? ""
                        : `<div class="home__module-author">${author}</div>`
                    }
                    
                </div>

                <div class="home__module-title ${draft ? "blue" : ""}">
                    ${draft ? "(Draft)" : title}
                    <svg class="${img ? "" : "hidden"}">
                      <use href="img/sprite.svg#icon__img"></use>
                    </svg>
                </div>
            `,
    };
  }

  studyRegimeHtml() {
    let { numberSR, repeat, repeatInTime, mil, repeatInNumber } = this.cardsSR;
    return {
      class: "home__module home__module--v2",
      id: "",
      html: /*html*/ `
        <div class="home__module-container">
          <div class="home__module-title home__module-title--v2">
            Study Regime
          </div>
          <ul class="home__study-regime-info">
            <li><span>${numberSR} cards</span> in the regime.</li>
            <li class="${
              repeatInTime.length ? "" : "hidden"
            }"><span>${repeatInNumber} ${
        repeatInNumber === 1 ? "card" : "more cards"
      }</span> to repeat ${this.findTimeInterval()}.</li>
          </ul>
        </div>

        <div class="home__repeat">
          <p>Currently you have <span>${
            repeat.length
          } cards</span> to repeat.</p>
          <p class="${repeat.length <= 0 ? "hidden" : ""}">Repeat with:</p>
          <div class="home__repeat-methods ${
            repeat.length <= 0 ? "hidden" : ""
          }">
            <div class="home__counter-container">
              <div class="home__counter">
                <div class="home__counter-subtract"><span>-</span></div>
                <div class="home__counter-number" contenteditable="true">${
                  repeat.length
                }</div>
                <div class="home__counter-add"><span>+</span></div>
              </div>
            </div>
            <div class="home__repeat-item" data-game="flashcards">
              <svg height="35" width="35">
                <use href="img/sprite.svg#icon__cards"></use>
              </svg>
              <!-- <span>Flashcards</span> -->
            </div>
            <div class="home__repeat-item" data-game="write">
              <svg height="35" width="35">
                <use href="img/sprite.svg#icon__write"></use>
              </svg>
              <!-- <span>Write</span> -->
            </div>
          </div>
        </div>`,
    };
  }

  separatorHtml(separatorName) {
    return {
      class: "home__divider",
      id: "",
      html: /*html*/ `
            <div class="home__divider-text">${separatorName}</div>
            <div class="home__divider-line"></div>
            `,
    };
  }

  nonefoundHtml({ value }) {
    let result = {
      class: "home__none-found",
      id: "",
      html: /*html*/ `
            <p>No sets matching <b>'${value}'</b> found</p>
            `,
    };

    if (!value) result.html = /*html*/ `You don't have any sets yet...`;

    return result;
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
                                <li class="home__filter-item" data-filter-method='Recent'>Recent</li>
                                <li class="home__filter-item active" data-filter-method='Created'>Created</li>
                                <li class="home__filter-item" data-filter-method='Studied'>SR</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="home__content-module-cont">

                    <div class="home__module-search">

                        <div class="home__input-cont" data-active ="true">
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
    this.moduleContainer.innerHTML = "";
    // until I create other filter methods (костыль)
    if (this.activeFilterMethod === "filterCreated") {
      for (let i of this.modules) {
        if (i.draft) {
          let separatorName = "in progress";
          this.moduleContainer.appendChild(
            htmlGen.createEl(this.separatorHtml(separatorName))
          );
          let img = this.checkImg(i);
          let draft = this.moduleContainer.appendChild(
            htmlGen.createEl(this.moduleHtml(i, img))
          );
          draft.dataset.id = i._id;
          this.moduleListener(draft, i.draft);
        }
      }
    }

    let html;

    if (arr.length === 0) {
      html = this.nonefoundHtml({});
      let el = htmlGen.createEl(html);
      this.moduleContainer.appendChild(el);
    } else {
      arr.forEach((item) => {
        switch (typeof item) {
          case "string":
            html = this.separatorHtml(item);
            break;

          case "object":
            if (item._id) {
              let img = this.checkImg(item);
              html = this.moduleHtml(item, img);
            } else if (item.studyRegime) {
              html = this.studyRegimeHtml();
            } else {
              html = this.nonefoundHtml(item);
            }

            break;
        }

        let el = htmlGen.createEl(html);

        if (typeof item === "object" && !item.studyRegime) {
          el.dataset.id = item._id;
          this.moduleListener(el, item.draft);
        }

        this.moduleContainer.appendChild(el);
      });
    }
  }

  checkImg(module) {
    for (let card of module.cards) {
      if (!card.imgurl) continue;
      if (card.imgurl != "") return true;
    }
    return false;
  }

  moduleListener(module, draft) {
    module.addEventListener("click", async (e) => {
      let id = e.currentTarget.dataset.id;

      draft
        ? (location.href = hashValues.edit)
        : (location.href = `${hashValues.module}?id=${id}`);
    });
  }

  async render() {
    htmlGen.deleteEl(active.class);

    let response = await this.getUserData();

    this.username = response.username;
    this.modules = response.modules;
    this.filteredModules = false;
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.homeHtml();

    let el = htmlGen.createEl(this);

    // document.body.appendChild(el);
    main.appendChild(el);
    htmlGen.toggleSpinner(false);

    this.moduleContainer = document.querySelector(".home__modules");
    this.matchFilterContainer = document.querySelector(".home__input-cont");
    this.matchFilter = document.querySelector(".home__input-cont input");
    this.filterList = document.querySelector(".home__filter");

    this.filterTimeout = false;
    this.activeFilterMethod = "filterCreated";

    this.moduleContainer.addEventListener("click", (e) => {
      let repeatItemEl = e.target.closest(".home__repeat-item");
      if (!repeatItemEl) return;

      let game = repeatItemEl.dataset.game;

      if (game == "flashcards") {
        location.href = `${hashValues.flashcards}?number=${this.repeatNumber}`;
      } else if (game == "write") {
        location.href = `${hashValues.write}?number=${this.repeatNumber}`;
      }
    });

    this.moduleContainer.addEventListener("click", (e) => {
      let target = e.target;
      let el;

      el = target.closest(".home__counter-subtract");
      if (el) {
        if (this.repeatNumber <= 1) return;
        let counter = el
          .closest(".home__counter")
          .querySelector(".home__counter-number");
        this.repeatNumber--;
        counter.textContent = this.repeatNumber;
      }

      el = target.closest(".home__counter-add");
      if (el) {
        if (
          this.repeatNumber >= 9999 ||
          this.repeatNumber >= this.cardsSR.repeat.length
        )
          return;
        let counter = el
          .closest(".home__counter")
          .querySelector(".home__counter-number");
        this.repeatNumber++;
        counter.textContent = this.repeatNumber;
      }
    });

    this.moduleContainer.addEventListener("input", (e) => {
      let target = e.target;
      let el;
      el = target.closest(".home__counter-number");
      if (el) {
        e.preventDefault();
        let digStr = el.textContent.replace(/\D/g, "");
        if (digStr.length > 4) digStr = `${this.repeatNumber}`;
        if (parseInt(digStr, 10) >= this.cardsSR.repeat.length)
          digStr = `${this.repeatNumber}`;
        if (parseInt(digStr, 10) <= 1) digStr = "1";
        el.textContent = digStr;
        this.repeatNumber = parseInt(digStr, 10);
      }
    });

    this.moduleContainer.addEventListener("paste", (e) => {
      let target = e.target;
      let el;
      el = target.closest(".home__counter-number");
      if (el) {
        e.preventDefault();
      }
    });

    // Filter mehthiods and regimes --------------------------

    await this.callActiveFilter(this.modules);

    this.filterList.addEventListener("click", async (e) => {
      if (e.target.classList.contains("active")) return;

      for (let li of e.target.parentNode.children) {
        li.classList.remove("active");
      }

      e.target.classList.add("active");
      this.activeFilterMethod = "filter".concat(e.target.dataset.filterMethod);

      await this.callActiveFilter(this.modules);
    });

    // Filter mehthiods and regimes --------------------------

    // Filter for finding module by name --------------------------

    this.matchFilter.addEventListener("input", (e) => {
      clearTimeout(this.filterTimeout);

      this.filterTimeout = setTimeout(async () => {
        this.moduleContainer.innerHTML = "";

        if (e.target.value != "") {
          if (this.findMatch(e.target.value)) {
            await this.callActiveFilter(this.filteredModules);
          } else {
            this.filteredModules = [
              {
                value: e.target.value,
              },
            ];
          }
        } else {
          await this.callActiveFilter(this.modules);
        }

        this.appendModules(this.filteredModules);
      }, 800);
    });

    this.matchFilter.addEventListener("focus", (e) => {
      if (this.activeFilterMethod === "filterStudied") {
        this.matchFilter.blur();
      }
    });

    await preparePush();

    // Filter for finding module by name --------------------------
  }

  async getUserData() {
    let httpParam = new HttpParam("GET", false, true);
    let response = await fetch(url + "/home/get_user_data", httpParam);
    return JSON.parse(await response.text());
  }

  async getCardsSR() {
    let httpParam = new HttpParam("GET", false, true);
    let response = await fetch(url + "/study_regime/get_cards", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }

  async callActiveFilter(arr) {
    await this[this.activeFilterMethod](arr);
    this.appendModules(this.filteredModules);
  }

  findMatch(value) {
    let result = false;

    this.filteredModules = this.modules
      .filter((item) => {
        if (item.draft) return false;
        if (item.title.indexOf(value) != -1) {
          result = true;
          return true;
        }
        return false;
      })
      .map((module) => {
        let newModule = Object.assign({}, module);
        let regExp = new RegExp(`${value}`, "g");
        let replacement = `<span class='bcc-yellow'>${value}</span>`;
        newModule.title = newModule.title.replace(regExp, replacement);
        return newModule;
      });

    return result;
  }

  filterRecent() {
    this.matchFilterContainer.dataset.active = true;
    this.filteredModules = [];
  }

  filterCreated(modules) {
    this.matchFilterContainer.dataset.active = true;

    let sortedModules = modules
      .filter((module) => {
        if (!module.draft) return true;
        return false;
      })
      .sort((a, b) => {
        let date_A = new Date(a.creation_date);
        let date_B = new Date(b.creation_date);
        return date_B - date_A;
      });

    let uniqueSeparators = [];
    this.filteredModules = [];

    sortedModules.forEach((module) => {
      let name = this.nameSeparator(module.creation_date);

      if (!uniqueSeparators.includes(name)) {
        uniqueSeparators.push(name);
        this.filteredModules.push(name);
      }

      this.filteredModules.push(module);
    });
  }

  async filterStudied() {
    this.matchFilterContainer.dataset.active = false;

    this.cardsSR = await this.getCardsSR();

    this.repeatNumber = this.cardsSR.repeat.length; // change

    this.filteredModules = [
      {
        studyRegime: true,
      },
    ];

    let mil;
    let counter = 0;

    for (let card of this.cardsSR.repeatInTime) {
      if (!mil) {
        mil = new Date(card.nextRep).getTime();
        counter++;
        continue;
      } else {
        if (mil + 1800000 >= new Date(card.nextRep).getTime()) {
          mil = new Date(card.nextRep).getTime();
          counter++;
        } else {
          break;
        }
      }
    }

    this.cardsSR.mil = mil;
    this.cardsSR.repeatInNumber = counter;
  }

  nameSeparator(strDate, draft) {
    if (draft) {
      return "in progress";
    }

    let date = new Date(strDate);

    let sec = (new Date().getTime() - date.getTime()) * 0.001;

    if (sec < 60) {
      return "a few seconds ago";
    } else if (sec < 600) {
      return "several minutes ago";
    } else if (sec < 1800) {
      return `${Math.floor(sec / 60)} minutes ago`;
    } else if (sec < 3600) {
      return `less than an hour ago`;
    } else if (sec < 86400) {
      return `${Math.floor(sec / 3600)} hours ago`;
    } else if (sec < 604800) {
      return `several days ago`;
    } else if (sec < 2419200) {
      return `${Math.floor(sec / 604800)} weeks ago`;
    } else {
      return `in ${this.months[date.getMonth()]} ${date.getFullYear()}`;
    }
  }

  findTimeInterval() {
    let mil = this.cardsSR.mil;

    let sec = (mil - Date.now()) * 0.001;

    if (sec < 60) {
      return "in a minute";
    } else if (sec < 3600) {
      let int = Math.floor(sec / 60);
      return `in ${int} minute${int === 1 ? "" : "s"}`;
    } else if (sec < 7200) {
      return `in an hour`;
    } else if (sec < 86400) {
      let int = Math.floor(sec / 3600);
      return `in ${int} hour${int === 1 ? "" : "s"}`;
    } else if (sec < 172800) {
      return `tomorrow`;
    } else if (sec < 604800) {
      let int = Math.floor(sec / 86400);
      return `in ${int} day${int === 1 ? "" : "s"}`;
    } else if (sec < 1209600) {
      return `in a week`;
    } else if (sec < 2419200) {
      let int = Math.floor(sec / 604800);
      return `in ${int} week${int === 1 ? "" : "s"}`;
    } else if (sec < 4838400) {
      return `in a month`;
    } else {
      let int = Math.floor(sec / 2419200);
      return `in ${int} month${int === 1 ? "" : "s"}`;
    }
  }
}

/*


                      


*/
