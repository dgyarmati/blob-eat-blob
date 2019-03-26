/**
 * The stars of the game.
 */
export class Blob {
    constructor(id, size, circle, color) {
        this.id = id;
        this.size = size;
        this.circle = circle;
        this.color = color;
    }
}

/**
 * Blobs are visually represented by circles drawn on the game area.
 */
export class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}
