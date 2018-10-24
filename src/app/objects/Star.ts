export class Star {
    
    private height;
    private width;

    private size: number;
    private speed: number;
    private x: number;
    private y: number;

    constructor(backgroundHeight: number, backgroundWidth: number) {
        this.height = backgroundHeight;
        this.width  = backgroundWidth;

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

    reset() {
        this.randomSizeAndSpeed();

        this.x = this.width;
        this.y = Math.random() * this.height;
    }

    update() {
        // Update x-position
        this.x = this.x - this.speed;
        // If out of bounds, reset
        if (this.x < 0) {
            this.reset();
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getSize() {
        return this.size;
    }
}