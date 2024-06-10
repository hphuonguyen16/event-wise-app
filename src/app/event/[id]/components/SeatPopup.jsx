import React from "react";
import { useMapObjectContext } from "@/context/MapObjectContext";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import { update } from "lodash";
import { UpdateSharp } from "@mui/icons-material";
import { SeatStatetus } from "@/constants/seatStatus";
import { TicketStatus } from "@/constants/ticketStatus";
import moment from "moment";

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

function isTicketOnSale(ticket) {
  //check if ticket is sold out
  if (ticket?.sold >= ticket?.quantity) return false;
  const parsedstartDate = moment(ticket?.startDate);
  const parsedendDate = moment(ticket?.endDate);
  const currentDate = new Date();
  return currentDate >= parsedstartDate && currentDate < parsedendDate;
}
function getTicketStatus(ticket) {
  const parsedstartDate = moment(ticket?.startDate);
  const parsedendDate = moment(ticket?.endDate);
  const currentDate = new Date();

  if (currentDate >= parsedendDate) {
    return 'End Sale';
  } else if (currentDate < parsedstartDate) {
    return "Upcoming at " + parsedstartDate.format("DD/MM/YYYY");
  } else {
    return ticket.quantity - ticket.sold > 0
      ? ticket.quantity - ticket.sold + " Tickets Available"
      : "Sold Out";
  }
}
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
    if (seat.status !== SeatStatetus.AVAILABLE) return;
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

  console.log("orders", orders);

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
              {ticket.discountPrice && ticket.discountPrice < ticket.price ? (
                <>
                  <span style={{ textDecoration: "line-through" }}>
                    {ticket.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <br />
                  <span style={{ color: "red" }}>
                    {ticket.discountPrice.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </>
              ) : ticket.price > 0 ? (
                ticket.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })
              ) : (
                "Free"
              )}
            </p>
            <p className="text-sm text-gray-500">{getTicketStatus(ticket)} </p>
          </div>
          <button
            onClick={() => onSelect(ticket)}
            className={`${
              isTicketOnSale(ticket)
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded`}
            disabled={!isTicketOnSale(ticket)}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default Popup;
