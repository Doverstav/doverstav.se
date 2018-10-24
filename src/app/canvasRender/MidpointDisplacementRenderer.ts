import { CanvasRender } from "./canvasRender";

export class MidpointDisplacementRenderer implements CanvasRender {
    readonly height: number;
    readonly width: number;

    private initialHeight: number;
    private color: string;
    private roughness: number;
    private tickRate: number;

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private renderpointsArray: number [];


    constructor(height: number, width: number, 
        initialHeight: number, roughness: number, 
        color: string, tickRate: number) {
            // Set all variables
            this.height = height;
            this.width = width;
            this.initialHeight = initialHeight;
            this.roughness = roughness;
            this.color = color;
            this.tickRate = tickRate;

            this.initArray()

            this.initCanvasAndContext()

            this.generateTerrain(this.renderpointsArray, 0, this.width, this.initialHeight / 4);
    }

    private initArray() {
        this.renderpointsArray = [];
        this.renderpointsArray[0] = this.initialHeight;
        this.renderpointsArray[this.width] = this.initialHeight;
    }

    private initCanvasAndContext() {
        this.canvas = document.createElement('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvasContext.fillStyle = this.color;

        // Append canvas to body
        document.body.appendChild(this.canvas);
    }

    private generateTerrain(array: number [], low: number, 
        high: number, displacement: number) {
            if(high === low || high - low === 1) {
                // We have no midpoint, end this
                return;
            }

            // Find midpoint
            let midpoint: number = Math.floor((high + low) / 2);
            // Find average height of high and low
            let midpointBaseHeight: number = (array[high] + array[low]) / 2;
            // Calculate random height
            let midpointRandomHeight = (Math.random() * displacement * 2) - displacement;
            // Add to create final height
            array[midpoint] = midpointBaseHeight + midpointRandomHeight;

            // Decrease displacement
            displacement = displacement * this.roughness;

            // Continue iterating through array
            this.generateTerrain(array, low, midpoint, displacement);
            this.generateTerrain(array, midpoint, high, displacement);
    }

    render() {
        this.paintTerrain();
        this.setupRerender();
    }

    private paintTerrain() {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(0, this.renderpointsArray[0]);

        for(let i = 1; i < this.renderpointsArray.length; i++) {
            this.canvasContext.lineTo(i, this.renderpointsArray[i]);
        }

        this.canvasContext.lineTo(this.width, this.height);
        this.canvasContext.lineTo(0, this.height);
        this.canvasContext.closePath();
        this.canvasContext.fill();
    }

    private setupRerender() {
        setInterval(
            () => {
                this.renderpointsArray.push(this.renderpointsArray.shift());
                this.paintTerrain();
            }, this.tickRate
        )
    }
}