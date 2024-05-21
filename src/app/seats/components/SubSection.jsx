import React, { useState } from "react";
import { Group, Text } from "./react-konva";
import Seat from "./Seat";
import { SEATS_DISTANCE, SUBSECTION_PADDING, SEAT_SIZE } from "./helper";

const SubSection = ({
  width,
  x,
  y,
  data,
  onHoverSeat,
  onSelectSeat,
  onDeselectSeat,
  selectedSeatsIds,
  skewX = 0, // default skew values
  skewY = 0,
  rotation = 0, // default rotation value
}) => {
  // State to track the position of the SubSection
  const [position, setPosition] = useState({ x, y });

  return (
    <Group
      x={position.x}
      y={position.y}
      draggable
      skewX={skewX}
      skewY={skewY}
      rotation={rotation}
      onDragEnd={(e) => {
        setPosition({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    >
      {Object.keys(data.seats_by_rows).map((rowKey, rowIndex) => {
        const row = data.seats_by_rows[rowKey];
        return (
          <React.Fragment key={rowKey}>
            {row.map((seat, seatIndex) => (
              <Seat
                key={seat.name}
                x={seatIndex * SEATS_DISTANCE + SUBSECTION_PADDING}
                y={rowIndex * SEATS_DISTANCE + SUBSECTION_PADDING}
                data={seat}
                onHover={onHoverSeat}
                onSelect={onSelectSeat}
                onDeselect={onDeselectSeat}
                isSelected={selectedSeatsIds.indexOf(seat.name) >= 0}
              />
            ))}
            <Text
              text={rowKey}
              x={SUBSECTION_PADDING - SEATS_DISTANCE}
              y={rowIndex * SEATS_DISTANCE + SUBSECTION_PADDING - SEAT_SIZE / 2}
              fontSize={SEAT_SIZE}
              key={"label-left" + rowKey}
            />
          </React.Fragment>
        );
      })}
      {data.seats_by_rows[1].map((_, seatIndex) => (
        <Text
          text={(seatIndex + 1).toString()}
          x={seatIndex * SEATS_DISTANCE + SUBSECTION_PADDING - 50}
          width={100}
          y={
            Object.keys(data.seats_by_rows).length * SEATS_DISTANCE +
            SUBSECTION_PADDING
          }
          key={"label-bottom" + seatIndex}
          align="center"
        />
      ))}
      <Text text={data.name} width={width} align="center" y={-10} />
    </Group>
  );
};

SubSection.displayName = "SubSection";

export default SubSection;
