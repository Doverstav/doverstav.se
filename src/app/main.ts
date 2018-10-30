import { CanvasRenderer } from "./canvasRender/CanvasRenderer";
import { Palette } from "./util/Palette";
import { PaletteUtil } from "./util/PaletteUtil";

export class Main {
    main() {
        let canvasRenderer = new CanvasRenderer(window.innerHeight, window.innerWidth);
        canvasRenderer.renderCanvas();
        this.setInfoboxColors();
        this.setButtonEventListener();
    }

    setInfoboxColors() {
        let palette: Palette = PaletteUtil.getPalette();
        let infoSubtitle: HTMLElement = document.querySelector('.info-subtitle');
        infoSubtitle.style.color = palette.bot;
    }

    setButtonEventListener() {
        // Find button in document
        let actionButton: HTMLElement = document.querySelector('button#hideButton');
        // Set onclick listener
        actionButton.onclick = (event) => this.handleActionButtonClick(event, actionButton); 
    }

    handleActionButtonClick(event: MouseEvent, button: HTMLElement) {
        let mainElement = document.querySelector('main');
        if(mainElement.classList.contains('hide-panel-animation')) {
            // User requested to show panel
            // Remove css classes for hiding panel
            mainElement.classList.remove('hide-panel-animation');
            mainElement.classList.remove('main-margin-hidden');
            // Add css classes for showing panel
            mainElement.classList.add('main-margin-top');
            mainElement.classList.add('show-panel-animation');
            // Set button text
            button.innerText = 'Hide infopanel';
        } else {
            // User requested to hide panel
            // Remove css classes for showing panel
            mainElement.classList.remove('show-panel-animation');
            mainElement.classList.remove('main-margin-top');
            // Add css classes for hiding panel
            mainElement.classList.add('hide-panel-animation');
            mainElement.classList.add('main-margin-hidden');
            // Set button text
            button.innerText = 'Show infopanel';
        }
    }
}

new Main().main();