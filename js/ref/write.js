class Write {
  constructor(id, number) {
    if (active.newModule) htmlGen.hideCreateModule();

    if (id) {
      this.regime = "usual";
    } else if (number && number > 0) {
      this.regime = "study";
    } else {
      this.regime = false;
    }

    this.class = "write";
    this.render(id, number);
  }

  gameHtml() {
    this.html = /*html*/ `
        
        <div class="container">
            <div class="game__main">

                <div class="game__controls-container">

                    <div class="game__controls">

                        <div class="game__back">
                            <button class="btn grey ai-c ta-l fz17 width100 pad15-20 h-bcc-yellow" onclick="active.return()">
                            
                                <svg height="15" width="15">
                                  <use href="img/sprite.svg#icon__triangle_left"></use>
                                </svg>
                                <span>Back</span>
                                
                            </button>
                        </div>

                        <div class="game__title">
                            <svg height="40" width="40">
                                <use href="img/sprite.svg#icon__write"></use>
                            </svg>
                            <span>Write</span>
                        
                        </div>


                        <div class="game__progress">
                          <div class="game__progress-item">
                            <div class="game__progress-bar full" id="bar-remaining">
                              <div class="game__bar-fill" style="width: 100%" id="fill-remaining"></div>
                            </div>
                            <div class="game__progress-info">

                              <div class="game__progress-title show">
                                  <span>remaining</span>
                              </div>

                              <div class="game__progress-count" >
                                  <span id="count-remaining">${this.number}</span>
                              </div>
                            </div>
                          </div>

                          <div class="game__progress-item">
                            <div class="game__progress-bar full red" id="bar-incorrect">
                              <div class="game__bar-fill red" style="width: 0%" id="fill-incorrect"></div>
                            </div>
                            <div class="game__progress-info">

                              <div class="game__progress-title show">
                                  <span>incorrect</span>
                              </div>

                              <div class="game__progress-count" >
                                  <span id="count-incorrect">0</span>
                              </div>
                            </div>
                          </div>

                          <div class="game__progress-item">
                            <div class="game__progress-bar full green" id="bar-correct">
                              <div class="game__bar-fill green" style="width: 0%" id="fill-correct"></div>
                            </div>
                            <div class="game__progress-info">
 
                              <div class="game__progress-title show">
                                  <span>correct</span>
                              </div>

                              <div class="game__progress-count">
                                  <span id="count-correct">0</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="game__control-buttons">

                            <div class="game__startover">
                                <button class="btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow h-brc-yellow" onclick="">
                                    <span>Options</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                
                <div class="game__content-container">

                    <div class="game__content">

                        <div class="game__components"></div>

                    </div>
                </div>
            </div>
        </div>
        `;
  }

  questionHtml({ defenition, imgurl }) {
    return {
      class: "game__question", // next transparent
      id: "",
      html: /*html*/ `
        <div class="game__question-dontknow">
          <span>Don't know</span>
        </div>
        <div class="game__question-img ${
          imgurl === "" ? "hidden" : ""
        }" style="background-image: url(${imgurl !== "" ? imgurl : ""});"></div>
        <div class="game__question-defenition">
          <p>${defenition}</p>
          <div class="game__speaker-write relative" data-active="${
            voice.working &&
            defenition !== "" &&
            voice.detectLanguage(defenition)
              ? "true"
              : "false"
          }">
            <svg height="22" width="22">
              <use href="img/sprite.svg#icon__speaker"></use>
            </svg>
          </div>
        </div>
        <form action="" class="game__form">
          <fieldset class="game__form-fieldset">
            <div class="game__form-input">
              <input type="text" id="write-input"/>
            </div>
            
            <label for="write-input">type the answer</label>
          </fieldset>
          <div class="game__form-btn-container">
            <button class="btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow">Answer</button>
          </div>
        </form>
      `,
    };
  }

  answerHtml({ term, defenition, imgurl }, correct, answer) {
    let type = {};
    if (correct) {
      type.name = "Correct";
      type.id = 1;
    } else {
      if (answer !== "") {
        type.name = "Incorrect";
        type.id = 2;
      } else {
        type.name = "Copy answer";
        type.id = 3;
      }
    }

    let termLang = voice.detectLanguage(term);
    let defLang = voice.detectLanguage(defenition);

    if (term === "") term = false;
    if (defenition === "") defenition = false;
    if (imgurl === "") imgurl = false;

    return {
      class: "game__answer", // next transparent
      id: "",
      html: /*html*/ `
        <h1 class="game__answer-type ${correct ? "correct" : "incorrect"}">${
        type.name
      }</h1>

        <div class="game__answer-main">
          <!-- Defenition -->
          <div class="game__answer-section ${
            !imgurl && !defenition ? "hidden" : ""
          }">
            <span class="game__section-title">Defenition</span>
            <div class="game__section-img ${
              !imgurl ? "hidden" : ""
            }" style="background-image: url(${!imgurl ? "" : imgurl});"></div>
            <div class="game__section-body ${defenition ? "" : "hidden"}">
              <p class="game__section-text">${defenition}</p>
              <div class="game__speaker-write relative" data-active="${
                voice.working && defLang ? "true" : "false"
              }">
                <svg height="22" width="22">
                  <use href="img/sprite.svg#icon__speaker"></use>
                </svg>
              </div>
            </div>
          </div>

          <!-- You said -->
          <div class="game__answer-section ${type.id === 2 ? "" : "hidden"}">
            <span class="game__section-title">You said</span>
            <div class="game__section-body">
              <p class="game__section-text">${answer}</p>
              <div class="game__override">
                <button class="btn fz15 fw-normal lightblue h-yellow">Override: I was right</button>
              </div>
              
            </div>
          </div>

          <!-- Correct -->
          <div class="game__answer-section">
            <span class="game__section-title">Correct</span>
            <div class="game__section-body ${term ? "" : "hidden"}">
              <p class="game__section-text">${term}</p>
              <div class="game__speaker-write relative" data-active="${
                voice.working && termLang ? "true" : "false"
              }">
                <svg height="22" width="22">
                  <use href="img/sprite.svg#icon__speaker"></use>
                </svg>
              </div>
            </div>
          </div>

          <!-- Input -->
          <form action="" class="game__form ${type.id === 3 ? "" : "hidden"}">
            <fieldset class="game__form-fieldset">
              <div class="game__form-input" data-correct="false">
                <input type="text" id="write-input"/>
              </div>
              <label for="write-input">copy answer</label>
            </fieldset>
          </form>

        </div>

        <div class="game__answer-continue" data-correct="${
          correct || type.id === 2 ? "true" : "false"
        }">
          <button class="btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow">Click to continue</button>
        </div>
      `,
    };
  }

  roundHtml(data) {
    let {
      allCards,
      cardsInRound,
      correctInRound,
      incorrectInRound,
      allCorrect,
    } = data;

    return {
      class: "game__round", // next transparent
      id: "",
      html: /*html*/ `
        <h1 class="game__round-title">
          <span>Round </span><span>${this.round.number}</span>
        </h1>
        <div class="game__round-body">
      
          <div class="game__score-field game__score-field--correct">
            <span class="game__score-title">Correct</span>
            <span class="game__score-number">${correctInRound}</span>
            <span class="game__score-percent">${Math.round(
              (correctInRound / cardsInRound) * 100
            )}%</span>
          </div>
      
          <div class="game__score-field game__score-field--incorrect">
            <span class="game__score-title">Incorrect</span>
            <span class="game__score-number">${incorrectInRound}</span>
            <span class="game__score-percent">${Math.round(
              (incorrectInRound / cardsInRound) * 100
            )}%</span>
          </div>
      
          <div class="game__score-field">
            <span class="game__score-title">Overall progress</span>
            <span class="game__score-number">${allCorrect}/${allCards}</span>
            <span class="game__score-percent">${Math.round(
              (allCorrect / allCards) * 100
            )}%</span>
          </div>
      
        </div>
      
        <div class="game__round-continue">
          <button class="btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow">Tap to continue</button>
        </div>
      `,
    };
  }

  finishHtml({ correctInRound, cardsInRound, roundNumber }) {
    return {
      class: "game__finish", // next transparent
      id: "",
      html: /*html*/ `
      <div class="game__finish-header">
        <div class="game__finish-header-item">
          <h1 class="game__finish-title">Round ${roundNumber}</h1>
          <h3 class="game__finish-round-stats">${correctInRound}/${cardsInRound} - ${Math.round(
        (correctInRound / cardsInRound) * 100
      )}%</h3>
        </div>
        <div class="game__finish-header-item ${
          this.regime ? "hidden" : "sdfsd"
        }">
          <button class="btn bcc-lightblue pad10-30 brr5 white fz15 fw-normal h-grey h-bcc-yellow" onclick="active.startOver()">Start over</button>
        </div>
      </div>
    
      <div class="game__finish-body"></div>
      `,
    };
  }

  finishItemHtml({ correct, card: { term, defenition, imgurl }, number }) {
    if (term === "") term = false;
    if (defenition === "") term = false;
    if (imgurl === "") term = false;

    return {
      class: "game__finish-body-item", // next transparent
      id: "",
      html: /*html*/ `
      <div class="game__finish-body-left">
        <div class="game__finish-icon ${
          correct
            ? "game__finish-icon--correct"
            : "game__finish-icon--incorrect"
        }">
          <svg height="22" width="22">
            <use href="img/sprite.svg#icon__${
              correct ? "tick" : "close"
            }"></use>
          </svg>
        </div>
        <div class="game__finish-term ${
          correct
            ? "game__finish-term--correct"
            : "game__finish-term--incorrect"
        }">
          <span>${number}.</span><span>${term ? term : ""}</span>
        </div>
      </div>

      <div class="game__finish-body-right">
        <div class="game__finish-defenition">
          <p>${defenition ? defenition : ""}</p>
          <div class="game__finish-img ${
            imgurl ? "" : "hidden"
          }" style="background-image: url(${imgurl ? imgurl : ""});"></div>
        </div>
      </div>
      `,
    };
  }

  question() {
    this.gameComponents.innerHTML = "";
    this.round.status = "question";
    let { curCard } = this.round;
    let html = this.questionHtml(curCard);
    let el = htmlGen.createEl(html);
    this.gameComponents.prepend(el);
    document.querySelector(".game__form-input input").focus();
    // setTimeout(() => {
    //   document.querySelector(".game__form-input input").focus();
    // }, 0);
  }

  answer(correct, answer) {
    this.gameComponents.innerHTML = "";
    this.round.status = "answer";
    this.round.answerValue = answer;
    correct
      ? (this.round.answer = "correct")
      : (this.round.answer = "incorrect");

    this.saveAnswer();
    this.setProgress();

    let { curCard } = this.round;
    let html = this.answerHtml(curCard, correct, answer);
    let el = htmlGen.createEl(html);
    this.gameComponents.prepend(el);
    let input = document.querySelector(".game__form-input input");
    if (input) input.focus();
  }

  override() {
    let round = this.round;

    round.incorrect.number--;
    round.incorrect.cards.pop();
    round.allAnswers.pop();
    round.answer = "correct";
  }

  saveAnswer() {
    let round = this.round;

    if (round.answer === "correct") {
      round.correct.number++;
      round.correct.cards.push(round.curCard);
      let number = round.allAnswers.length + 1;
      round.allAnswers.push({ correct: true, card: round.curCard, number });
    } else if (round.answer === "incorrect") {
      round.incorrect.number++;
      round.incorrect.cards.push(round.curCard);
      let number = round.allAnswers.length + 1;
      round.allAnswers.push({ correct: false, card: round.curCard, number });
    }
  }

  setProgress() {
    let {
      allCards,
      allCorrect,
      cardsInRound,
      incorrectInRound,
      correctInRound,
    } = this.collectRoundData();

    this.fillCorrect.style = `width: ${Math.round(
      (allCorrect / allCards) * 100
    )}%`;
    this.fillIncorrect.style = `width: ${Math.round(
      (incorrectInRound / allCards) * 100
    )}%`;
    this.fillRemaining.style = `width: ${Math.round(
      ((cardsInRound - incorrectInRound - correctInRound) / allCards) * 100
    )}%`;

    this.countCorrect.textContent = allCorrect;
    this.countIncorrect.textContent = incorrectInRound;
    this.countRemaining.textContent =
      cardsInRound - incorrectInRound - correctInRound;
  }

  async continue(override) {
    let round = this.round;

    if (this.round.number === 1) {
      if (this.round.answer === "correct" || override) {
        await this.sendAnswer(true);
        console.log("correct", this.round.curCard._id);
      } else if (this.round.answer === "incorrect") {
        await this.sendAnswer(false);
        console.log("incorrect", this.round.curCard._id);
      }
    }

    // if (override) round.answer = "correct";

    if (override) {
      this.override();
      this.saveAnswer();
      this.setProgress();
    }

    round.answer = false;
    round.status = false;

    if (round.curCardInd < round.cards.length - 1) {
      round.curCardInd++;
      round.curCard = round.cards[round.curCardInd];
      this.question();
    } else {
      let { allCards, allCorrect } = this.collectRoundData();
      if (allCards === allCorrect) {
        this.finishGame();
      } else {
        this.finishRound();
      }
    }
  }

  finishRound() {
    this.gameComponents.innerHTML = "";

    let html = this.roundHtml(this.collectRoundData());
    let el = htmlGen.createEl(html);
    this.gameComponents.prepend(el);
  }

  nextRound() {
    let newRoundCards = this.round.incorrect.cards;
    this.createRound(newRoundCards);
    this.setProgress();
    this.question();
  }

  finishGame() {
    this.gameComponents.innerHTML = "";

    this.rounds.forEach((round) => {
      let data = this.collectRoundData(round);
      let html = this.finishHtml(data);
      let el = htmlGen.createEl(html);
      let finishBody = el.querySelector(".game__finish-body");

      data.allAnswers.forEach((answer) => {
        let html = this.finishItemHtml(answer);
        let el = htmlGen.createEl(html);
        finishBody.append(el);
      });

      this.gameComponents.append(el);
    });
  }

  startOver() {
    if (modal) {
      htmlGen.deleteEl("modal");
      modal = false;
    }

    this.gameComponents.innerHTML = "";
    this.round = false;
    this.rounds = false;
    this.createRound(this.cards);
    this.setProgress();
    this.question();
  }

  collectRoundData(round = this.round) {
    let result = {
      allCards: this.number,
      cardsInRound: round.cards.length,
      correctInRound: round.correct.number,
      incorrectInRound: round.incorrect.number,
      allAnswers: round.allAnswers,
      roundNumber: round.number,
    };

    let allCorrect = 0;
    this.rounds.forEach((round) => {
      allCorrect += round.correct.number;
    });

    result.allCorrect = allCorrect;
    return result;
  }

  createRound(arr) {
    let cards = this.shuffleCards(arr);

    if (!this.rounds) this.rounds = [];
    let round = {
      number: this.rounds.length + 1,
      cards,
      curCardInd: 0,
      curCard: cards[0],
      status: false,
      answer: false,
      answerValue: false,
      correct: {
        number: 0,
        cards: [],
      },
      incorrect: {
        number: 0,
        cards: [],
      },
      allAnswers: [],
    };
    this.rounds.push(round);
    this.round = round;
  }

  async render(id, number) {
    htmlGen.deleteEl(active.class);
    htmlGen.toggleGameButtons(true, this.regime === "study");

    if (this.regime === "usual") {
      let response = await this.getModule(id);
      if (!response) {
        location.href = hashValues.home;
        return;
      }

      Object.assign(this, response);

      this.cards = await this.getCards(this._id);
    } else if (this.regime === "study") {
      let response = await this.getCardsSR();

      Object.assign(this, response);

      if (this.repeat.length < number) number = this.repeat.length;
      this.cards = this.repeat.slice(0, number);
      this.number = number;
    } else {
      htmlGen.toggleGameButtons(false);
      location.href = hashValues.home;
      return;
    }

    // let response = await this.getModule(id);
    // if (!response) {
    //   location.href = hashValues.home;
    //   return;
    // }

    // Object.assign(this, response);

    // this.cards = await this.getCards(this._id);

    this.gameHtml();

    let el = htmlGen.createEl(this);

    // document.body.append(el);
    main.appendChild(el);
    htmlGen.toggleSpinner(false);

    this.createRound(this.cards);

    this.gameComponents = document.querySelector(".game__components");
    this.gameControls = document.querySelector(".game__controls");
    // -------------------------------
    this.fillRemaining = document.querySelector("#fill-remaining");
    this.countRemaining = document.querySelector("#count-remaining");
    this.fillIncorrect = document.querySelector("#fill-incorrect");
    this.countIncorrect = document.querySelector("#count-incorrect");
    this.fillCorrect = document.querySelector("#fill-correct");
    this.countCorrect = document.querySelector("#count-correct");
    // -------------------------------

    this.setProgress();
    this.question();

    this.gameComponents.addEventListener("click", async (e) => {
      e.preventDefault();
      let target = e.target;

      // Don't know btn pressed
      if (target.closest(".game__question-dontknow span")) {
        this.answer(false, "");
      }

      // Input the aswer
      if (target.closest(".game__form-btn-container button")) {
        let value = target
          .closest(".game__form")
          .querySelector(".game__form-input input").value;

        let result = this.checkAnswer(value);
        this.answer(result, value);
      }

      // Override answer
      if (target.closest(".game__override button")) {
        await this.continue(true);
      }

      // Continue to the next question
      if (target.closest(".game__answer-continue button")) {
        if (
          target.closest(".game__answer-continue").dataset.correct === "false"
        )
          return;
        await this.continue(false);
      }

      // Continue to the next round
      if (target.closest(".game__round-continue button")) {
        this.nextRound();
      }

      // -------------------------------------------
      // Voice
      let speaker = e.target.closest(".game__speaker-write[data-active=true]");
      if (speaker && !voice.synth.speaking) {
        let parent = speaker.closest(".game__question-defenition");
        if (!parent) parent = speaker.closest(".game__section-body");

        let text;
        if (parent) text = parent.querySelector("p").textContent;

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

    this.gameControls.addEventListener("click", (e) => {
      let target = e.target;

      // Open options
      if (target.closest(".game__startover button")) {
        htmlGen.options();
      }
    });

    this.gameComponents.addEventListener("input", (e) => {
      e.preventDefault();
      let target = e.target;
      let gameAnswer = target.closest(".game__answer");
      if (gameAnswer) {
        let value = target.value;
        let inputCont = gameAnswer.querySelector(".game__form-input");
        let btnCont = gameAnswer.querySelector(".game__answer-continue");

        if (value === this.round.curCard.term) {
          inputCont.dataset.correct = true;
          btnCont.dataset.correct = true;
        } else {
          inputCont.dataset.correct = false;
          btnCont.dataset.correct = false;
        }
      }
    });

    this.gameComponents.addEventListener("keydown", (e) => {});

    window.addEventListener("keydown", async (e) => {
      let { status, answer, answerValue, allAnswers, cards } = this.round;

      // Input the aswer
      if (e.keyCode === 13 && status === "question") {
        e.preventDefault();

        let input = document.activeElement;
        if (input.id !== "write-input") return;

        let value = input.value;
        let result = this.checkAnswer(value);
        this.answer(result, value);
        return;
      }

      // Input copied answer
      if (e.keyCode === 13 && status === "answer") {
        e.preventDefault();

        let gameAnsBtn = document.querySelector(".game__answer-continue");
        if (gameAnsBtn.dataset.correct !== "true") return;

        await this.continue(false);
        return;
      }

      // Continue
      if (
        status === "answer" &&
        (answer === "correct" ||
          (answer === "incorrect" && answerValue !== "")) &&
        e.keyCode === 13
      ) {
        e.preventDefault();
        await this.continue(false);
        return;
      }

      // Next round
      if (allAnswers.length === cards.length && e.keyCode === 13) {
        e.preventDefault();
        this.nextRound();
        return;
      }

      // Override
      if (
        status === "answer" &&
        answer === "incorrect" &&
        answerValue !== "" &&
        e.keyCode === 79
      ) {
        e.preventDefault();
        await this.continue(true);
        return;
      }
    });

    // this.progressCount = document.querySelectorAll(
    //   ".game__progress-count span"
    // )[0];
    // this.progressBar = document.querySelector(".game__bar-fill");

    // this.gameControls.addEventListener("click", (e) => {});
  }

  checkAnswer(answer) {
    if (answer === this.round.curCard.term) return true;
    return false;
  }

  shuffleCards(arr) {
    let cards = [...arr];
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards;
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

  async getCardsSR() {
    let httpParam = new HttpParam("GET", false, true);
    let response = await fetch(url + "/study_regime/get_cards", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }

  async sendAnswer(answer) {
    let reqData = {
      _id: this.round.curCard._id,
      answer,
    };
    let httpParam = new HttpParam("POST", reqData, true);
    let response = await fetch(url + "/study_regime/answer", httpParam);
    if (response.ok) return JSON.parse(await response.text());
    return false;
  }

  return() {
    location.href = `${hashValues.module}?id=${this._id}`;
  }

  end() {
    console.log("Saving and sending statistcs...");
    location.href = `${hashValues.module}?id=${this._id}`;
  }
}
