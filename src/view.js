/**
 * Functions responsible for drawing game elements on the screen.
 */

import {blobs, context, canvas} from "./game";

export let view = function () {
    function drawBlobs() {
        for (let blob of blobs) {
            drawCircle(blob.circle.x, blob.circle.y, blob.circle.radius, blob.color);
        }
    }

    function clearScreen() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function clearBlob(blob) {
        clearCircle(blob.circle.x, blob.circle.y, blob.circle.radius);
    }

    function drawCircle(x, y, radius, color) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    function clearCircle(x, y, radius) {
        context.beginPath();
        context.clearRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);
        context.closePath();
    }

    return {
        drawBlobs: drawBlobs,
        clearScreen: clearScreen,
        clearBlob: clearBlob,
    }
}();
