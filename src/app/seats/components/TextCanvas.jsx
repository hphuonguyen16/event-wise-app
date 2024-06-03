"use client";
import React, { useState, useEffect } from "react";
import { Text, Group } from "./react-konva";
import { useMapObjectContext } from "@/context/MapObjectContext";

const TextCanvas = ({ textInfo, isSelected}) => {
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

  return (
    <Group
      x={position.x}
      y={position.y}
      draggable
      onClick={handleClick}
      rotation={textInfo.rotation}
      onDragEnd={(e) => {
        setPosition({
          x: e.target.x(),
          y: e.target.y(),
          isDragging: false,
        });
      }}
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
