/**
 * Game logic and global variables.
 */

import {lifecycle} from "./blob-lifecycle";
import {movement} from "./blob-movement";
import {view} from "./view";
import {collisionHandler} from "./collision-handler";

export const STARTING_NUMBER_OF_BLOBS = 15;
export const ENEMY_BLOB_MIN_SIZE = 1;
export const ENEMY_BLOB_MAX_SIZE = 6;
export const PLAYER_COLOR = "#FF6347";
export const ENEMY_COLOR = "#1E90FF";
export const MAX_SIZE = 12;
export const DIRECTION_KEYCODES = // for randomly generating directions used by enemy blobs
    ["Numpad8", // N
        "Numpad2",  // S
        "Numpad4",  // W
        "Numpad6",  // E
        "Numpad7",  // NW
        "Numpad9",  // NE
        "Numpad1",  // SW
        "Numpad3"]; // SE
export const QUIT = "Escape";

export const OPPOSITE_DIRECTIONS = new Map([
    ["Numpad8", "Numpad2"],
    ["Numpad2", "Numpad8"],
    ["Numpad4", "Numpad6"],
    ["Numpad6", "Numpad4"],
    ["Numpad7", "Numpad3"],
    ["Numpad3", "Numpad7"],
    ["Numpad9", "Numpad1"],
    ["Numpad1", "Numpad9"],
]);

export const SPEED = 2;
export let blobs = [];
export let playerBlob;
export let redrawInterval;
export let spawnInterval;
export let directionChangeInterval;
export let start = false;

function handleKeyPress(keypress) {
    start = true;
    if (keypress.code === QUIT) {
        endGame();
    } else {
        playerBlob.lastDirection = keypress.code;
    }
}

function updateGame() {
    if (start) {
        view.clearScreen();
        movement.moveBlobs();
        collisionHandler.checkForCollision();
        checkForGameEnd();
        movement.reverseDirectionOfBlobsWanderingOffBoard();
        view.drawBlobs();
    }
}

function checkForGameEnd() {
    if (!blobs.length || blobs[0].id !== 0) {
        endGame();
    } else {
        for (let blob of blobs) {
            if (blob.size >= MAX_SIZE) {
                endGame();
                break;
            }
        }
    }
}

function endGame() {
    clearInterval(redrawInterval);
    clearInterval(spawnInterval);
    clearInterval(directionChangeInterval);
    document.body.removeEventListener("keydown", handleKeyPress, true);
}

//----//

export let canvas = document.getElementById("board");
export let context = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

playerBlob = lifecycle.createPlayerBlob();
lifecycle.createBlobs();
movement.setInitialDirections();
view.drawBlobs();

document.body.addEventListener("keydown", handleKeyPress, true);

redrawInterval = setInterval(updateGame, 20);
spawnInterval = setInterval(lifecycle.spawnBlob, 5000);
directionChangeInterval = setInterval(movement.changeDirection, 600);
