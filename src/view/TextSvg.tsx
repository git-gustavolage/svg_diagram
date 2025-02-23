import { useRef } from "react";
import { DraggableElement } from "../core/DraggableElemet";


interface TextProps {
  text: string;
  element: DraggableElement
}

export const TextSvg: React.FC<TextProps> = ({ text, element }) => {
  const textRef = useRef<SVGTextElement>(null);
  const width = textRef.current?.getBBox().width
  
  return (
    <text
      ref={textRef}
      fill="black"
      x={element.getCenter().x - (width ? width : 10) / 2}
      y={element.getCenter().y + 4}
      pointerEvents="none"
      fontSize={16}
    >
      {text}
    </text>
  )
}