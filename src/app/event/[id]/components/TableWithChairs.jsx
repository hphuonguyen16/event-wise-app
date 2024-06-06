import React, { useState } from "react";
import { Group, Circle } from "react-konva";
import Seat from "./Seat";
import { useMapObjectContext } from "@/context/MapObjectContext";

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
  tableInfo,
  rotationAngle,
  isSelected// Pass rotation angle as props
}) => {
  const tableX = 200;
  const tableY = 200;
  const tableRadius = tableInfo.size || 20;
  const chairRadius = 6; // Smaller chair radius

  const chairPositions = calculateChairPositions(
    tableX,
    tableY,
   tableRadius,
    chairRadius,
    numChairs
  );
  const { mapData, setMapData, chosenOption, setChosenOption } = useMapObjectContext();

  const handleClick = (e) => {
    setMapData({
      ...mapData,
      selectedObject: {
        section: null,
        object: null,
        text: null,
        table: tableInfo,
      },
    });
    setChosenOption(null);
  };


  const handleDragMove = (e) => {
    setMapData((prev) => {
      //find the section and update its position
      const updatedTables = prev.tables.map((item) => {
        if (tableInfo._id === item._id) {
          return {
            ...item,
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          };
        }
        return item;
      });
      return {
        ...prev,
        tables: updatedTables,
      };
    });
  }

  return (
    <Group
      draggable
      x={tableInfo.position?.x || tableX} // Apply position to the Group  
      y={tableInfo.position?.y || tableY} // Apply position to the Group
      rotation={tableInfo.rotation} // Apply rotation to the Group
      onClick={handleClick}
      onDragEnd={handleDragMove}
    >
      {/* Draw the table */}
      <Circle
        x={0} // Position relative to the group
        y={0} // Position relative to the group
        radius={tableRadius}
        fill="brown"
        stroke={isSelected ? "blue" : ""}
        strokeWidth={isSelected ? 2 : 0}
        dash={isSelected ? [4, 4] : []}
      />
      {/* Draw the chairs */}
      {chairPositions.map((pos, index) => (
        <Seat
          key={index}
          x={pos.x - tableX} // Adjust position relative to the group
          y={pos.y - tableY} // Adjust position relative to the group
          data={seatsInfo[index]}
          onHover={onHoverSeat}
          onSelect={onSelectSeat}
          onDeselect={onDeselectSeat}
        />
      ))}
    </Group>
  );
};

export default CircleTable;
