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
        let actionButton: HTMLElement = document.querySelector('button#actionButton');
        console.log(actionButton);
        actionButton.onclick = (event) => this.handleActionButtonClick(event); 
    }

    handleActionButtonClick(event: MouseEvent) {
        let mainElement = document.querySelector('main');
        if(mainElement.classList.contains('test-animation')) {
            mainElement.classList.remove('test-animation');
            mainElement.classList.remove('main-margin-hidden');
            mainElement.classList.add('main-margin-top');
            mainElement.classList.add('test-animation-revert');
        } else {
            mainElement.classList.remove('test-animation-revert');
            mainElement.classList.remove('main-margin-top');
            mainElement.classList.add('test-animation');
            mainElement.classList.add('main-margin-hidden');
        }
    }
}

new Main().main();