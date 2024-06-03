import React from "react";
import { Rect, Circle, Group, Text } from "react-konva";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import { useMapObjectContext } from "@/context/MapObjectContext";

const Object = ({
  label,
  shape,
  icon,
  objectInfo,
  isSelected,
  x = 100,
  y = 100,
}) => {
  // Center positions for the icon
  const { mapData, setMapData, chosenOption, setChosenOption } = useMapObjectContext();
  const width = objectInfo.width || 150;
  const height = objectInfo.height || 100;
  const size = objectInfo.size || 100;
  const iconSize = shape === "circle" ? size / 2 : Math.min(width, height) / 2;
  
  console.log(mapData)
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

  return (
    <Group
      x={x}
      y={y}
      draggable
      onClick={handleClick}
      rotation={objectInfo.rotation}
      offsetX={width / 2}
      offsetY={height / 2}
    >
      {shape === "circle" ? (
        <Circle
          radius={size / 2}
          fill="lightgrey"
          stroke={isSelected ? "blue" : ""}
          strokeWidth={isSelected ? 2 : 0}
          dash={isSelected ? [4, 4] : []}
        />
      ) : (
        <Rect
          width={width}
          height={height}
          fill="lightgrey"
          stroke={isSelected ? "blue" : ""}
          strokeWidth={isSelected ? 2 : 0}
          dash={isSelected ? [4, 4] : []}
        />
      )}
      <Text
        text={label}
        fontSize={10}
        y={shape === "circle" ? size / 2 : height / 2}
        offsetY={7} // Half of font size to center vertically
        width={shape === "circle" ? size : width}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Object;
