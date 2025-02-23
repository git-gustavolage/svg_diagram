import Point from "./Point";

export class Polygon {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public gridSize: number;

    constructor(x: number, y: number, width: number, height: number, gridSize: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
    }

    public getPoints(): Point[] {
        const top = new Point(this.x + (this.width / 2), this.y);
        const bottom = new Point(this.x + (this.width / 2), this.y + this.height);
        const left = new Point(this.x, this.y + (this.height / 2));
        const right = new Point(this.x + this.width, this.y + (this.height / 2));
        return [left, top, right, bottom];
    }

    public getCenter(): Point {
        return new Point(this.x + (this.width / 2), this.y + (this.height / 2));
    }

    public setPosition(newX: number, newY: number): Point[] {
        this.x = Math.round(newX / this.gridSize) * this.gridSize;
        this.y = Math.round(newY / this.gridSize) * this.gridSize;
        return this.getPoints()
    }

}