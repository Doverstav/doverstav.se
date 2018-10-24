import { CanvasRender } from "./canvasRender";
import { Star } from "../objects/Star";

export class StarRenderer implements CanvasRender {

    readonly height;
    readonly width;

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private starArray: Star [];

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        this.starArray = [];

        this.initCanvasAndContext();
        this.initStars();
    }

    private initCanvasAndContext() {
        this.canvas = document.createElement('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;

        document.body.appendChild(this.canvas);
    }

    private initStars() {
        for(let i = 0; i < this.height; i++) {
            this.starArray.push(new Star(this.height, this.width));
        }
    }

    render() {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
        this.canvasContext.fillStyle = '#110e19';
        this.canvasContext.fillRect(0, 0, this.width, this.height);

        this.canvasContext.fillStyle = '#ffffff';
        this.starArray.forEach(
            star => this.canvasContext.fillRect(star.getX(), star.getY(), star.getSize(), star.getSize())
        );
    }

}