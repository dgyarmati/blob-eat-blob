/**
 * Functions related to collision detection.
 */

import {blobs, canvas} from "./game";
import {lifecycle} from "./blob-lifecycle";


export let collisionHandler = function () {
    /**
     * Checks if blobs have collided with each other.
     * The winner is determined by size: the bigger one wins, the loser is removed from the blobs array.
     * If the sizes are the same, the winner is decided randomly.
     */
    function checkForCollision() {
        for (let i = 0; i < blobs.length; i++) {
            let blob = blobs[i];
            for (let j = i + 1; j < blobs.length; j++) {
                let otherBlob = blobs[j];
                if (circlesOverlap(blob.circle, otherBlob.circle)) {
                    let winner;
                    let loser;
                    if (blob.size !== otherBlob.size) {
                        winner = blob.size > otherBlob.size ? blob : otherBlob;
                        loser = blob.size < otherBlob.size ? blob : otherBlob;
                    } else {
                        let randomNumber = Math.floor((Math.random() * 2) + 1);
                        if (randomNumber === 1) {
                            winner = blob;
                            loser = otherBlob;
                        } else {
                            winner = otherBlob;
                            loser = blob;
                        }
                    }
                    lifecycle.destroyBlob(loser);
                    winner.size++;
                    winner.circle.radius += 10;
                }
            }
        }
    }

    function isAreaOccupied(circle) {
        for (let currentBlob of blobs) {
            if (circlesOverlap(circle, currentBlob.circle)) {
                return true;
            }
        }
        return false;
    }

    function circlesOverlap(circle1, circle2) {
        let x1 = circle1.x;
        let x2 = circle2.x;
        let y1 = circle1.y;
        let y2 = circle2.y;
        let distance = Math.pow((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2), 0.5);
        return distance < (circle1.radius + circle2.radius);
    }

    function isOutOfBoard(circle) {
        return (circle.x <= 0 || circle.y <= 0)
            || (circle.x >= canvas.width || circle.y >= canvas.height);
    }

    return {
        checkForCollision: checkForCollision,
        isAreaOccupied: isAreaOccupied,
        isOutOfBoard: isOutOfBoard
    }
}();
