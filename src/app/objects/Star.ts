import { CanvasObject } from "./CanvasObject";

export class Star implements CanvasObject {
    
    readonly canvasContext: CanvasRenderingContext2D;
    
    private height;
    private width;
    private size: number;
    private speed: number;
    private x: number;
    private y: number;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;

        this.height = this.canvasContext.canvas.height;
        this.width = this.canvasContext.canvas.width;

        this.initStar();
    }

    private initStar() {
        this.randomSizeAndSpeed();

        this.x = Math.random() * this.width;
        this.y = Math.random() * this.height;
    }

    private randomSizeAndSpeed() {
        this.size = Math.random() * 2;
        this.speed = Math.random() * .05;
    }

    private reset() {
        this.randomSizeAndSpeed();

        this.x = this.width;
        this.y = Math.random() * this.height;
    }

    private update() {
        // Update x-position
        this.x = this.x - this.speed;
        // If out of bounds, reset
        if (this.x < 0) {
            this.reset();
        }
    }

    render() {
        // Render object
        this.canvasContext.fillStyle = '#ffffff';
        this.canvasContext.fillRect(this.x, this.y, this.size, this.size);

        // Update state
        this.update();
    }
}