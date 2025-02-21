import { DraggableRect } from "./DraggableRect";

export default class Container {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public gridSize: number;
    public elements: Map<{x: number, y:number}, DraggableRect>;

    constructor(x: number, y: number, width: number, height: number, gridSize: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.elements = new Map();
    }

    append(element: DraggableRect) {
        this.elements.set({x: element.x, y: element.y}, element);
    }

    getElements() {
        return Array.from(this.elements.values());
    }
}
