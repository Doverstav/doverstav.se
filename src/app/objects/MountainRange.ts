import { CanvasObject } from "./CanvasObject";

export class MountainRange implements CanvasObject {

    readonly canvasContext: CanvasRenderingContext2D;

    private height: number;
    private width: number;
    private initialHeight: number;
    private color: string;
    private roughness: number;
    private updateDelay: number;
    private renderpointsArray: number [];
    private nextScreenArray: number [];
    private timedOut: boolean;


    constructor(canvasContext: CanvasRenderingContext2D, 
        initialHeight: number, roughness: number, 
        color: string, updateDelay: number) {
            // Set all variables
            this.canvasContext = canvasContext;
            this.height = this.canvasContext.canvas.height;
            this.width = this.canvasContext.canvas.width;
            this.initialHeight = initialHeight;
            this.roughness = roughness;
            this.color = color;
            this.updateDelay = updateDelay;

            this.initRenderArray();
            this.initNextScreenArray();
            
    }

    private initRenderArray() {
        this.renderpointsArray = [];
        
        this.renderpointsArray[0] = this.randomizeInitialHeight();
        this.renderpointsArray[this.width] = this.randomizeInitialHeight();
        
        this.generateTerrain(this.renderpointsArray, 0, this.width, this.initialHeight / 4);
    }

    initNextScreenArray() {
        this.nextScreenArray = [];

        this.nextScreenArray[0] = this.renderpointsArray[this.width];
        this.nextScreenArray[this.width] = this.randomizeInitialHeight();

        this.generateTerrain(this.nextScreenArray, 0, this.width, this.initialHeight / 4);
    }

    private randomizeInitialHeight(): number {
        return this.initialHeight + (Math.random() * (this.initialHeight / 5)) - (this.initialHeight / 10);
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
        // Render object
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(0, this.renderpointsArray[0]);

        for(let i = 1; i < this.renderpointsArray.length; i++) {
            this.canvasContext.lineTo(i, this.renderpointsArray[i]);
        }

        this.canvasContext.lineTo(this.width, this.height);
        this.canvasContext.lineTo(0, this.height);
        this.canvasContext.closePath();
        this.canvasContext.fill();

        // Update state
        this.update();
    }

    private update() {
        if(!this.timedOut) {
            // Update state

            // If we have used all of our 'next screen' elements
            // Generate a new one
            if(this.nextScreenArray.length === 0) {
                this.initNextScreenArray();
            }

            // Remove first element from renderpoints
            this.renderpointsArray.shift();
            // Add first element from array that's on 'next screen'
            this.renderpointsArray.push(this.nextScreenArray.shift());

            // Stop updating for now, resume in 'updateDelay' time
            this.timedOut = true;
            setTimeout(
                _ => this.timedOut = false, this.updateDelay
            )
        }
    }
}