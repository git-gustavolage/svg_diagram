import React, { useEffect, useState } from "react";
import { Line } from "../core/Line";

interface LineProps {
  line: Line;
}

export const LineSvg: React.FC<LineProps> = ({ line }) => {
  const [hasDivied, setHasDivided] = useState(false);
  const [segments, setSegments] = useState<Line[]>(() => [line]);

  var [left, right] = line.divide()
  left.anchorIn(line.start, left.end);
  right.anchorIn(left.end, right.end);

  useEffect(() => {

    if (hasDivied) {
      
      setSegments([left, right]);
    }
    console.log("has divided");
  }, [hasDivied]);

  const divide = () => {
    setHasDivided(true);
  }

  return (
    <g>
      {segments.map((line, index) => {
        return (
          <g key={index}>
            <line
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke="rgb(50, 50, 50, 0.5)"
              onDoubleClick={divide}
              strokeWidth={2}
              style={{ cursor: "pointer" }}
            />
            <circle
              cx={line.start.x}
              cy={line.start.y}
              r={5}
              stroke="rgb(50, 50, 50, 0.5)"
              strokeWidth={2}
              fill="rgb(50, 50, 50, 0.5)"
            />
            <circle
              cx={line.end.x}
              cy={line.end.y}
              r={5}
              stroke="rgb(50, 50, 50, 0.5)"
              strokeWidth={2}
              fill="rgb(50, 50, 50, 0.5)"
            />
          </g>)
      })}
    </g>
  );
};
