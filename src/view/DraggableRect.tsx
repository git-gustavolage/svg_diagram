import { useRef, useState, useEffect } from "react";
import { Rect as RectDomain } from "../core/Rect";
import { Viewport } from "../core/Viewport";
import Point from "../core/Point";
import { PointSvg } from "./PointSvg";
import { TextSvg } from "./TextSvg";

interface DraggableRectProps {
  rect: RectDomain;
  viewport: Viewport;
  onUpdate: () => void;
  text?: string;
}

export const DraggableRect: React.FC<DraggableRectProps> = ({ rect, viewport, onUpdate, text = "" }) => {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rectRef = useRef<SVGRectElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setShowOptions(true);
    setOffset({ x: e.clientX - rect.x, y: e.clientY - rect.y });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = (e.clientX - offset.x);
    const newY = (e.clientY - offset.y);
    rect.setPosition(newX, newY);
    onUpdate();
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (rectRef.current && !rectRef.current.contains(e.target as Node)) {
      setShowOptions(false);
    }
  }

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    if (showOptions) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dragging, offset]);

  const handleResize = (point: Point) => {
    const newWidth = Math.abs(point.x - rect.x);
    const newHeight = Math.abs(point.y - rect.y);
    rect.resize(newWidth, newHeight);
  }


  return (
    <g>
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

      <TextSvg text={text} element={rect} />
      {showOptions && <PointSvg point={rect.getPoints()[2]} handleResize={handleResize} onUpdate={onUpdate} />}
    </g>
  );
};
