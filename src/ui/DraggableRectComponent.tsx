// src/ui/DraggableRectComponent.tsx
import React, { useState, useEffect } from 'react';
import { DraggableRect } from '../core/DraggableRect';

export interface DraggableRectComponentProps {
  id: string;
  initialX: number;
  initialY: number;
  width: number;
  height: number;
  gridSize: number;
}

const DraggableRectComponent: React.FC<DraggableRectComponentProps> = ({
  id,
  initialX,
  initialY,
  width,
  height,
  gridSize,
}) => {
  const [draggableRect, setDraggableRect] = useState(() =>
    new DraggableRect(id, initialX, initialY, width, height, gridSize)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Ao iniciar o arraste, calcula o offset entre o cursor e a posição do retângulo
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - draggableRect.x,
      y: e.clientY - draggableRect.y,
    });
  };

  // Efeito para adicionar os listeners globais enquanto estiver arrastando
  useEffect(() => {

    if (isDragging) {
      const handleMouseMoveGlobal = (e: MouseEvent) => {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        draggableRect.move(newX, newY);

        // Força o re-render atualizando a instância com a nova posição
        setDraggableRect(
          new DraggableRect(
            draggableRect.id,
            draggableRect.x,
            draggableRect.y,
            draggableRect.width,
            draggableRect.height,
            gridSize
          )
        );
      };

      const handleMouseUpGlobal = () => {
        setIsDragging(false);
      };

      window.addEventListener('mousemove', handleMouseMoveGlobal);
      window.addEventListener('mouseup', handleMouseUpGlobal);

      // Remove os event listeners ao finalizar o arraste ou quando o componente for desmontado
      return () => {
        window.removeEventListener('mousemove', handleMouseMoveGlobal);
        window.removeEventListener('mouseup', handleMouseUpGlobal);
      };
    }
  }, [isDragging, dragOffset, draggableRect, gridSize]);

  return (<>
    <rect
      x={draggableRect.x}
      y={draggableRect.y}
      width={draggableRect.width}
      height={draggableRect.height}
      fill="white"
      stroke="black"
      strokeWidth={2}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    />
    <text id='Texto' style={{ userSelect: "none"}} fontSize={12} x={draggableRect.middlePoint().x - 27.5} y={draggableRect.middlePoint().y}>({draggableRect.middlePoint().x}) ({draggableRect.middlePoint().y})</text>
  </>
  );
};

export default DraggableRectComponent;
