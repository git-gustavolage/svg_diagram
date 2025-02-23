import { useEffect, useState } from "react";
import { Rect } from "../core/Rect";
import { Viewport } from "../core/Viewport";
import { GridView } from "./GridView";
import { DraggableRect } from "./DraggableRect";
import { Line } from "../core/Line";
import { LineSvg } from "./LineSvg";
import { PolygonSvg } from "./PolygonSvg";
import { Polygon } from "../core/Polygon";

export const ViewportContainer: React.FC = () => {
  const width = 1200;
  const height = 750;
  const gridSize = 20;
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [, setTick] = useState(0);
  const onUpdate = () => setTick(t => t + 1);

  const [viewport] = useState(() => new Viewport(1, 0, 0, width, height));

  const [rect1] = useState(() => new Rect(300, 100, 250, 100, gridSize));
  const [rect2] = useState(() => new Rect(50, 250, 250, 100, gridSize));
  const [polygon1] = useState(() => new Polygon(300, 300, 300, 100, gridSize));
  const [line1] = useState(() => new Line(rect1.getCenter(), polygon1.getCenter()));
  const [line2] = useState(() => new Line(polygon1.getCenter(), rect2.getCenter()));
  const [line3] = useState(() => new Line(rect1.getCenter(), rect2.getCenter()));

  line1.anchorIn(rect1.getCenter(), polygon1.getCenter());
  line2.anchorIn(polygon1.getCenter(), rect2.getCenter());
  line3.anchorIn(rect1.getCenter(), rect2.getCenter());


  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.button !== 2) return;
    setDragging(true);
    setOffset({ x: e.clientX - viewport.offsetX, y: e.clientY - viewport.offsetY });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    viewport.setOffset(newX, newY);
    onUpdate();
  };

  const onMouseWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    viewport.zoom(factor);
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
  }, [dragging]);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };


  return (
    <div className="w-full h-full bg-gray-200 flex justify-center items-center">
      <svg
        width={width}
        height={height}
        className={"border border-gray-400 bg-white " + (dragging ? "cursor-grabbing" : "cursor-grab")}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onContextMenu={handleContextMenu}
        onWheel={onMouseWheel}
      >
        <g transform={viewport.getTransform()}>

          <GridView
            gridSize={gridSize * 10}
            width={width}
            height={height}
          />

          <g id="container">
            <LineSvg line={line1} />
            <LineSvg line={line2} />
            <LineSvg line={line3} />
            <DraggableRect rect={rect1} onUpdate={onUpdate} viewport={viewport} />
            <DraggableRect rect={rect2} onUpdate={onUpdate} viewport={viewport} />
            <PolygonSvg polygon={polygon1} onUpdate={onUpdate} />
          </g>
        </g>
      </svg>
    </div>

  )
}