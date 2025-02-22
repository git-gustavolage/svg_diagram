import React, { useRef, useState, useEffect } from "react";
import { Rect as RectDomain } from "../core/Rect";
import { Viewport } from "../core/Viewport";

interface DraggableRectProps {
  rect: RectDomain;
  viewport: Viewport;
  onUpdate: () => void;
}

export const DraggableRect: React.FC<DraggableRectProps> = ({ rect, viewport, onUpdate }) => {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rectRef = useRef<SVGRectElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - rect.x, y: e.clientY - rect.y });
  };
  
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const factor = 1 / viewport.scale;
    const newX = (e.clientX - offset.x) * factor;
    const newY = (e.clientY - offset.y) * factor;
    rect.setPosition(newX, newY);
    onUpdate();
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, offset]);

  return (
    <rect
      ref={rectRef}
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      fill="white"
      stroke="black"
      strokeWidth={2}
      onMouseDown={onMouseDown}
      style={{ cursor: "move" }}
    />
  );
};
