import React from "react";
import { Rect, Group, Text } from "./react-konva";
import SubSection from "./SubSection";
import { useState } from "react";
import {
  SECTION_TOP_PADDING,
  getSectionWidth,
  getSubsectionWidth,
} from "./helper";

const Section = React.memo(
  ({
    section,
    height,
    x,
    y,
    onHoverSeat,
    onSelectSeat,
    onDeselectSeat,
    selectedSeatsIds,
    skewX = 0, // default skew values
    skewY = 0,
    rotation = 0, // default rotation value
  }) => {
    const containerRef = React.useRef();

    // caching will boost rendering
    // we just need to recache on some changes
    React.useEffect(() => {
      containerRef.current.cache();
    }, [section, selectedSeatsIds]);

    const width = getSectionWidth(section);
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
      setIsSelected(true);
    };
    let lastSubsectionX = 0;

    console.log("is selected", isSelected);
    return (
      <Group
        y={y}
        x={x}
        ref={containerRef}
        draggable
        skewX={skewX}
        skewY={skewY}
        rotation={rotation}
        onClick={handleClick}
      >
        <Rect
          width={width}
          height={height}
          fill="white"
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
              selectedSeatsIds={selectedSeatsIds}
              skewX={skewX}
              skewY={skewY}
              rotation={rotation}
            />
          );
        })}
        <Text
          text={section.name}
          height={SECTION_TOP_PADDING}
          width={width}
          align="center"
          verticalAlign="middle"
          fontSize={20}
        />
      </Group>
    );
  }
);

Section.displayName = "Section";

export default Section;
