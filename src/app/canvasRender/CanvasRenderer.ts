import { CanvasObject } from "../objects/CanvasObject";
import { Background } from "../objects/Background";
import { Star } from "../objects/Star";
import { ShootingStar } from "../objects/ShootingStar";
import { MountainRange } from "../objects/MountainRange";
import { CanvasRender } from "./canvasRender";

export class CanvasRenderer implements CanvasRender {

    readonly height;
    readonly width;

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    private canvasObjects: CanvasObject [];

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;

        this.createCanvas();
        this.createCanvasObjects();
    }

    private createCanvas() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;

        // Attach to DOM
        document.body.appendChild(this.canvas);
    }

    private createCanvasObjects() {
        this.canvasObjects = [];

        this.createBackground();
        this.createStars();
        this.createShootingStars();
        this.createMountains();
    }

    private createBackground() {
        this.canvasObjects.push(new Background(this.canvasContext, '#110e19'));
    }

    private createStars() {
        for(let i = 0; i < this.height; i++) {
            this.canvasObjects.push(new Star(this.canvasContext));
        }
    }

    private createShootingStars() {
        this.canvasObjects.push(new ShootingStar(this.canvasContext));
        this.canvasObjects.push(new ShootingStar(this.canvasContext));
    }

    private createMountains() {
        let firstHeight = this.height / 3;
        let inverseGoldenRatio = 0.618;

        this.canvasObjects.push(this.createMountain(this.height - firstHeight, 0.5, '#000000', 75))
        this.canvasObjects.push(this.createMountain(this.height - (firstHeight * inverseGoldenRatio), 0.45, '#00057F', 65))
        this.canvasObjects.push(this.createMountain(this.height - (firstHeight * inverseGoldenRatio * inverseGoldenRatio), 0.4, '#000AFF', 55))
    }

    private createMountain(initialHeight: number, roughness: number, color: string, tickrate: number) {
        return new MountainRange(this.canvasContext, initialHeight, roughness, color, tickrate);
    }

    renderCanvas() {
        // Save canvasContext state
        this.canvasContext.save();
        // Render each object
        this.canvasObjects.forEach(
            canvasObject => {
                canvasObject.render();
                // Restore state so objects dont affect the rendering
                // of other objects
                this.canvasContext.restore();
            }
        );

        // Request new animationFrame so canvas is animated
        requestAnimationFrame(() => this.renderCanvas());
    }
}