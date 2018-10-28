import { CanvasObject } from "./CanvasObject";

export class Background implements CanvasObject {
    readonly canvasContext: CanvasRenderingContext2D;

    private height;
    private width;
    private color;

    constructor(canvasContext: CanvasRenderingContext2D ,color: string) {
        this.canvasContext = canvasContext;

        this.height = this.canvasContext.canvas.height;
        this.width = this.canvasContext.canvas.width;
        this.color = color;
    }

    render() {
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    }
}