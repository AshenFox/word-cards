"use strict";

class Sign_up {
  constructor() {
    this.class = "modal";
    this.id = "active-modal";
    this.el;
    this.username = false;
    this.email = false;
    this.password = false;

    this.html = /*html*/ `
        
        <div class="modal__dialog">

            <div class="sign-up">

                <div class="modal__header">

                    <div class="modal__title">
                        <h3>Sign up</h3>
                    </div>
                    <div class="modal__close">
                      <svg height="17" width="17" fill="#fff">
                        <use href="img/sprite.svg#icon__close"></use>
                      </svg>
                    </div>

                </div>

                <div class="modal__content">
                    
                    <div class="modal__username-error"></div>
                    <label for="username" class="label">USERNAME:</label>
                    <input type="text" class="pad20-15 fz17 height4r br2 bc-none brc-grey f-brc-yellow mar-bottom20 username" id="username" placeholder="Enter a user name">

                    <div class="modal__email-error"></div>
                    <label for="email" class="label">EMAIL:</label>
                    <input type="email" class="pad20-15 fz17 height4r br2 bc-none brc-grey f-brc-yellow mar-bottom20 email" id="email" placeholder="Enter an email">
                
                    <div class="modal__password-error"></div>
                    <label for="password" class="label">PASSWORD:</label>
                    <input type="password" class="pad20-15 fz17 height4r br2 bc-none brc-grey f-brc-yellow mar-bottom20 password" id="password" placeholder="Enter a password">
                    
                    <div class="modal__sign-up" data-checking="false">
                        <button id="btn-sign-up" class="btn width100 bcc-lightblue pad15-30 brr5 fz175 white h-grey h-bcc-yellow inactive" onclick="modal.signup(modal.el)">
                          <span>Sign up</span>
                        </button>
                        <div class="modal__loading-spinner"></div>
                    </div>

                    <div class="modal__options">
                        <p>Already have an account?   <button class="btn white fz15 inline-block black h-yellow" onclick="htmlGen.log_in()">Log in!</button></p>
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
    setTimeout(() => {
      el.querySelector(".modal__dialog").classList.add("activated");
    }, 0);
    this.el = el;

    this.signUpBtn = document.querySelector(".modal__sign-up");
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

    this.usernameTimer = false;
    el.querySelector(".username").addEventListener("input", async (e) => {
      if (this.usernameTimer) {
        clearTimeout(this.usernameTimer);
      }

      this.usernameTimer = setTimeout(async () => {
        let errorEl = el.querySelector(".modal__username-error");
        let errValues = [];
        let input = document.getElementById("username");

        if (
          await this.checkValue(e.target.value, "/sign_up/min_length/username")
        ) {
          errValues.push(
            "Your username is too short. The minimum length is 5 characters."
          );
        }

        if (
          await this.checkValue(
            e.target.value,
            "/sign_up/invalid_char/username"
          )
        ) {
          errValues.push(
            "Your username may only contain latin letters or numbers."
          );
        }

        if (await this.checkValue(e.target.value, "/sign_up/user_exists")) {
          errValues.push("Username taken.");
        }

        if (e.target.value == "") {
          errValues = [];
          errValues.push("Please enter a username.");
        }

        if (this.createError(errorEl, errValues, input)) {
          this.username = true;
        } else {
          this.username = false;
        }

        this.signupToggle(el);
      }, 1000);
    });

    this.emailTimer = false;
    el.querySelector(".email").addEventListener("input", async (e) => {
      if (this.emailTimer) {
        clearTimeout(this.emailTimer);
      }

      this.emailTimer = setTimeout(async () => {
        let errorEl = el.querySelector(".modal__email-error");
        let errValues = [];
        let input = document.getElementById("email");

        if (await this.checkValue(e.target.value, "/sign_up/email_format")) {
          errValues.push("Invalid email format.");
        }

        if (await this.checkValue(e.target.value, "/sign_up/email_taken")) {
          errValues.push("This email has already been taken.");
        }

        if (e.target.value == "") {
          errValues = [];
          errValues.push("Please enter an email.");
        }

        if (this.createError(errorEl, errValues, input)) {
          this.email = true;
        } else {
          this.email = false;
        }

        this.signupToggle(el);
      }, 1000);
    });

    this.passwordTimer = false;
    el.querySelector(".password").addEventListener("input", async (e) => {
      if (this.passwordTimer) {
        clearTimeout(this.passwordTimer);
      }

      this.passwordTimer = setTimeout(async () => {
        let errorEl = el.querySelector(".modal__password-error");
        let errValues = [];
        let input = document.getElementById("password");

        if (await this.checkValue(e.target.value, "/sign_up/one_uppercase")) {
          errValues.push(
            "Your password must have at least one uppercase letter."
          );
        }

        if (
          await this.checkValue(e.target.value, "/sign_up/min_length/password")
        ) {
          errValues.push(
            "Your password is too short. The minimum length is 7 characters."
          );
        }

        if (
          await this.checkValue(
            e.target.value,
            "/sign_up/invalid_char/password"
          )
        ) {
          errValues.push(
            "Your password may only contain latin letters, numbers and special symbols."
          );
        }

        if (e.target.value == "") {
          errValues = [];
          errValues.push("Please enter a password.");
        }

        if (this.createError(errorEl, errValues, input)) {
          this.password = true;
        } else {
          this.password = false;
        }

        this.signupToggle(el);
      }, 1000);
    });
  }

  checkForModal() {
    let el = document.getElementById("active-modal");
    if (el) {
      el.parentNode.removeChild(el);
    }
  }

  createError(target, errValues, input) {
    // let el = document.createElement('ul');

    if (!errValues.length) {
      target.innerHTML = "";
      input.classList.add("border-green");

      return true;
    } else {
      target.innerHTML = "";

      if (input.classList.contains("border-green")) {
        input.classList.remove("border-green");
      }

      let el = document.createElement("ul");
      el.className = "modal__error-list";

      for (let x in errValues) {
        let li = document.createElement("li");
        li.innerHTML = errValues[x];
        el.appendChild(li);
      }

      target.appendChild(el);

      return false;
    }
  }

  // ===== User checks

  // minLength(str, length) {
  //     if (str.length <= length) return true;
  //     return false;
  // }

  httpParam(method, data, cred) {
    let obj = {
      method: method,
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(data),
    };
    if (cred) obj.credentials = "include";
    return obj;
  }

  async checkValue(str, route) {
    let reqData = {
      data: str,
    };

    let httpParam = new HttpParam("POST", reqData);

    let response = await fetch(url + route, httpParam);

    let resData = JSON.parse(await response.text());
    return resData.result;
  }

  // ===== Sign up

  async signup(el) {
    if (this.username && this.email && this.password) {
      this.signUpBtn.dataset.checking = true;

      let username = el.querySelector(".username");
      let email = el.querySelector(".email");
      let password = el.querySelector(".password");

      let reqData = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      let httpParam = new HttpParam("POST", reqData, true);

      let response = await fetch(url + "/sign_up/sign_up", httpParam);

      if (response.status == 200) {
        response = await fetch(url + "/log_in/log_in", httpParam);

        if (response.status == 200) {
          let data = JSON.parse(await response.text());

          console.log(data);

          localStorage.setItem("value", data.token);

          this.checkForModal();
          location.href = hashValues.home;
          htmlGen.startDashboard();
          return;
          // htmlGen.regularDashboard();
          // htmlGen.home();
        }
      }

      this.signUpBtn.dataset.checking = false;

      return;
    }
  }

  signupToggle(el) {
    let btn = document.getElementById("btn-sign-up");

    if (this.username && this.email && this.password) {
      if (btn.classList.contains("inactive")) {
        btn.classList.remove("inactive");
      }
    } else {
      if (!btn.classList.contains("inactive")) {
        btn.classList.add("inactive");
      }
    }
  }
}

// When u have username email and password active you still can send requsest although it doesn't fit the format
