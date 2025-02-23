import { useEffect, useState } from "react";
import { Polygon } from "../core/Polygon"

interface PolyhonPops {
  polygon: Polygon,
  onUpdate: () => void
}

export const PolygonSvg: React.FC<PolyhonPops> = ({ polygon, onUpdate }) => {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - polygon.x, y: e.clientY - polygon.y });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = (e.clientX - offset.x);
    const newY = (e.clientY - offset.y);
    polygon.setPosition(newX, newY);
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
    <g>
      <polygon
        width={polygon.width}
        height={polygon.height}
        fill="white"
        stroke="black"
        strokeWidth="2"
        points={polygon.getPoints().map(p => `${p.x},${p.y}`).join(" ")}
        onMouseDown={onMouseDown}
      />
    </g>
  )

}