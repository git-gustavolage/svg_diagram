import { useEffect, useRef, useState } from "react";
import Point from "../core/Point"

interface PointProps {
  point: Point;
  onUpdate: () => void;
  handleResize: (point: Point) => void;
}

export const PointSvg: React.FC<PointProps> = ({ point, handleResize, onUpdate }) => {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<SVGCircleElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - point.x, y: e.clientY - point.y });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = (e.clientX - offset.x);
    const newY = (e.clientY - offset.y);
    point.setPosition(newX, newY);
    handleResize(point.getPosition());
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
    <circle
      ref={elementRef}
      cx={point.x}
      cy={point.y}
      r={5}
      fill="rgb(50, 50, 50, 0.5)"
      strokeWidth={2}
      stroke="rgb(50, 50, 50, 0.5)"
      onMouseDown={onMouseDown}
      style={{ cursor: "nw-resize" }}
    />
  )
}