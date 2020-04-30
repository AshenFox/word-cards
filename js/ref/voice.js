class Voice {
  constructor() {
    this.synth = window.speechSynthesis;

    if (this.synth.onvoiceschanged !== undefined) {
      let s = this.getVoices();
      s.then((result) => {
        this.voices = result;

        this.voices.forEach((voice) => {
          if (voice.name === "Google US English") this.english = voice;
          if (voice.name === "Google русский") this.russian = voice;
          if (/en.+US/.test(voice.lang) && !this.engBackup)
            this.engBackup = voice;
          if (/ru.+RU/.test(voice.lang) && !this.rusBackup)
            this.rusBackup = voice;
          console.log();
        });

        if (!this.engBackup && !this.rusBackup) {
          this.working = false;
        } else {
          this.working = true;
        }
        // console.log(this.english, this.russian, this.engBackup, this.rusBackup);
      });
    }
  }

  getVoices() {
    let synth = this.synth;

    return new Promise(function (resolve, reject) {
      let int;

      int = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(int);
        }
      }, 10);
    });
  }

  detectLanguage(text) {
    if (text !== "") {
      let length = text.length;
      let arrRus = text.match(/[а-яА-ЯЁё]/g);
      let arrEng = text.match(/[a-zA-Z]/g);

      if (!arrRus && !arrEng) return false;

      let lengthRus = arrRus ? arrRus.length : 0;
      let lengthEng = arrEng ? arrEng.length : 0;

      let lengthTotal = lengthRus + lengthEng;
      return lengthEng / lengthTotal > 0.5 ? "english" : "russian";
    } else {
      return false;
    }
  }

  filterText(text, lang) {
    let filtered = text.replace(/\(.+\)/g, "");
    if (lang === "english") {
      filtered = filtered.replace(/[а-яА-ЯЁё]/g, "");
    } else if (lang === "russian") {
      filtered = filtered.replace(/[a-zA-Z]/g, "");
    }
    filtered = filtered.replace(
      /[^A-Za-z0-9а-яА-ЯЁё\s][^A-Za-z0-9а-яА-ЯЁё]+[^A-Za-z0-9а-яА-ЯЁё\s]/g,
      ""
    );

    return filtered;
  }

  speak(text) {
    if (this.synth.speaking) {
      console.error("Already speaking...");
      return;
    }

    if (text !== "") {
      let language = this.detectLanguage(text);
      if (!language) return;

      let filteredText = this.filterText(text, language);

      const speakText = new SpeechSynthesisUtterance(filteredText);

      speakText.onend = (e) => {
        console.log("Done speaking...");
      };

      speakText.onerror = (e) => {
        console.log("Something vent wrong...");
      };

      if (language === "english") {
        if (this.english) {
          speakText.voice = this.english;
        } else if (this.engBackup) {
          speakText.voice = this.engBackup;
        } else {
          return;
        }
      } else if (language === "russian") {
        if (this.russian) {
          speakText.voice = this.russian;
        } else if (this.rusBackup) {
          speakText.voice = this.rusBackup;
        } else {
          return;
        }
      }

      speakText.rate = 1;
      speakText.pitch = 1;

      let int = setInterval(() => {
        if (!this.synth.speaking) {
          clearInterval(int);
        } else {
          this.synth.resume();
        }
      }, 10000);

      this.synth.speak(speakText);
      return speakText;
    }
  }

  cancel() {
    this.synth.cancel();
  }
}
