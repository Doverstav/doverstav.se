export interface CanvasObject {
    readonly canvasContext: CanvasRenderingContext2D;
    render();
}