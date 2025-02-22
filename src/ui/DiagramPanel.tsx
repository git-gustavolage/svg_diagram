import React from 'react';
import { Viewport } from '../core/Viewport';
import { Grid } from '../core/Grid';
import DraggableRectComponent from './DraggableRectComponent';
import Container from '../core/Container';
import { DraggableRect } from '../core/DraggableRect';

const DiagramPanel: React.FC = () => {
  const width = 800;
  const height = 600;
  const gridSize = 30;

  const viewport = new Viewport(1, 0, 0);
  const grid = new Grid(gridSize);
  const container = new Container(50, 50, 200, 200, gridSize);

  container.append(new DraggableRect('1', 100, 100, 100, 100, gridSize));
  container.append(new DraggableRect('2', 300, 100, 100, 100, gridSize));
  container.append(new DraggableRect('3', 500, 100, 400, 100, gridSize));

  const verticalLines = grid.getVerticalLines(width);
  const horizontalLines = grid.getHorizontalLines(height);

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center">
      <svg width={width} height={height} className="border border-gray-400 bg-white">
        <g transform={viewport.getTransform()}>

          <g className="grid-lines">
            {verticalLines.map((x, index) => (
              <line
                key={`v-${index}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            ))}
            {horizontalLines.map((y, index) => (
              <line
                key={`h-${index}`}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            ))}
          </g>

          <g className="container">
            {container.getElements().map((element: DraggableRect) => (
              <DraggableRectComponent
                key={element.id}
                id={element.id}
                initialX={element.x}
                initialY={element.y}
                width={element.width}
                height={element.height}
                gridSize={gridSize}
              />
            ))}
          </g>

        </g>
      </svg>
    </div>
  );
};

export default DiagramPanel;
