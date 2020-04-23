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
                        <button class="btn bcc-lightblue pad12-30 brr10 white fz15 fw-normal h-grey h-bcc-yellow" type="button" onclick="active.newModule ? htmlGen.home() : htmlGen.module(active._id)">
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
                            <svg width="17" height="17" viewBox="0 0 612.002 612.002">
                                <g>
                                    <path d="M540.346,19.437H389.4C388.323,8.529,379.114,0,367.917,0H244.084c-11.201,0-20.405,8.529-21.489,19.437H71.655
                                        c-11.93,0-21.599,9.669-21.599,21.602v41.036c0,11.934,9.669,21.6,21.599,21.6h468.691c11.93,0,21.599-9.667,21.599-21.6V41.04
                                        C561.945,29.106,552.276,19.437,540.346,19.437z"/>
                                    <path d="M95.34,590.403c0,11.923,9.665,21.599,21.599,21.599h378.127c11.934,0,21.599-9.674,21.599-21.599V145.167H95.34V590.403z
                                        "/>
                                </g>
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
                                <svg viewBox="0 0 426.667 426.667">
                                  <path d="M42.667,85.333H0V384c0,23.573,19.093,42.667,42.667,42.667h298.667V384H42.667V85.333z"/>
                                  <path d="M384,0H128c-23.573,0-42.667,19.093-42.667,42.667v256c0,23.573,19.093,42.667,42.667,42.667h256
                                      c23.573,0,42.667-19.093,42.667-42.667v-256C426.667,19.093,407.573,0,384,0z M128,298.667l64-85.333l43.307,57.813L298.667,192
                                      L384,298.667H128z"/>
                                </svg>
                            </div>
                            <div class="edit__img-delete">
                              <svg viewBox="0 0 612.002 612.002">
                                  <g>
                                      <path d="M540.346,19.437H389.4C388.323,8.529,379.114,0,367.917,0H244.084c-11.201,0-20.405,8.529-21.489,19.437H71.655
                                          c-11.93,0-21.599,9.669-21.599,21.602v41.036c0,11.934,9.669,21.6,21.599,21.6h468.691c11.93,0,21.599-9.667,21.599-21.6V41.04
                                          C561.945,29.106,552.276,19.437,540.346,19.437z"/>
                                      <path d="M95.34,590.403c0,11.923,9.665,21.599,21.599,21.599h378.127c11.934,0,21.599-9.674,21.599-21.599V145.167H95.34V590.403z
                                          "/>
                                  </g>
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
                          <svg viewBox="0 0 31.49 31.49">
                          <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111
                            C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587
                            c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/>
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
                            <svg viewBox="0 0 490.661 490.661">
                              
                              <path d="M453.331,1.424c-3.307-1.899-7.381-1.899-10.688,0L37.309,236.091c-3.285,1.92-5.312,5.44-5.312,9.237
                                  s2.027,7.317,5.312,9.237l405.333,234.667c1.664,0.96,3.499,1.429,5.355,1.429c1.835,0,3.691-0.469,5.333-1.429
                                  c3.285-1.899,5.333-5.419,5.333-9.237V10.661C458.664,6.843,456.616,3.323,453.331,1.424z"/>
                                    
                            </svg>
                        </button>
                        
                        </div>
                        <div class="edit__gallery-window">
                          <div class="edit__gallery" data-animated="false">
                            
                          </div>
                        </div>
                        <div class="edit__gallery-control--right" data-control_el="true" data-active="true" data-dir="right">
                        
                          <button class="btn pad15 bcc-white brr50p d-f h-bcc-yellow p-r" onclick="">
                            <svg viewBox="0 0 490.661 490.661">
                                <g>
                                    <g>
                                        <path d="M453.352,236.091L48.019,1.424c-3.285-1.899-7.36-1.899-10.688,0c-3.285,1.899-5.333,5.419-5.333,9.237v469.333
                                            c0,3.819,2.048,7.339,5.333,9.237c1.643,0.939,3.499,1.429,5.333,1.429c1.856,0,3.691-0.469,5.355-1.429l405.333-234.667
                                            c3.285-1.92,5.312-5.44,5.312-9.237S456.637,237.989,453.352,236.091z"/>
                                    </g>
                                </g>
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

    if (!this.newModule) {
      let response = await this.getModule(id);
      Object.assign(this, response);
    } else {
      let response = await this.getModule(id, true);
      Object.assign(this, response);
    }

    this.editHtml();

    let el = htmlGen.createEl(this);

    el.addEventListener("paste", (el) => {
      // Influences paste on the page
      el.preventDefault();
      let text = (el.originalEvent || el).clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    });

    htmlGen.toggleSpinner();
    document.body.appendChild(el);

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
        htmlGen.module(_id);
        return;
      } else if (response.status == 500) {
        this.scrollToTop();
        this.errorTitle();
        return;
      }
    }

    htmlGen.module(_id);
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
    return JSON.parse(await response.text());
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
      htmlGen.home();
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
}

/*

<div class="edit__gallery-item edit__gallery-item--1"></div>
<div class="edit__gallery-item edit__gallery-item--2"></div>
<div class="edit__gallery-item edit__gallery-item--3"></div>
<div class="edit__gallery-item edit__gallery-item--4"></div>
<div class="edit__gallery-item edit__gallery-item--5"></div>
<div class="edit__gallery-item edit__gallery-item--6"></div>
<div class="edit__gallery-item edit__gallery-item--7"></div>
<div class="edit__gallery-item edit__gallery-item--8"></div>
<div class="edit__gallery-item edit__gallery-item--9"></div>
<div class="edit__gallery-item edit__gallery-item--10"></div>
<div class="edit__gallery-item edit__gallery-item--11"></div>
<div class="edit__gallery-item edit__gallery-item--12"></div>

*/
