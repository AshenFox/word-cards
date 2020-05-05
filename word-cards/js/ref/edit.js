"use strict";

class Edit {
  constructor(id) {
    if (active.class == "game") htmlGen.toggleGameButtons();

    !id ? (this.newModule = true) : (this.newModule = false);

    this.class = "edit";

    if (this.newModule) {
      this.timer = false;
      htmlGen.hideCreateModule();
    }

    this.render(id);
    this.screenWidth = window.screen.width;
  }

  editHtml() {
    this.html = /*html*/ `
        
        <!-- INTRO -->
            
            <div class="edit__intro">
            <div class="container">
                <div class="edit__intro-content">
                    <div class="edit__intro-info">
                        <h2>${
                          this.newModule
                            ? "Create a new study set!"
                            : "Edit the study set! :)"
                        }</h2>
                    </div>
                    <div class="edit__intro-return">
                        <button class="btn bcc-lightblue pad12-30 brr10 white fz15 fw-normal h-grey h-bcc-yellow" type="button" onclick="active.return();">
                            ${this.newModule ? "Cancel" : "Return"}
                        </button>
                    </div>
                </div>
            </div> <!-- container -->
        </div> <!-- edit__intro -->

        <!-- MODULE -->

        <div class="edit__module">

            <div class="container">
                <div class="edit__module-content">
                    <div class="edit__module-title">
                        <div contenteditable="true" class="textarea textarea--module">${
                          this.title ? this.title : ""
                        }</div>
                        <div class="label" id="title-error">TITLE</div>
                    </div>
                </div>
            </div> <!-- container -->
        </div> <!-- edit__module -->

        <!-- CARDS -->

        <div class="edit__cards">
            <div class="container">
                <div class="edit__cards-container">

                </div> <!-- cards__container -->

                <div class="edit__cards-newcard">
                    <button class="btn fz15 uppercase grey h-yellow pad-bot10 br-bottom5 brc-lightblue h-brc-yellow" type="button" onclick="active.addCard()">+ add card</button>
                </div>
            </div> <!-- container -->
            
        </div> <!-- edit__cards -->

        <!-- SAVE -->

        <div class="edit__save">
            <div class="container">
                <div class="edit__save-module">
                    <button class="btn bcc-lightblue pad30-70 brr10 white fz20 fw-bold h-grey h-bcc-yellow" type="button" onclick="active.newModule ? active.saveModule(active._id) : active.edit(active._id)">
                        Save
                    </button>
                </div>
            </div>
            
        </div>`;
  }

