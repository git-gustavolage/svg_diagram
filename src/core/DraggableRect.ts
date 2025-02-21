// src/core/DraggableRect.ts
export class DraggableRect {
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public gridSize: number;
  
    constructor(id: string, x: number, y: number, width: number, height: number, gridSize: number) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.gridSize = gridSize;
    }
  
    // Atualiza a posição aplicando o snap na grade
    public move(newX: number, newY: number): void {
      this.x = Math.round(newX / this.gridSize) * this.gridSize;
      this.y = Math.round(newY / this.gridSize) * this.gridSize;
    }
  }
  