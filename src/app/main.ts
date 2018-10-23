import { MidpointDisplacementRenderer } from "./canvasRender/MidpointDisplacementRenderer";
import { BackgroundRenderer } from "./canvasRender/BackgroundRenderer";

export class Main {
    main() {
        let bgRenderer = new BackgroundRenderer(window.innerHeight, window.innerWidth);
        bgRenderer.render();
    }
}

new Main().main();