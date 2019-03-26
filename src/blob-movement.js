/**
 * Functions related to blob movement.
 */
import {blobs, OPPOSITE_DIRECTIONS, DIRECTION_KEYCODES, SPEED} from "./game";
import {collisionHandler} from "./collision-handler";

export let movement = function () {
    function move(circle, direction) {
        switch (direction) {
            case "Numpad8":
            case "KeyW":
                up(circle);
                break;
            case "Numpad2":
            case "KeyS":
                down(circle);
                break;
            case "Numpad4":
            case "KeyA":
                left(circle);
                break;
            case "Numpad6":
            case "KeyD":
                right(circle);
                break;
            case "Numpad7":
            case "KeyQ":
                up(circle);
                left(circle);
                break;
            case "Numpad9":
            case "KeyE":
                up(circle);
                right(circle);
                break;
            case "Numpad1":
            case "IntlBackslash":
                down(circle);
                left(circle);
                break;
            case "Numpad3":
            case "KeyC":
                down(circle);
                right(circle);
                break;
        }
    }

    function up(circle) {
        circle.y -= SPEED;
    }

    function down(circle) {
        circle.y += SPEED;
    }

    function left(circle) {
        circle.x -= SPEED;
    }

    function right(circle) {
        circle.x += SPEED;
    }

    function moveBlobs() {
        for (let blob of blobs) {
            move(blob.circle, blob.lastDirection);
        }
    }

    function reverseDirectionOfBlobsWanderingOffBoard() {
        for (let blob of blobs) {
            if (collisionHandler.isOutOfBoard(blob.circle)) {
                blob.lastDirection = OPPOSITE_DIRECTIONS.get(blob.lastDirection);
            }
        }
    }

    function setInitialDirections() {
        for (let blob of blobs) {
            if (blob.id) {
                blob.lastDirection = generateRandomDirection();
            }
        }
    }

    function changeDirection() {
        for (let blob of blobs) {
            if (blob.id) {
                let randomNumber = Math.floor((Math.random() * 3) + 1);
                if (randomNumber > 1) {
                    blob.lastDirection = generateRandomDirection();
                }
            }
        }
    }

    function generateRandomDirection() {
        return DIRECTION_KEYCODES[Math.floor(Math.random() * DIRECTION_KEYCODES.length)];
    }

    return {
        moveBlobs: moveBlobs,
        reverseDirectionOfBlobsWanderingOffBoard: reverseDirectionOfBlobsWanderingOffBoard,
        setInitialDirections: setInitialDirections,
        changeDirection: changeDirection,
    }
}();