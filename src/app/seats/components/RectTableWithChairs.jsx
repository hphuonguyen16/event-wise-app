import React, { useState } from "react";
import { Rect, Group } from "react-konva";
import Seat from "./Seat";
import { useMapObjectContext } from "@/context/MapObjectContext";

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
  numChairsHeight,
  numChairsWidth,
  seatsInfo,
  onHoverSeat,
  onSelectSeat,
  onDeselectSeat,
  selectedSeatsIds,
  tableInfo,
  isSelected,
}) => {
  const chairRadius = 6; // Define the chair radius
  const chairSpacing = 2 * chairRadius; // Define the spacing between chairs and the table
  const { mapData, setMapData, chosenOption, setChosenOption } =
    useMapObjectContext();

  // Calculate the table width and height based on the number of chairs and spacing
  const tableWidth = (numChairsWidth + 1) * chairSpacing;
  const tableHeight = (numChairsHeight + 1) * chairSpacing;

  const tableX = 100;
  const tableY = 100;

  const chairPositions = calculateChairPositions(
    tableX,
    tableY,
    tableWidth,
    tableHeight,
    chairRadius,
    numChairsHeight,
    numChairsWidth
  );

  const handleClick = (e) => {
    setMapData({
      ...mapData,
      selectedObject: {
        table: tableInfo,
        section: null,
        object: null,
        text: null,
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
  };

  return (
    <Group
      draggable
      x={tableInfo.position?.x || tableX + tableWidth / 2} // Apply position to the Group
      y={tableInfo.position?.y || tableY + tableHeight / 2} // Apply position to the Group
      rotation={tableInfo.rotation} // Apply rotation to the Group
      onClick={handleClick}
      offsetX={tableWidth / 2}
      offsetY={tableHeight / 2}
      onDragEnd={handleDragMove}
    >
      {/* Draw the rectangle table */}
      <Rect
        x={-tableWidth / 2}
        y={-tableHeight / 2}
        width={tableWidth}
        height={tableHeight}
        fill="white"
        stroke={isSelected ? "blue" : "#C2C7DF"}
        strokeWidth={isSelected ? 1 : 2}
        dash={isSelected ? [4, 4] : []}
      />
      {/* Draw the circle chairs */}
      {chairPositions.map((pos, index) => (
        <Seat
          key={index}
          x={pos.x - (tableX + tableWidth / 2)}
          y={pos.y - (tableY + tableHeight / 2)}
          data={seatsInfo[index]}
          onHover={onHoverSeat}
          onSelect={onSelectSeat}
          onDeselect={onDeselectSeat}
        />
      ))}
    </Group>
  );
};

export default TableWithChairs;
