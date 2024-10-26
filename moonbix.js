class MoonbixBot {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run() {
        const intervalId = setInterval(async () => {
            const buttonPlayGame = await this.findButton("#__APP > div > div.Game_game__container__1I7MG.bg-cover.bg-center > div > div.w-full.relative.flex.flex-1.flex-col.gap-8.pt-4.justify-center.items-center > div.w-full.flex.flex-col > div > button");
            if (!buttonPlayGame) return console.warn("Play Game button not found");

            buttonPlayGame.click();
            await this.sleep(1000);

            for (let i = 0; i < 50; i++) {
                await this.sleep(1000);
                this.simulateClickOnCanvas();
            }

            this.clickReturnButton();

            await this.sleep(1500);
        }, 1000);

        setTimeout(() => clearInterval(intervalId), 300000);
    }

    async findButton(selector) {
        let button = document.querySelector(selector);
        for (let i = 0; !button && i < 10; i++) {
            await this.sleep(500);
            button = document.querySelector(selector);
        }
        return button;
    }

    clickReturnButton() {
        const svg = Array.from(document.getElementsByTagName("svg")).find(svg => 
            svg.outerHTML === '<svg class="bn-svg absolute top-4 start-4 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.999 11.999l7.071-7.072 1.768 1.768-4.055 4.055H21v2.5H7.785l4.053 4.053-1.768 1.768L3 12v-.001z" fill="currentColor"></path></svg>'
        );
        if (svg) svg.click();
    }

    simulateClickOnCanvas() {
        const canvas = document.querySelector("canvas");
        if (!canvas) return console.warn("Canvas not found");

        const { left, top, width, height } = canvas.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;

        canvas.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, clientX: x, clientY: y }));
        canvas.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, clientX: x, clientY: y }));
        canvas.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: x, clientY: y }));
    }
}

const moonBixBot = new MoonbixBot();
moonBixBot.run();
