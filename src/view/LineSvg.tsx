import React, { useState } from "react";
import { Line as LineDomain } from "../core/Line";

interface LineProps {
  line: LineDomain;
}

export const LineSvg: React.FC<LineProps> = ({ line }) => {
  const [segments, setSegments] = useState(() => [line]);

  const divide = () => {
    var [left, right] = line.divide()
    left.anchorIn(left.start, right.start);
    right.anchorIn(right.start, right.end)
    setSegments([left, right]);
  }

  return (
    <g>
      {segments.map((s, index) => (
        <g key={index}>
          <line
            x1={s.start.x}
            y1={s.start.y}
            x2={s.end.x}
            y2={s.end.y}
            stroke="black"
            onDoubleClick={divide}
            strokeWidth={2}
            className="p-4"
          />
          <circle
            cx={s.start.x}
            cy={s.start.y}
            r={5}
            fill="red"
          />
          <circle
            cx={s.end.x}
            cy={s.end.y}
            r={5}
            fill="red"
          />
        </g>
      ))}

      {/* <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="black"
      strokeWidth={2}
      /> */}
    </g>
  );
};