  cardHtml({ term = "", defenition = "", imgurl = "" }) {
    // Add img field
    return {
      class: "edit__cards-card",
      id: "",
      html: /*html*/ `
                
                <div class="edit__cards-header">
                    <div class="edit__cards-number"></div>
                    <div class="edit__cards-delete">
                        <button class="btn">
                            <svg width="17" height="17">
                              <use href="img/sprite.svg#icon__delete"></use>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="edit__cards-items">
                    <div class="edit__cards-term">
                        <div contenteditable="true" class="textarea">${term}</div>
                        <div class="edit__cards-label">TERM</div>
                    </div>

                    <div class="edit__cards-definition">
                        <div class="edit__cards-definition-input">
                            <div contenteditable="true" class="textarea" placeholder="Something">${defenition}</div>
                            <div class="edit__cards-label" for="cards__definition-input1">DEFINITION</div>
                        </div>

                        <div class="edit__addimg" style="background-image: url(${
                          imgurl !== "" ? imgurl : ""
                        })" data-imgurl="${imgurl !== "" ? imgurl : "false"}">
                            <div class="edit__img-logo" >
                                <svg>
                                  <use href="img/sprite.svg#icon__img"></use>
                                </svg>
                            </div>
                            <div class="edit__img-delete">
                              <svg>
                                <use href="img/sprite.svg#icon__delete"></use>
                              </svg>
                            </div>
                            <span>IMAGE</span>
                        </div>
                    </div>

                    
                </div>
                <div class="edit__img-search-container">
                  <div class="edit__img-search">
                    <div class="edit__searchbar">
                    <form action="" class="edit__searchbar-form">
                      <label class="edit__searchbar-input-label">
                        <input type="text" class="edit__searchbar-input" placeholder="Search images..."/>
                        <div class="edit__searchbar-icon" data-searching="false">
                          <svg>
                            <use href="img/sprite.svg#icon__arrow_right"></use>
                          </svg>
                        </div>
                      </label>
                    </form>
                    
                    </div>
                    <div class="edit__search-results">
                      <div class="edit__spinner-container edit__spinner-container--hide">
                        <div class="spinner spinner--small"></div>
                      </div>
                      <div class="edit__error-container edit__error-container--hide" data-error="false">
                        <span>The service is currently unavailable. Please try later...</span>
                      </div>
                      <div class="edit__gallery-container edit__gallery-container--hide">
                        
                        
                        <div class="edit__gallery-control--left" data-control_el="true" data-active="true" data-dir="left">
                        
                          <button class="btn pad15 bcc-white brr50p d-f h-bcc-yellow mar-left-a p-r" onclick="">
                            <svg>
                              <use href="img/sprite.svg#icon__triangle_left"></use>
                            </svg>
                        </button>
                        
                        </div>
                        <div class="edit__gallery-window">
                          <div class="edit__gallery" data-animated="false">
                            
                          </div>
                        </div>
                        <div class="edit__gallery-control--right" data-control_el="true" data-active="true" data-dir="right">
                        
                          <button class="btn pad15 bcc-white brr50p d-f h-bcc-yellow p-r" onclick="">
                            <svg>
                              <use href="img/sprite.svg#icon__triangle_right"></use>
                            </svg>
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
            `,
    };
  }

  galleryItemHtml(url) {
    return {
      type: "figcaption",
      class: "edit__gallery-item",
      id: "",
      data_url: `${url}`,
      html: /*html*/ `
        <img src="${url}" alt="Gallery img"/>
      `,
    };
  }

  //style: `background-image: url(${url});`,

