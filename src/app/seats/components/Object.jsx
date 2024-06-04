import React from "react";
import { Rect, Circle, Group, Text } from "react-konva";
import { useMapObjectContext } from "@/context/MapObjectContext";
import { useState } from "react";

const Object = ({ label, shape, objectInfo, isSelected, x = 100, y = 100 }) => {
  const { mapData, setMapData, chosenOption, setChosenOption } =
    useMapObjectContext();
  const width = objectInfo.width || 150;
  const height = objectInfo.height || 100;
  const size = objectInfo.size || 100;
  const fontSize = 10; // Set font size here for reuse
  const [position, setPosition] = useState({ x: 320, y: 150 });

  const handleClick = () => {
    setMapData({
      ...mapData,
      selectedObject: {
        object: objectInfo,
        text: null,
        table: null,
        section: null,
      },
    });
    setChosenOption(null);
  };

  const handleDragMove = (e) => {
    setMapData((prev) => {
      const updatedObjects = prev.objects.map((obj) => {
        if (objectInfo._id === obj._id) {
          return {
            ...obj,
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          };
        }
        return obj;
      });
      return {
        ...prev,
        objects: updatedObjects,
      };
    });
  };

  return (
    <Group
      x={objectInfo.position?.x || position.x}
      y={objectInfo.position?.y || position.y}
      draggable
      onClick={handleClick}
      rotation={objectInfo.rotation}
      offsetX={width / 2}
      offsetY={height / 2}
      onDragEnd={handleDragMove}
    >
      {objectInfo.shape === "circle" ? (
        <>
          <Circle
            radius={size / 2}
            fill="lightgrey"
            stroke={isSelected ? "blue" : ""}
            strokeWidth={isSelected ? 2 : 0}
            dash={isSelected ? [4, 4] : []}
          />
          <Text
            text={label}
            fontSize={fontSize}
            x={-size / 2} // Adjust x position for centering within rectangle
            y={-size / 2}
            width={size}
            height={size}
            align="center"
            verticalAlign="middle"
          />
        </>
      ) : (
        <>
          <Rect
            width={width}
            height={height}
            fill="lightgrey"
            stroke={isSelected ? "blue" : ""}
            strokeWidth={isSelected ? 2 : 0}
            dash={isSelected ? [4, 4] : []}
          />
          <Text
            text={label}
            fontSize={fontSize}
            x={-width / 2 + width / 2} // Adjust x position for centering within rectangle
            y={-height / 2 + height / 2}
            width={width}
            height={height}
            align="center"
            verticalAlign="middle"
          />
        </>
      )}
    </Group>
  );
};

export default Object;
