import React from "react";
import { Circle } from "./react-konva";
import { SEAT_SIZE } from "./helper";
import { useMapObjectContext } from "@/context/MapObjectContext";

function getColor(isSelected, isAssigned) {
  if (isSelected) {
    return "red";
  } else {
    return "#1b728d";
  }
}

const Seat = (props) => {
  const isBooked = props.data?.status === "booked";
  const { mapData, setMapData, chosenOption, setChosenOption, selectedSeats } =
    useMapObjectContext();
  const isSelected = selectedSeats.find((seat) => seat._id === props.data._id)
    ? true
    : false;
  const colorAssigned = props.data?.tier?.color;
  function handleClick(e) {
    if (props.isSelected) {
      props.onDeselect(props.data);
    } else {
      props.onSelect(props.data);
    }
    // setMapData({
    //   ...mapData,
    //   selectedSeats: [...mapData.selectedSeats, props.data],
    // });
  }


  return (
    <Circle
      x={props.x}
      y={props.y}
      radius={SEAT_SIZE / 2}
      fill={colorAssigned ? colorAssigned : getColor(isSelected)} 
      strokeWidth={1}
      // onMouseEnter={(e) => {
      //   e.target._clearCache();
      //   props.onHover(props.data?.name, e.target.getAbsolutePosition());
      //   const container = e.target.getStage().container();
      //   if (isBooked) {
      //     container.style.cursor = "not-allowed";
      //   } else {
      //     container.style.cursor = "pointer";
      //   }
      // }}
      // onMouseLeave={(e) => {
      //   props.onHover(null);
      //   const container = e.target.getStage().container();
      //   container.style.cursor = "";
      // }}
      // onClick={(e) => {
      //   if (isBooked) {
      //     return;
      //   }
      //   if (props.isSelected) {
      //     props.onDeselect(props.data.name);
      //   } else {
      //     props.onSelect(props.data.name);
      //   }
      // }}
      onClick={(e) => {
        handleClick();
      }}
      onTap={(e) => {
        if (isBooked) {
          return;
        }
        if (isSelected) {
          props.onDeselect(props.data.name);
        } else {
          props.onSelect(props.data.name);
        }
      }}
    />
  );
};

export default Seat;
