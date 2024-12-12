
const imageSize = 64;
const canvasSize = 128;
const model = 'website/model.onnx';

// Sources:
// https://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas

function drawImage(context, data, imageSize, canvasSize) {
    pixelSize = canvasSize / imageSize;
    function adjustByte(value) {
        value *= 255;
        if (value > 255) {
            value = 255;
        }
        if (value < 0) {
            value = 0;
        }
        return value;
    }


    function setPixel(x, y, r, g, b) {
        r = adjustByte(r);
        g = adjustByte(g);
        b = adjustByte(b);
        context.fillStyle = "rgba(" + r + "," + g + "," + b + ",1)";
        context.fillRect(x * pixelSize, y * pixelSize, pixelSize + 1, pixelSize + 1);
    }

    for (var y = 0; y < imageSize; ++y) {
        for (var x = 0; x < imageSize; ++x) {
            index = imageSize * y + x;
            channelSize = imageSize * imageSize;
            r = data[index];
            g = data[index + channelSize];
            b = data[index + channelSize * 2];
            setPixel(x, y, r, g, b);
        }
    }
}

var noise_deviation = 1.0;
var noise_mean = 0.0;

function changeDeviation() {
    const input = document.getElementById('deviation_input');
    noise_deviation = Number.parseFloat(input.value);
}

function changeMean() {
    const input = document.getElementById('mean_input');
    noise_mean = Number.parseFloat(input.value);
}

// Borrowed from:
// https://stackoverflow.com/a/36481059
// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function randomNormal(mean, std) {
    const u = 1 - Math.random();
    const v = 1 - Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * std + mean;
}

function randomNoise(size) {
    let arr = [];
    for (var i = 0; i < size; ++i) {
        arr.push(randomNormal(noise_mean, noise_deviation));
    }
    return Float32Array.from(arr);
}


// Sources:
// https://github.com/microsoft/onnxruntime-inference-examples/tree/main/js/quick-start_onnxruntime-web-script-tag
async function fillCanvas(session, canvas) {
    const tensor = new ort.Tensor('float32', randomNoise(100), [1, 100]);
    const feed = {input: tensor};

    const results = await session.run(feed);
    const data = results.output.data;

    var context = canvas.getContext('2d');

    drawImage(context, data, imageSize, canvasSize);
}

var session = null;

async function generate() {
    if (session === null) {
        session = await ort.InferenceSession.create(model);
    }

    var canvases = document.getElementById('canvases');

    //var promise = null;
    for (let canvas of canvases.children) {
        await fillCanvas(session, canvas);
        /*if (promise === null) {
            promise = fillCanvas(session, canvas);
            continue;
        }
        promise.then(() => {
            promise = fillCanvas(session, canvas);
        });*/
    }
}
