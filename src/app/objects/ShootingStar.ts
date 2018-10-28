import { CanvasObject } from "./CanvasObject";

export class ShootingStar implements CanvasObject {

    readonly canvasContext: CanvasRenderingContext2D;

    private height: number;
    private width: number;
    private size: number;
    private speed: number;
    private length: number;
    private x: number;
    private y: number;

    private timedOut: boolean;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this. canvasContext = canvasContext;

        this.height = this.canvasContext.canvas.height;
        this.width = this.canvasContext.canvas.width;

        this.initShootingStar();
    }

    private initShootingStar() {
        this.x = Math.random() * this.width;
        this.y = 0;

        this.size = Math.random() + 0.1;
        this.speed = (Math.random() * 10) + 6;
        this.length = (Math.random() * 80) + 10;
    }

    private update() {
        if(!this.timedOut) {
            this.x = this.x - this.speed;
            this.y = this.y + this.speed;

            // If out of bounds, reset
            if(this.x < 0 || this.y > this.height) {
                // Set shooting star as timedOut so it wont keep updating
                this.timedOut = true;
                // Reset star now so it line doesn't linger on canvas
                this.initShootingStar()
                // Reset timeOut status in some time
                setTimeout(
                    () => this.timedOut = false, (Math.random() * 5000) + 1000
                )
            }
        }
    }

    render() {
        // Render object
        this.canvasContext.strokeStyle = '#ffffff';
        this.canvasContext.lineWidth = this.size;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.x, this.y);
        this.canvasContext.lineTo(this.x + this.length, this.y - this.length);
        this.canvasContext.stroke();

        // Update state
        this.update();
    }
}