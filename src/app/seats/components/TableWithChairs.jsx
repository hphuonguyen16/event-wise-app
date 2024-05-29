import React from "react";
import { Layer, Circle, Group } from "./react-konva";
import Seat from "./Seat";

// Function to calculate positions of chairs around the table
const calculateChairPositions = (
  tableX,
  tableY,
  tableRadius,
  chairRadius,
  numChairs
) => {
  const minChairDistance = 2 * chairRadius;
  let angleStep =
    2 * Math.asin(minChairDistance / (2 * (tableRadius + chairRadius)));
  let chairCount = numChairs || Math.floor((2 * Math.PI) / angleStep);
  angleStep = (2 * Math.PI) / chairCount;

  const positions = [];
  for (let i = 0; i < chairCount; i++) {
    const angle = i * angleStep;
    const x = tableX + (tableRadius + chairRadius) * Math.cos(angle);
    const y = tableY + (tableRadius + chairRadius) * Math.sin(angle);
    positions.push({ x, y });
  }
  return positions;
};

const CircleTable = ({
  numChairs,
  seatsInfo,
  onHoverSeat,
  onSelectSeat,
  onDeselectSeat,
  selectedSeatsIds,
  tableInfo
}) => {
  const tableX = 200;
  const tableY = 200;
  const tableRadius = 20; // Smaller table radius
  const chairRadius = 6; // Smaller chair radius

  const chairPositions = calculateChairPositions(
    tableX,
    tableY,
    tableRadius,
    chairRadius,
    numChairs
  );

  return (
    <Group draggable>
      {/* Draw the table */}
      <Circle x={tableX} y={tableY} radius={tableRadius} fill="brown" />
      {/* Draw the chairs */}
      {chairPositions.map((pos, index) => (
        // <Circle
        //   key={index}
        //   x={pos.x}
        //   y={pos.y}
        //   radius={chairRadius}
        //   fill="blue"
        // />
        <Seat
          key={index}
          x={pos.x}
          y={pos.y}
          data={seatsInfo[index]}
          onHover={onHoverSeat}
          onSelect={onSelectSeat}
          onDeselect={onDeselectSeat}
          isSelected={selectedSeatsIds.indexOf(seatsInfo[index]?.name) >= 0}
        />
      ))}
    </Group>
  );
};

export default CircleTable;
