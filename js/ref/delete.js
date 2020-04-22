class Delete {
    constructor() {
        this.class = "modal";
        this.id = "active-modal";
        this.el;

        this.html = /*html*/ `

		<div class="modal__dialog">
            
            <div class="delete-set">

                <div class="modal__header">
                    <div class="modal__title">
                        <h3>Delete this set?</h3>
                    </div>
                    <div class="modal__close">
                        <img src="./img/close.svg" alt="" height="15" width="15">
                    </div>
                </div>

                <div class="modal__content">

                    <div class="modal__set-title">
						<h2>A few words per day 24</h2>
					</div>

					<div class="modal__warning">
						<p>You are about to delete this set and all of its data. You won't be able to access this set ever again.</p>
					</div>

					<div class="modal__question">
						<p>Are you absolutely positive? There's no undo.</p>
					</div>
                    
                    

					<div class="modal__choice">
						<div class="modal__choice-item">
							<button class="btn width100 bcc-mudblue pad15-30 brr5 fz175 white h-opacity09" onclick="modal.checkForModal();">
								Cancel
							</button>
						</div>
						
						<div class="modal__choice-item">
							<button class="btn width100 bcc-coral pad15-30 brr5 fz175 white h-opacity09" onclick="active.deleteModule(active._id);modal.checkForModal();">
								Yes, delete set
							</button>
						</div>
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

        // Close modal

        el.querySelector(".modal__close").addEventListener("mousedown", () => {
            htmlGen.deleteEl(this.class);
            modal = false;
        });

        el.addEventListener("mousedown", e => {
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
}