  async render(id) {
    htmlGen.deleteEl(active.class);
    let response;
    if (!this.newModule) {
      response = await this.getModule(id);
      Object.assign(this, response);
    } else {
      response = await this.getModule(id, true);
      Object.assign(this, response);
    }

    if (!response && !this.newModule) {
      location.href = hashValues.home;
      return;
    }

    this.editHtml();

    let el = htmlGen.createEl(this);

    el.addEventListener("paste", (el) => {
      // Influences paste on the page
      el.preventDefault();
      let text = (el.originalEvent || el).clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    });

    // document.body.appendChild(el);
    document.querySelector("main").appendChild(el);
    htmlGen.toggleSpinner(false);

    this.titleCont = document.querySelector(".edit__module-title");
    this.cardsCont = document.querySelector(".edit__cards-container");
    this.title_err = document.getElementById("title-error");

    this.titleCont
      .querySelector(".textarea")
      .addEventListener("input", async (e) => {
        await this.editDraft();
      });

    this.cardsCont.addEventListener("click", (e) => {
      let searchBtn = e.target.closest(".edit__searchbar-icon");
      this.imagesSearch(searchBtn);
    });

    document.addEventListener("keydown", (e) => {
      let input = document.activeElement;
      if (
        e.keyCode === 13 &&
        input.classList.contains("edit__searchbar-input")
      ) {
        e.preventDefault();
        let searchBtn = input.parentNode.querySelector(".edit__searchbar-icon");
        this.imagesSearch(searchBtn);
      }
    });

    this.cardsCont.addEventListener("click", (e) => {
      let control = e.target.closest("[data-control_el=true]");
      if (control) {
        let window = control.parentNode.querySelector(".edit__gallery-window");
        let gallery = control.parentNode.querySelector(".edit__gallery");
        let dir = control.dataset.dir;
        this.moveGallery(gallery, window, dir, control);
      }
    });

    this.cardsCont.addEventListener("click", (e) => {
      let addimg = e.target.closest(".edit__addimg");
      let imgdel = e.target.closest(".edit__img-delete");
      let chooseImg = e.target.closest(".edit__gallery-item");
      if (addimg && !imgdel) {
        let imgSearchCont = addimg
          .closest(".edit__cards-card")
          .querySelector(".edit__img-search-container");
        imgSearchCont.classList.toggle("edit__img-search-container--active");
      } else if (imgdel) {
        let addImg = imgdel
          .closest(".edit__cards-card")
          .querySelector(".edit__addimg");

        addImg.dataset.imgurl = "false";
        addImg.style = `background-image: url()`;
      } else if (chooseImg) {
        let addImg = chooseImg
          .closest(".edit__cards-card")
          .querySelector(".edit__addimg");

        let imgurl = chooseImg.dataset.url;
        addImg.dataset.imgurl = imgurl;
        addImg.style = `background-image: url(${imgurl})`;
      }
    });

    /*
    
    class="edit__addimg" style="background-image: url(${
      imgurl !== "" ? imgurl : ""
    })" data-imgurl="${imgurl !== "" ? imgurl : "false"}">
    
    
    */

    this.cardsCont.addEventListener("transitionstart", (e) => {
      let element = e.target;
      if (element.classList.contains("edit__gallery")) {
        this.toggleAnimated(element);
      }
    });

    this.cardsCont.addEventListener("transitionend", (e) => {
      let element = e.target;
      if (element.classList.contains("edit__gallery")) {
        this.toggleAnimated(element);
      }
    });

    window.addEventListener("resize", (e) => {
      let prev = this.screenWidth;
      let curr = window.screen.width;

      if (
        (prev > 1000 && curr < 1000) ||
        (prev < 1000 && curr > 1000) ||
        (prev > 800 && curr < 800) ||
        (prev < 800 && curr > 800) ||
        (prev > 600 && curr < 600) ||
        (prev < 600 && curr > 600)
      ) {
        let window = document.querySelector(".edit__gallery-window");
        let leftCont = document.querySelectorAll(
          ".edit__gallery-control--right"
        );
        let rightCont = document.querySelectorAll(
          ".edit__gallery-control--left"
        );
        let galleryArr = document.querySelectorAll(".edit__gallery");

        let controlsArr = [];

        for (let i = 0; i < leftCont.length; i++) {
          controlsArr.push([leftCont[i], rightCont[i]]);
        }

        for (let i = 0; i < controlsArr.length; i++) {
          this.toggleControls(controlsArr[i], galleryArr[i], window);
          galleryArr[i].style.transform = "translateX(0px)";
        }
      }
      this.screenWidth = window.screen.width;
    });

    if (this.cards) {
      this.appendCards(this.cards);
      this.changeNumber();

      if (this.cardsCont.children.length < 3) {
        this.toggleDelete(false);
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        this.addCard();
      }
    }
  }

  async imagesSearch(searchBtn) {
    if (searchBtn && searchBtn.dataset.searching != "true") {
      let input = searchBtn.parentNode.querySelector(".edit__searchbar-input");
      let inquiry = input.value;
      if (inquiry === "") return;

      searchBtn.dataset.searching = "true";

      let imgSearch = searchBtn.closest(".edit__img-search");
      let gallery = imgSearch.querySelector(".edit__gallery");
      let window = imgSearch.querySelector(".edit__gallery-window");
      let galeryControls = imgSearch.querySelectorAll("[data-control_el=true]");
      let galleryContainer = imgSearch.querySelector(
        ".edit__gallery-container"
      );
      let spinnerContainer = imgSearch.querySelector(
        ".edit__spinner-container"
      );
      let errorContainer = imgSearch.querySelector(".edit__error-container");

      if (errorContainer.dataset.error === "true") {
        this.toggleHide(errorContainer, "edit__error-container");
      }
      this.toggleHide(spinnerContainer, "edit__spinner-container");

      if (gallery.children.length != 0) {
        this.toggleHide(galleryContainer, "edit__gallery-container");
        gallery.innerHTML = "";
        gallery.style.width = "0";
        gallery.style.transform = `translateX(0px)`;
      }

      let imagesArr = await this.getImages(inquiry);
      if (!imagesArr) {
        this.toggleHide(errorContainer, "edit__error-container");
        this.toggleHide(spinnerContainer, "edit__spinner-container");
        errorContainer.dataset.error = "true";
        searchBtn.dataset.searching = "false";

        return;
      }
      errorContainer.dataset.error = "false";

      let success = 0,
        err = 0;

      imagesArr.forEach((item) => {
        let figcap = htmlGen.createEl(this.galleryItemHtml(item.url));
        let img = figcap.querySelector("img");

        img.addEventListener("error", (e) => {
          err++;
          if (success + err == imagesArr.length) {
            searchBtn.dataset.searching = "false";
            this.formatGallery(gallery, success);
            this.toggleHide(galleryContainer, "edit__gallery-container");
            this.toggleHide(spinnerContainer, "edit__spinner-container");
            this.toggleControls(galeryControls, gallery, window);
          }
        });

        img.addEventListener("load", (e) => {
          success++;
          gallery.append(figcap);

          if (success + err == imagesArr.length) {
            searchBtn.dataset.searching = "false";
            this.formatGallery(gallery, success);
            this.toggleHide(galleryContainer, "edit__gallery-container");
            this.toggleHide(spinnerContainer, "edit__spinner-container");
            this.toggleControls(galeryControls, gallery, window);
          }
        });
      });
    }
  }

