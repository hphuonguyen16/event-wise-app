import React from "react";
import { Circle } from "./react-konva";
import { SEAT_SIZE } from "./helper";
import { useMapObjectContext } from "@/context/MapObjectContext";
import { SeatStatetus } from "@/constants/seatStatus";

const getColor = (isSelected, seatStatus, tierColor) => {
  if (isSelected) return "black";
  switch (seatStatus) {
    case SeatStatetus.BOOKING:
      return "yellow";
    case SeatStatetus.BOOKED:
      return "red";
    case SeatStatetus.AVAILABLE:
      if (!tierColor) return "gray";
      return tierColor;
    default:
      return "#1b728d";
  }
};

const Seat = (props) => {
  const { selectedSeats, onHover, onSelect, onDeselect } =
    useMapObjectContext();
  const isSelected = selectedSeats.some((seat) => seat._id === props.data._id);
  const seatColor = getColor(
    isSelected,
    props.data?.status,
    props.data?.tier?.color
  );
  const isBooked = props.data?.status === SeatStatetus.BOOKED;

  const handleClick = () => {
    if (isBooked) return;

    isSelected ? props.onDeselect(props.data) : props.onSelect(props.data);
  };

  return (
    <Circle
      x={props.x}
      y={props.y}
      radius={SEAT_SIZE / 2}
      fill={seatColor}
      strokeWidth={1}
      onMouseEnter={(e) => {
        e.target._clearCache();
        props.onHover(props.data, e.target.getAbsolutePosition());
        const container = e.target.getStage().container();
        container.style.cursor =
          isBooked || !props.data.tier ? "not-allowed" : "pointer";
      }}
      onClick={handleClick}
      onTap={handleClick}
    />
  );
};

export default Seat;
