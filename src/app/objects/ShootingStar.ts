export class ShootingStar {
    readonly height: number;
    readonly width: number;

    private size: number;
    private speed: number;
    private length: number;
    private x: number;
    private y: number;

    private timedOut: boolean;

    constructor(backgroundHeight: number, backgroundWidth: number) {
        this.height = backgroundHeight;
        this.width = backgroundWidth;

        this.initShootingStar();
    }

    private initShootingStar() {
        this.x = Math.random() * this.width;
        this.y = 0;

        this.size = Math.random() + 0.1;
        this.speed = (Math.random() * 10) + 6;
        this.length = (Math.random() * 80) + 10;
    }

    update() {
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

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getSize() {
        return this.size;
    }

    getLength() {
        return this.length;
    }
}