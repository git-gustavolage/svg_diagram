import Point from "./Point";

// domain/Rect.ts
export class Rect {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public gridSize: number
  ) { }

  setPosition(newX: number, newY: number) {
    this.x = Math.round(newX / this.gridSize) * this.gridSize;
    this.y = Math.round(newY / this.gridSize) * this.gridSize;
  }

  getCenter(): Point {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
  }
}
