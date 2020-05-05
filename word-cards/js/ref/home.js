"use strict";

class Home {
  constructor() {
    if (active.newModule) htmlGen.hideCreateModule();
    if (active.class == "game") htmlGen.toggleGameButtons();

    this.class = "home";
    this.render();
  }

  moduleHtml({ author, number, title, draft, _id }, img) {
    // console.log(img);
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
                                <li class="home__filter-item" data-filter-method='Studied'>Studied</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="home__content-module-cont">

                    <div class="home__module-search">

                        <div class="home__input-cont">
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
    // until I create other filter methods (костыль)
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
            } else {
              html = this.nonefoundHtml(item);
            }

            break;
        }

        let el = htmlGen.createEl(html);

        if (typeof item === "object") {
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

      // draft ? htmlGen.edit() : htmlGen.module(id);
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

    document.body.appendChild(el);
    htmlGen.toggleSpinner(false);

    this.moduleContainer = document.querySelector(".home__modules");
    this.matchFilter = document.querySelector(".home__input-cont input");

    this.filterList = document.querySelector(".home__filter");

    this.filterTimeout = false;
    this.activeFilterMethod = "filterCreated";

    this.filterCreated(this.modules);
    this.appendModules(this.filteredModules);

    this.filterList.addEventListener("click", (e) => {
      if (e.target.classList.contains("active")) return;

      for (let li of e.target.parentNode.children) {
        li.classList.remove("active");
      }

      e.target.classList.add("active");
      this.activeFilterMethod = "filter".concat(e.target.dataset.filterMethod);

      this.callActiveFilter(this.modules);
    });

    this.matchFilter.addEventListener("input", (e) => {
      clearTimeout(this.filterTimeout);

      this.filterTimeout = setTimeout(() => {
        this.moduleContainer.innerHTML = "";

        if (e.target.value != "") {
          if (this.findMatch(e.target.value)) {
            this.callActiveFilter(this.filteredModules);
          } else {
            this.filteredModules = [
              {
                value: e.target.value,
              },
            ];
          }
        } else {
          this.callActiveFilter(this.modules);
        }

        this.appendModules(this.filteredModules);
      }, 800);
    });
  }

  async getUserData() {
    let httpParam = new HttpParam("GET", false, true);
    let response = await fetch(url + "/home/get_user_data", httpParam);
    return JSON.parse(await response.text());
  }

  callActiveFilter(modules) {
    this[this.activeFilterMethod](modules);
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
    console.log("filterRecent");
  }

  filterCreated(modules) {
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

  filterStudied() {
    console.log("filterStudied");
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
}
