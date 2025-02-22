import { useState } from "react";
import { Rect } from "../core/Rect";
import { Viewport } from "../core/Viewport";
import { GridView } from "./GridView";
import { DraggableRect } from "./DraggableRect";
import { Line } from "../core/Line";
import { LineSvg } from "./LineSvg";

export const ViewportContainer: React.FC = () => {
  const width = 1200;
  const height = 750;
  const gridSize = 20;

  const [, setTick] = useState(0);
  const onUpdate = () => setTick(t => t + 1);
  
  const viewport = new Viewport(1, 0, 0, width, height);
  const [rect1] = useState(() => new Rect(300, 100, 100, 100, gridSize));
  const [rect2] = useState(() => new Rect(50, 250, 100, 100, gridSize));

  const [line] = useState(() => new Line(rect1.getCenter(), rect2.getCenter()));
  line.anchorIn(rect1.getCenter(), rect2.getCenter());


  return (
    <div className="w-full h-full bg-gray-200 flex justify-center items-center">
      <svg width={width} height={height} className="border border-gray-400 bg-white">
        <g transform={viewport.getTransform()}>

          <GridView
            gridSize={gridSize*10}
            width={width}
            height={height}
          />

          <LineSvg line={line} />
          <DraggableRect rect={rect1} onUpdate={onUpdate} />
          <DraggableRect rect={rect2} onUpdate={onUpdate} />

          {/* desenhar os pontos */}
          {/* <g>
            {line.divide()[0].getPoints().map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={5}
                fill="red"
              />
            ))}
            {line.divide()[1].getPoints().map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={5}
                fill="red"
              />
            ))}
          </g> */}

        </g>
      </svg>
    </div>

  )
}