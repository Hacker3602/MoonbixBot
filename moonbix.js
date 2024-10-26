class MoonbixBot {
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    async run() {
        const intervalId = setInterval(async () => {
            // Try to find the main Play Game button
            let buttonPlayGame = await this.findButtonPlayGame();
            
            // If the main button is not found, try the alternative button
            if (!buttonPlayGame) {
                console.warn("Main Play Game button not found. Trying alternative button...");
                buttonPlayGame = await this.findAlternativeButtonPlayGame();
            }

            if (!buttonPlayGame) {
                console.warn("Alternative Play Game button not found. Continuing to search...");
                return; // Continue to the next iteration without stopping
            }

            this.forceClick(buttonPlayGame);
            await this.sleep(1000); // Optional sleep after clicking

            for (let i = 0; i < 50; i++) {
                await this.sleep(1000);
                this.simulateLeftClick(); // Simulate clicks on the canvas
            }

            this.findReturnButtonElementsAndClick();
            await this.sleep(1500); // Optional sleep after finding return button
        }, 5000); // Check every 5 seconds

        // No timeout, script will run indefinitely
    }

    async findButtonPlayGame() {
        const buttonSelector = "#__APP > div > div.Game_game__container__1I7MG.bg-cover.bg-center > div > div.w-full.relative.flex.flex-1.flex-col.gap-8.pt-4.justify-center.items-center > div.w-full.flex.flex-col > div > button";
        
        let button = document.querySelector(buttonSelector);

        // Check every 500ms until the button is found or timeout
        let retries = 10; // max 5 seconds
        while (!button && retries > 0) {
            await this.sleep(500);
            button = document.querySelector(buttonSelector);
            retries--;
        }

        return button;
    }

    async findAlternativeButtonPlayGame() {
        const alternativeButtonSelector = "#__APP > div > div.Game_game__container__1I7MG.bg-cover.bg-center > div > div.w-full.relative.flex.flex-1.flex-col.gap-8.pt-4.justify-center.items-center > div.w-full.flex.flex-col > div.bn-flex.flex-col.gap-4 > button";
        
        let button = document.querySelector(alternativeButtonSelector);

        // Check every 500ms until the alternative button is found or timeout
        let retries = 10; // max 5 seconds
        while (!button && retries > 0) {
            await this.sleep(500);
            button = document.querySelector(alternativeButtonSelector);
            retries--;
        }

        return button;
    }

    forceClick(element) {
        if (element) {
            const event = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            element.dispatchEvent(event);
        }
    }

    findReturnButtonElementsAndClick() {
        const svgs = document.getElementsByTagName("svg");
        for (let svg of svgs) {
            if (
                svg.outerHTML ===
                '<svg class="bn-svg absolute top-4 start-4 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.999 11.999l7.071-7.072 1.768 1.768-4.055 4.055H21v2.5H7.785l4.053 4.053-1.768 1.768L3 12v-.001z" fill="currentColor"></path></svg>'
            ) {
                this.forceClick(svg);
                break;
            }
        }
    }

    simulateLeftClick() {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            // Get the bounding box of the canvas to determine click position
            const rect = canvas.getBoundingClientRect();
            const x = rect.left + rect.width / 2; // Center of the canvas
            const y = rect.top + rect.height / 2; // Center of the canvas

            // Create mouse events
            const mouseDownEvent = new MouseEvent("mousedown", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y,
                button: 0, // Left mouse button
            });

            const mouseUpEvent = new MouseEvent("mouseup", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y,
                button: 0, // Left mouse button
            });

            const clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y,
                button: 0, // Left mouse button
            });

            // Dispatch the events
            canvas.dispatchEvent(mouseDownEvent);
            canvas.dispatchEvent(mouseUpEvent);
            canvas.dispatchEvent(clickEvent);
        } else {
            console.warn("Canvas element not found");
        }
    }
}

const moonBixBot = new MoonbixBot();
moonBixBot.run();
