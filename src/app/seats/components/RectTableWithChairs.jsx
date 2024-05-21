import React from "react";
import { Rect, Circle, Group } from "./react-konva";

const calculateChairPositions = (
  tableX,
  tableY,
  tableWidth,
  tableHeight,
  chairRadius,
  numChairsHeight,
  numChairsWidth
) => {
  const positions = [];
  const chairSpacing = 2 * chairRadius;

  // Calculate positions of chairs along the height
  for (let i = 1; i <= numChairsHeight; i++) {
    // Chairs along the left side of the height
    const chairXLeft = tableX - chairSpacing;
    const chairYLeft = tableY + (i * tableHeight) / (numChairsHeight + 1);
    positions.push({ x: chairXLeft, y: chairYLeft });

    // Chairs along the right side of the height
    const chairXRight = tableX + tableWidth + chairSpacing;
    const chairYRight = tableY + (i * tableHeight) / (numChairsHeight + 1);
    positions.push({ x: chairXRight, y: chairYRight });
  }

  // Calculate positions of chairs along the width
  for (let i = 1; i <= numChairsWidth; i++) {
    // Chairs along the top side of the width
    const chairXTop = tableX + (i * tableWidth) / (numChairsWidth + 1);
    const chairYTop = tableY - chairSpacing;
    positions.push({ x: chairXTop, y: chairYTop });

    // Chairs along the bottom side of the width
    const chairXBottom = tableX + (i * tableWidth) / (numChairsWidth + 1);
    const chairYBottom = tableY + tableHeight + chairSpacing;
    positions.push({ x: chairXBottom, y: chairYBottom });
  }

  return positions;
};

const TableWithChairs = ({
  width,
  height,
  numChairsHeight = 8,
  numChairsWidth =2
}) => {
  const tableX = 100;
  const tableY = 100;
  const chairRadius = 5;

  const chairPositions = calculateChairPositions(
    tableX,
    tableY,
    width,
    height,
    chairRadius,
    numChairsHeight,
    numChairsWidth
  );

  return (
    <Group draggable>
      {/* Draw the rectangle table */}
      <Rect x={tableX} y={tableY} width={width} height={height} fill="brown" />
      {/* Draw the circle chairs */}
      {chairPositions.map((pos, index) => (
        <Circle
          key={index}
          x={pos.x}
          y={pos.y}
          radius={chairRadius}
          fill="blue"
        />
      ))}
    </Group>
  );
};

export default TableWithChairs;
