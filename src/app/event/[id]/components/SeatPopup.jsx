import React from "react";
import { useMapObjectContext } from "@/context/MapObjectContext";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import { update } from "lodash";
import { UpdateSharp } from "@mui/icons-material";
import { SeatStatetus } from "@/constants/seatStatus";

const isClickedInside = (e, element) => {
  let node = e.target;
  while (node) {
    if (node === element) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

const Popup = ({ position, seat, onClose }) => {
  const containerRef = React.useRef(null);
  const {
    selectedTier,
    setSelectedTier,
    ticketTypes,
    setTicketTypes,
    orders,
    setOrders,
    updateSeatStatus,
  } = useMapObjectContext();
  const [tickets, setTickets] = React.useState([]);
  const axiosPrivate = useAxiosPrivate();

  console.log(seat);

  React.useEffect(() => {
    const onClick = (e) => {
      if (!isClickedInside(e, containerRef.current)) {
        onClose();
      }
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  const onSelect = async (ticket) => {
    if(seat.status !== SeatStatetus.AVAILABLE) return;
    setOrders((prev) => {
      return [
        ...prev,
        {
          seat: seat,
          ticketType: ticket,
          quantity: 1,
        },
      ];
    });
    updateSeatStatus(seat, SeatStatetus.BOOKING);
  };

  console.log('orders', orders)

  React.useEffect(() => {
    setTickets(ticketTypes[selectedTier?._id]);
  }, [selectedTier]);
  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: position.y + 20 + "px",
        left: position.x + 20 + "px",
        padding: "10px",
        borderRadius: "3px",
        boxShadow: "0 0 5px grey",
        zIndex: 10,
        backgroundColor: "white",
        color: "black",
        width: "300px",
      }}
    >
      <div className="flex justify-between items-center border-b py-2">
        <p className="text-lg font-bold">{seat?.name}</p>
      </div>
      {tickets?.map((ticket) => (
        <div
          className="flex justify-between items-center border-b py-2"
          key={ticket._id}
        >
          <div className="flex-1">
            <p className="text-lg font-bold">{ticket?.name}</p>
            <p className="text-sm text-gray-500">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(ticket?.price)}
            </p>
          </div>
          <button
            onClick={() => onSelect(ticket)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default Popup;
