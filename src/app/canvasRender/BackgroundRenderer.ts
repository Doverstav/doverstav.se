import { MidpointDisplacementRenderer } from "./MidpointDisplacementRenderer";
import { CanvasRender } from "./canvasRender";

export class BackgroundRenderer implements CanvasRender {
    readonly height: number;
    readonly width: number;

    private canvasLayers: CanvasRender [];

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        this.canvasLayers = [];

        //let layer1Mountain = new MidpointDisplacementRenderer(this.height, this.width, this.height/2, 0.5, '#ff0000', 100);
        //layer1Mountain.render();
        this.createMountainLayers();
    }

    private createMountainLayers() {
        let firstHeight = this.height / 2;
        let inverseGoldenRatio = 0.618;

        this.createMountainLayer(this.height - firstHeight, 0.5, '#000000', 75);
        this.createMountainLayer(this.height - (firstHeight * inverseGoldenRatio), 0.45, '#00057F', 65);
        this.createMountainLayer(this.height - (firstHeight * inverseGoldenRatio * inverseGoldenRatio), 0.4, '#000AFF', 55);
    }

    private createMountainLayer(initialHeight: number, roughness: number, color: string, tickrate: number) {
        this.canvasLayers.push(new MidpointDisplacementRenderer(
            this.height, this.width, initialHeight, roughness, color, tickrate)
        );
    }

    render() {
        this.canvasLayers.forEach(
            canvasRenderer => canvasRenderer.render()
        )
    }
}