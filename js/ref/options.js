class Options {
    constructor() {
        this.class = "modal";
        this.id = "active-modal";
        this.el;

        this.html = /*html*/ `

		<div class="modal__dialog">
            
            <div class="delete-set">

                <div class="modal__header">
                    <div class="modal__title">
                        <h3>Options</h3>
                    </div>
                    <div class="modal__close">
                        <img src="./img/close.svg" alt="" height="15" width="15">
                    </div>
                </div>

                <div class="modal__content">

                        <div class="game__method">
                            <div class="game__method-tilte">
                                Answer with:
                            </div>
                            <button class="btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow" onclick="active.methodMenuToggle();">
                                
                                <svg height="13" width="13" viewBox="0 0 512 512" >
                                    <g>
                                        <path d="M506.157,132.386c-7.803-7.819-20.465-7.831-28.285-0.029l-207.73,207.299c-7.799,7.798-20.486,7.797-28.299-0.015
                                            L34.128,132.357c-7.819-7.803-20.481-7.79-28.285,0.029c-7.802,7.819-7.789,20.482,0.029,28.284l207.701,207.27
                                            c11.701,11.699,27.066,17.547,42.433,17.547c15.358,0,30.719-5.846,42.405-17.533L506.128,160.67
                                            C513.946,152.868,513.959,140.205,506.157,132.386z"/>
                                    </g>
                                </svg>
                                <span>Term</span>

                                
                                
                            </button>
                            <div class="game__method-menu-container-modal hidden">
                                <div class="game__method-menu">
                                    <div class="game__method-menu-item">
                                        <span>Term</span>
                                    </div>
                                    <div class="game__method-menu-item">
                                        <span>Defenition</span>
                                    </div>
                                </div>
                            </div>

                            
                            
                        </div>

                        <div class="game__shuffle-modal">
                            <button class="btn width100 fz15 pad7 br2 brc-grey-medium brr5 lightblue h-yellow" onclick="active.toggleShuffle(modal.cardShuffle);">

                                <svg height="20" width="20" viewBox="0 0 512 512">
                                    
                                    <g>
                                        <path d="M506.24,371.7l-96-80c-4.768-4-11.424-4.8-17.024-2.208c-5.632,2.656-9.216,8.288-9.216,14.496v48h-26.784
                                            c-22.208,0-42.496-11.264-54.272-30.08l-103.616-165.76c-23.52-37.664-64.096-60.16-108.544-60.16H0v64h90.784
                                            c22.208,0,42.496,11.264,54.272,30.08l103.616,165.76c23.552,37.664,64.128,60.16,108.544,60.16H384v48
                                            c0,6.208,3.584,11.84,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.248,10.24-3.712l96-80
                                            c3.68-3.04,5.76-7.552,5.76-12.288C512,379.252,509.92,374.74,506.24,371.7z"/>
                                    </g>
                                    <g>
                                        <path d="M506.24,115.7l-96-80c-4.768-3.968-11.424-4.8-17.024-2.176C387.584,36.116,384,41.78,384,47.988v48h-26.784
                                            c-44.448,0-85.024,22.496-108.544,60.16l-5.792,9.28l37.728,60.384l22.336-35.744c11.776-18.816,32.064-30.08,54.272-30.08H384v48
                                            c0,6.208,3.584,11.872,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.28,10.24-3.712l96-80
                                            c3.68-3.04,5.76-7.552,5.76-12.288C512,123.252,509.92,118.74,506.24,115.7z"/>
                                    </g>
                                    <g>
                                        <path d="M167.392,286.164l-22.304,35.744c-11.776,18.816-32.096,30.08-54.304,30.08H0v64h90.784
                                            c44.416,0,84.992-22.496,108.544-60.16l5.792-9.28L167.392,286.164z"/>
                                    </g>
                                    
                                </svg>
                                <span>Shuffle</span>
                            </button>
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

        this.cardShuffle = document.querySelector(".game__shuffle-modal");
        this.methodMenu = document.querySelector(
            ".game__method-menu-container-modal"
        );

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

    // methodMenuToggle() {
    //     modal.methodMenu.classList.toggle('hidden');

    //     if(active.methodMenu.classList.contains('hidden')) {
    //         setTimeout(() => {
    //             document.removeEventListener('click', active.methodMenuToggle);
    //         }, 0);

    //     } else {
    //         setTimeout(() => {
    //             document.addEventListener('click', active.methodMenuToggle);
    //         }, 0);
    //     }
    // }
}