  formatGallery(gallery, itemNum) {
    let galleryWidth = 2 + 15 * itemNum + 2 * (itemNum - 1);
    gallery.style.width = `${galleryWidth}rem`;
  }

  moveGallery(gallery, window, dir, control) {
    if (gallery.dataset.animated === "true") return;
    if (control.dataset.active === "false") return;

    let galWidth = +getComputedStyle(gallery).width.replace(/px/, "");
    if (galWidth === 20) return;

    let winWidth = +getComputedStyle(window).width.replace(/px/, "");
    let position = +getComputedStyle(gallery)
      .transform.replace(/matrix|\s|\(|\)/g, "")
      .split(",")[4];

    let offset;
    if (dir === "right") {
      offset = -170;
    } else if (dir === "left") {
      offset = 170;
    }

    let newPosition = position + offset;
    if (newPosition >= 0) newPosition = 0;
    if (newPosition <= winWidth - galWidth) newPosition = winWidth - galWidth;
    gallery.style.transform = `translateX(${newPosition}px)`;
  }

  toggleControls(controls, gallery, window) {
    let width = +getComputedStyle(window).width.replace(/px/g, "");
    let itemsNum = gallery.children.length;
    if (width / 170 >= itemsNum) {
      controls.forEach((item) => {
        item.dataset.active = "false";
      });
    } else {
      controls.forEach((item) => {
        item.dataset.active = "true";
      });
    }
  }

  toggleAnimated(element) {
    element.dataset.animated === "false"
      ? (element.dataset.animated = "true")
      : (element.dataset.animated = "false");
  }

  toggleHide(element, className) {
    element.classList.toggle(className + "--hide");
  }

  async addCard(card = {}) {
    let newCard = this.cardHtml(card);

    let el = htmlGen.createEl(newCard);

    this.cardsCont.appendChild(el);

    if (this.cardsCont.children.length > 2) {
      this.toggleDelete(true);
    }

    this.changeNumber();

    el.querySelector(".edit__cards-delete").addEventListener(
      "click",
      async (e) => {
        if (this.cardsCont.children.length > 2) {
          el.parentNode.removeChild(el);

          this.changeNumber();

          if (this.cardsCont.children.length <= 2) {
            this.toggleDelete(false);
          }

          if (this.newModule) {
            await this.editDraft();
          }
        }
      }
    );

    if (this.newModule) {
      el.querySelector(".edit__cards-term")
        .querySelector(".textarea")
        .addEventListener("input", async (e) => {
          await this.editDraft();
        });

      el.querySelector(".edit__cards-definition-input")
        .querySelector(".textarea")
        .addEventListener("input", async (e) => {
          await this.editDraft();
        });

      let observer = new MutationObserver(async (records) => {
        await this.editDraft();
      });

      observer.observe(el.querySelector(".edit__addimg"), {
        attributes: true,
      });
    }

    if (this.newModule) {
      await this.editDraft();
    }
  }

