import { CanvasRenderer } from "./canvasRender/CanvasRenderer";
import { Palette } from "./util/Palette";
import { PaletteUtil } from "./util/PaletteUtil";

export class Main {
    main() {
        let canvasRenderer = new CanvasRenderer(window.innerHeight, window.innerWidth);
        canvasRenderer.renderCanvas();
        this.setInfoboxColors();
    }

    setInfoboxColors() {
        let palette: Palette = PaletteUtil.getPalette();
        let infoSubtitle: HTMLElement = document.querySelector('.info-subtitle');
        infoSubtitle.style.color = palette.bot;
    }
}

new Main().main();