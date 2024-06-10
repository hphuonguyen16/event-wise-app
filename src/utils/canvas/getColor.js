import { SeatStatetus } from "../../constants/seatStatus";

export const getColor = (isSelected, seatStatus, tierColor) => {
  if (isSelected) return "black";
  switch (seatStatus) {
    case SeatStatetus.BOOKING:
      return "yellow";
    case SeatStatetus.BOOKED:
      return "red";
    case SeatStatetus.AVAILABLE:
      if (!tierColor) return "#D2D6DF";
      return tierColor;
    default:
      return tierColor || "#D2D6DF";
  }
};
