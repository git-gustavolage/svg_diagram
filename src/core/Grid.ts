export class Grid {
    public gridSize: number;
  
    constructor(gridSize: number = 50) {
      this.gridSize = gridSize;
    }
  
    public getVerticalLines(width: number): number[] {
      const lines: number[] = [];
      for (let x = 0; x <= width; x += this.gridSize) {
        lines.push(x);
      }
      return lines;
    }
  
    public getHorizontalLines(height: number): number[] {
      const lines: number[] = [];
      for (let y = 0; y <= height; y += this.gridSize) {
        lines.push(y);
      }
      return lines;
    }
  
    public snap(value: number): number {
      return Math.round(value / this.gridSize) * this.gridSize;
    }
  }
  