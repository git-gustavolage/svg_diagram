// src/core/Viewport.ts
export class Viewport {
    public scale: number;
    public offsetX: number;
    public offsetY: number;
    public width: number;
    public height: number;
  
    constructor(scale: number = 1, offsetX: number = 0, offsetY: number = 0, width: number = 0, height: number = 0) {
      this.scale = scale;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.width = width;
      this.height = height;
    }
  
    public getTransform(): string {
      return `translate(${this.offsetX}, ${this.offsetY}) scale(${this.scale})`;
    }

    setOffset(offsetX: number, offsetY: number) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    }
  
    // Métodos para panning e zoom podem ser adicionados conforme necessário:
    public pan(dx: number, dy: number): void {
      this.offsetX += dx;
      this.offsetY += dy;
    }
  
    public zoom(factor: number): void {
      this.scale *= factor;
    }
  }
  