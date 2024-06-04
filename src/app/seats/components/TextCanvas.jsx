"use client";
import React, { useState, useEffect } from "react";
import { Text, Group } from "./react-konva";
import { useMapObjectContext } from "@/context/MapObjectContext";

const TextCanvas = ({ textInfo, isSelected }) => {
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
    isDragging: false,
  });
  const [rotation, setRotation] = useState(textInfo.rotation || 0);
  const { mapData, setMapData, chosenOption, setChosenOption } =
    useMapObjectContext();

  function handleClick() {
    setMapData({
      ...mapData,
      selectedObject: {
        section: null,
        object: null,
        text: textInfo,
        table: null,
      },
    });
    setChosenOption(null);
  }

  //handleDragMove
  const handleDragMove = (e) => {
    setMapData((prev) => {
      //find the section and update its position
      const updatedTexts = prev.texts.map((text) => {
        if (textInfo._id === text._id) {
          return {
            ...text,
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          };
        }
        return text;
      });
      return {
        ...prev,
        texts: updatedTexts,
      };
    });
  };

  return (
    <Group
      x={textInfo.position?.x || position.x}
      y={textInfo.position?.y || position.y}
      draggable
      onClick={handleClick}
      rotation={textInfo.rotation}
      onDragEnd={handleDragMove}
    >
      <Text
        text={textInfo.text}
        fill={position.isDragging ? "green" : isSelected ? "blue" : "black"}
        onDragStart={() => {
          setPosition({ ...position, isDragging: true });
        }}
        onDragEnd={(e) => {
          setPosition({
            x: e.target.x(),
            y: e.target.y(),
            isDragging: false,
          });
        }}
        fontSize={textInfo.size || 14}
      />
    </Group>
  );
};

export default TextCanvas;
