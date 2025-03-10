import Point from "./Point";

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

    getMiddlePoint(): Point{
        return new Point((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
    }

    divide(){
        return [new Line(this.start, this.getMiddlePoint()), new Line(this.getMiddlePoint(), this.end)];
    }

}