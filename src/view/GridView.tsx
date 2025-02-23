import { Grid as GridCore } from "../core/Grid";

interface GridPops {
  gridSize: number;
  width: number;
  height: number
}

export const GridView: React.FC<GridPops> = ({ gridSize, width, height }) => {

  const grid = new GridCore(gridSize);

  const horizontalLines = grid.getHorizontalLines(height);
  const verticalLines = grid.getVerticalLines(width);

  return (
    <g className="grid-lines">
      {verticalLines.map((x, index) => (
        <line
          key={`v-${index}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="rgb(25, 25, 25, 0.3)"
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
          stroke="rgb(25, 25, 25, 0.3)"
          strokeWidth={1}
        />
      ))}
    </g>
  )
}