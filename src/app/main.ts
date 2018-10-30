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
        let actionButton: HTMLElement = document.querySelector('button#hideButton');
        console.log(actionButton);
        actionButton.onclick = (event) => this.handleActionButtonClick(event); 
    }

    handleActionButtonClick(event: MouseEvent) {
        let mainElement = document.querySelector('main');
        if(mainElement.classList.contains('hide-panel-animation')) {
            mainElement.classList.remove('hide-panel-animation');
            mainElement.classList.remove('main-margin-hidden');
            mainElement.classList.add('main-margin-top');
            mainElement.classList.add('show-panel-animation');
        } else {
            mainElement.classList.remove('show-panel-animation');
            mainElement.classList.remove('main-margin-top');
            mainElement.classList.add('hide-panel-animation');
            mainElement.classList.add('main-margin-hidden');
        }
    }
}

new Main().main();