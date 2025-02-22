import Point from "./Point";
import { Rect } from "./Rect";

export class Line{
    start: Point;
    end: Point;

    constructor(start: Point, end: Point){
        this.start = start;
        this.end = end;
    }

    fromPontis(start: Point, end: Point){
        this.start = start;
        this.end = end;
    }

    getPoints(): Point[]{
        const start = new Point(this.start.x, this.start.y);
        const end = new Point(this.end.x, this.end.y);
        return [start, end];
    }

    anchorIn(point1: Point, point2: Point){
        this.start = point1;
        this.end = point2;
    }

    getLenth(): number{
        var cateto1 = (this.start.x - this.end.x);
        var cateto2 = (this.start.y - this.end.y);
        var hQ = (cateto1**2) + (cateto2**2)
        return Math.sqrt(hQ);
    }

    getHeight(): number{
        return Math.abs(this.start.y - this.end.y);
    }

    getWidth(): number{
        return Math.abs(this.start.x - this.end.x);
    }

    divide(){
        const left_start = new Point(this.start.x, this.start.y);
        const right_end = new Point(this.end.x, this.end.y);
        const meio = new Point((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);

        return [new Line(left_start, meio), new Line(meio, right_end)];
    }

}