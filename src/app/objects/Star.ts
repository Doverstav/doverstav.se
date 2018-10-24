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
        this.size = Math.random() * 2;
        this.speed = Math.random() * .05;

        this.x = Math.random() * this.width;
        this.y = Math.random() * this.height;
    }

    reset() {

    }

    update() {

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