/**
 * Functions related to creating and destroying blob objects.
 */

import {
    blobs,
    ENEMY_BLOB_MAX_SIZE,
    ENEMY_BLOB_MIN_SIZE,
    ENEMY_COLOR,
    PLAYER_COLOR,
    STARTING_NUMBER_OF_BLOBS,
    canvas
} from "./game";
import {collisionHandler} from "./collision-handler";
import {Blob, Circle} from "./model";
import {movement} from "./blob-movement";
import {view} from "./view";

export let lifecycle = function() {
    function createBlobs() {
        for (let i = 0; i < STARTING_NUMBER_OF_BLOBS; i++) {
            let circle;
            let size;
            do {
                size = Math.floor((Math.random() * ENEMY_BLOB_MAX_SIZE) + ENEMY_BLOB_MIN_SIZE);
                circle = generateRandomCircle(size);
            } while (collisionHandler.isAreaOccupied(circle));
            let id = i + 1;
            let blob = new Blob(id, size, circle, ENEMY_COLOR);

            blobs.push(blob);
        }
    }

    function createPlayerBlob() {
        let circle = generateRandomCircle(3);
        let id = 0;
        let playerBlob = new Blob(id, 3, circle, PLAYER_COLOR);
        blobs.push(playerBlob);
        return playerBlob;
    }

    function generateRandomCircle(size) {
        let x = Math.floor(Math.random() * canvas.width);
        let y = Math.floor(Math.random() * canvas.height);

        let radius = 0;
        for (let i = 0; i < size; i++) {
            radius += 10;
        }
        return new Circle(x, y, radius);
    }

    function spawnBlob() {
        let circle;
        let size;
        do {
            size = Math.floor((Math.random() * ENEMY_BLOB_MAX_SIZE) + ENEMY_BLOB_MIN_SIZE);
            circle = generateRandomCircle(size);
        } while (collisionHandler.isAreaOccupied(circle));
        let id = blobs[blobs.length - 1].id + 1;
        let blob = new Blob(id, size, circle, ENEMY_COLOR);
        movement.changeDirection(blob);

        blobs.push(blob);
    }
    function destroyBlob(blob) {
        for (let i = 0; i < blobs.length; i++) {
            if (blobs[i].id === blob.id) {
                blobs.splice(i, 1);
                view.clearBlob(blob);
            }
        }
    }

    return {
        createBlobs: createBlobs,
        createPlayerBlob: createPlayerBlob,
        spawnBlob: spawnBlob,
        destroyBlob: destroyBlob
    }
}();