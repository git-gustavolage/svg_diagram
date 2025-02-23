import { DraggableElement } from "./DraggableElemet";
import Point from "./Point";


export class Rect extends DraggableElement {

  constructor(x: number, y: number, width: number, height: number, gridSize: number) {
    super(x, y, width, height, gridSize);
  }

  public getPoints(): Point[] {
    const topR = new Point(this.x, this.y);
    const topL = new Point(this.x + this.width, this.y);
    const bottomR = new Point(this.x, this.y + this.height);
    const bottomL = new Point(this.x + this.width, this.y + this.height);

    return [topR, topL, bottomL, bottomR];
  }

  public resize(newWidth: number, newHeight: number) {
    this.width = Math.max(200, Math.round(newWidth / this.gridSize) * this.gridSize);
    this.height = Math.max(100, Math.round(newHeight / this.gridSize) * this.gridSize);
  }
}
