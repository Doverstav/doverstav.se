function main() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let firstHeight = height / 2;
    let inverseGoldenRation = 0.618;

    canvas.width = width;
    canvas.height = height;

    createLayer(width, height, height - (firstHeight), 0.5, '#000000', 75)
    createLayer(width, height, height - (firstHeight * inverseGoldenRation), 0.45, '#00057F', 65);
    createLayer(width, height, height - (firstHeight * inverseGoldenRation * inverseGoldenRation), 0.4, '#000AFF', 55);
}

function createLayer(windowWidth, windowHeight, startHeight, 
                    roughness, color, scrollSpeed) {
                        console.log(startHeight);
    let layerCanvas = document.createElement('canvas');
    document.body.appendChild(layerCanvas);
    let layerCtx = layerCanvas.getContext('2d');
    layerCanvas.width = windowWidth;
    layerCanvas.height = windowHeight;
    let layerArray = [];

    layerArray[0] = startHeight;
    layerArray[windowWidth] = startHeight;

    displaceMidpoint(layerArray, 0, windowWidth, windowHeight / 4, roughness);
    paintArray(layerArray, layerCtx, windowWidth, windowHeight, color);

    setInterval(
        () => {
            layerArray.push(layerArray.shift());
            paintArray(layerArray, layerCtx, windowWidth, windowHeight, color);
        }, scrollSpeed
    )
}

function displaceMidpoint(array, low, high, displacement, roughness) {
    if(high === low || high - low === 1) {
        // We have no midpoint, end this
        return;
    }

    // Find midpoint
    let midpoint = Math.floor((high + low) / 2);
    // Find average height of high and low
    let midpointBaseHeight = (array[high] + array[low]) / 2
    // Calculate random height
    let midpointRandomHeight = (Math.random() * displacement * 2) - displacement;
    // Add to create final height
    array[midpoint] = midpointBaseHeight + midpointRandomHeight;

    // Decrease displacement
    displacement = displacement * roughness;

    // Continue iterating through array
    displaceMidpoint(array, low, midpoint, displacement, roughness);
    displaceMidpoint(array, midpoint, high, displacement, roughness);
}

function paintArray(array, ctx, canvasWidth, canvasHeight, color) {
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.moveTo(0, array[0]);

    for(let i = 1; i < array.length; i++) {
        ctx.lineTo(i , array[i]);
    }
    
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}