import { CanvasRender } from "./canvasRender";
import { Star } from "../interfaces/Star";

export class StarRenderer implements CanvasRender {

    readonly height;
    readonly width;

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private starArray: Star [];

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
        this.initCanvasAndContext();
    }

    private initCanvasAndContext() {
        this.canvas = document.createElement('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;

        document.body.appendChild(this.canvas);
    }

    render() {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
        this.canvasContext.fillStyle = '#110e19';
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    }

}