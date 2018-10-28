import { CanvasRenderer } from "./canvasRender/CanvasRenderer";

export class Main {
    main() {
        let canvasRenderer = new CanvasRenderer(window.innerHeight, window.innerWidth);
        canvasRenderer.renderCanvas();
    }
}

new Main().main();