  appendCards(arr) {
    arr.forEach((card) => {
      this.addCard(card);
    });
  }

  changeNumber() {
    let i = 1;
    this.cardsCont.querySelectorAll(".edit__cards-card").forEach((card) => {
      card.querySelector(".edit__cards-number").innerHTML = i;
      i++;
    });
  }

  toggleDelete(opt) {
    this.cardsCont
      .querySelectorAll(".edit__cards-delete")
      .forEach((deleteBTN) => {
        if (opt) {
          deleteBTN.classList.remove("edit__cards-delete-inactive");
        } else {
          deleteBTN.classList.add("edit__cards-delete-inactive");
        }
      });
  }

  //

  collectData(titleCont, cardsCont) {
    let title = titleCont.querySelector(".textarea").innerHTML;
    let cards = [...cardsCont.children].map((item) => {
      let term = item
        .querySelector(".edit__cards-term")
        .querySelector(".textarea").innerHTML;
      let defenition = item
        .querySelector(".edit__cards-definition-input")
        .querySelector(".textarea").innerHTML;
      let imgurl = item.querySelector(".edit__addimg").dataset.imgurl;
      let result = {
        term,
        defenition, // EDIT ... add ing url field
      };

      result.imgurl = imgurl !== "false" ? imgurl : "";

      return result;
    });

    return {
      title,
      cards,
    };
  }

  async edit(_id) {
    if (await this.isChanged(_id)) {
      let reqData = {
        _id,
        module: this.collectData(this.titleCont, this.cardsCont),
      };

      let httpParam = new HttpParam("POST", reqData, true);
      let response = await fetch(url + "/edit/edit", httpParam);

      if (response.status == 200) {
        console.log("Fire!");
        location.href = `${hashValues.module}?id=${_id}`;
        return;
      } else if (response.status == 500) {
        this.scrollToTop();
        this.errorTitle();
        return;
      }
    }

    location.href = `${hashValues.module}?id=${_id}`;
    return;
  }

  async isChanged(_id) {
    let reqData = {
      _id,
      module: this.collectData(this.titleCont, this.cardsCont),
    };

    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/edit/is_changed", httpParam);
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
    // return JSON.parse(await response.text());
  }

  async getModule(id, draft) {
    let reqData = {
      id,
      draft,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/edit/get_module", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }

  async getImages(inquiry) {
    let reqData = {
      inquiry,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    let response;
    try {
      response = await fetch(url + "/edit/imgsearch", httpParam);
      if (response.ok) return JSON.parse(await response.text());
    } catch (err) {
      console.log(err);
    }

    return false;
  }

  async saveModule() {
    clearTimeout(this.timer);

    let reqData = this.collectData(this.titleCont, this.cardsCont);

    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/edit/save_module", httpParam);

    if (response.status == 200) {
      location.href = hashValues.home;
    } else if (response.status == 500) {
      this.scrollToTop();
      this.errorTitle();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  errorTitle() {
    console.log("You must enter the title");
    this.title_err.innerHTML = "please enter a title to save your set.";
    this.title_err.classList.add("error");
    this.title_err.previousElementSibling.classList.add("error");
  }

  async editDraft() {
    clearTimeout(this.timer);

    this.timer = setTimeout(async () => {
      let draftData = this.collectData(this.titleCont, this.cardsCont);

      let counter = 0;

      for (let i in draftData.cards) {
        let item = draftData.cards[i];
        if (item.term.length >= 4 || item.defenition.length >= 4) {
          counter++;
        }
        if (counter == 2) break;
      }

      if (counter < 2) return;

      let reqData = {
        draftData,
      };

      let httpParam = new HttpParam("POST", reqData, true);
      let response = await fetch(url + "/edit/edit_draft", httpParam);
    }, 1000);
  }

  return() {
    if (this.newModule) {
      location.href = hashValues.home;
    } else {
      // console.log("Fire!");
      location.href = `${hashValues.module}?id=${this._id}`;
      // console.log(location.href);
    }
  }
}
