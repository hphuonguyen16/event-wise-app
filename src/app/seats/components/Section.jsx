import React from "react";
import { Rect, Group, Text } from "./react-konva";
import SubSection from "./SubSection";
import { useState, useEffect } from "react";
import {
  SECTION_TOP_PADDING,
  getSectionWidth,
  getSubsectionWidth,
} from "./helper";
import { useMapObjectContext } from "@/context/MapObjectContext";

const Section = ({
  section,
  height,
  x,
  y,
  onHoverSeat,
  onSelectSeat,
  onDeselectSeat,
  isSelected,
  skewX = 0, // default skew values
  skewY = 0,
  rotation = 0.2,
}) => {
  const containerRef = React.useRef();
  const {
    mapData,
    setMapData,
    chosenOption,
    setChosenOption,
    selectedSeats,
    setSelectedSeats,
  } = useMapObjectContext();
  const [position, setPosition] = useState({ x: 320, y: 150 });

  // caching will boost rendering
  // we just need to recache on some changes
  // React.useEffect(() => {
  //   containerRef.current.cache();
  // }, [section, mapData.selectedSeats]);

  const width = getSectionWidth(section);

  const handleDragMove = (e) => {
    setMapData((prev) => {
      //find the section and update its position
      const updatedSections = prev.sections.map((sec) => {
        if (sec._id === section._id) {
          return {
            ...sec,
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          };
        }
        return sec;
      });
      return {
        ...prev,
        sections: updatedSections,
      };
    });
  };

  const handleClick = () => {
    setMapData({
      ...mapData,
      selectedObject: {
        section: section,
        object: null,
        text: null,
        table: null,
      },
    });
    setChosenOption(null);
  };
  let lastSubsectionX = 0;

  console.log(mapData);

  return (
    <Group
      x={section.position?.x || position.x}
      y={section.position?.y || position.y}
      draggable 
      rotation={section.rotation || rotation}
      offsetX={width / 2}
      offsetY={height / 2}
      onClick={handleClick}
      skewX={section.skewX || skewX}
      skewY={section.skewY || skewY}
      onDragEnd={handleDragMove}
    >
      <Rect
        width={width}
        height={height}
        stroke={isSelected ? "blue" : ""}
        strokeWidth={isSelected ? 2 : 0}
        dash={isSelected ? [4, 4] : []}
      />
      {section.subsections.map((subsection) => {
        const subWidth = getSubsectionWidth(subsection);
        const pos = lastSubsectionX;
        lastSubsectionX += subWidth;

        return (
          <SubSection
            x={pos}
            y={SECTION_TOP_PADDING}
            key={subsection.name}
            data={subsection}
            width={subWidth}
            height={height}
            onHoverSeat={onHoverSeat}
            onSelectSeat={onSelectSeat}
            onDeselectSeat={onDeselectSeat}
            // skewX={section.skewX || skewX}
            // skewY={section.skewY || skewY}
            // rotation={section.rotation || rotation}
          />
        );
      })}
      <Text
        text={section.name}
        //height={SECTION_TOP_PADDING}
        width={width}
        align="center"
        verticalAlign="middle"
        fontSize={12}
        y={SECTION_TOP_PADDING}
      />
    </Group>
  );
};

Section.displayName = "Section";

export default Section;
