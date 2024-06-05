import React, { use } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import moment from "moment";
import MainStage from "../../app/seats/components/MainStage";
import { useMapObjectContext } from "../../context/MapObjectContext";

const TicketStatus = {
  ON_SALE: "On Sale",
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
};

function getTicketStatus(ticket) {
  const parsedstartDate = moment(ticket?.startDate);
  const parsedendDate = moment(ticket?.endDate);
  const currentDate = new Date();

  if (currentDate >= parsedendDate) {
    return TicketStatus.COMPLETED;
  } else if (currentDate < parsedstartDate) {
    return "Upcoming at " + parsedstartDate.format("DD/MM/YYYY");
  } else {
    return ticket.quantity - ticket.sold > 0
      ? ticket.quantity - ticket.sold + " Tickets Available"
      : "Sold Out";
  }
}

function TicketMap({ tickets, handleSave }) {
  const [orders, setOrders] = useState([]);
  const { mapData, setMapData } = useMapObjectContext();

  function handleAddQuantity(id) {
    const ticket = tickets.find((ticket) => ticket._id === id);
    // check if ticket on sale
    const parsedstartDate = moment(ticket?.startDate);
    const parsedendDate = moment(ticket?.endDate);
    const currentDate = new Date();
    if (currentDate >= parsedendDate) {
      return;
    } else if (currentDate < parsedstartDate) {
      return;
    }
    const remaining = ticket.quantity - ticket.sold;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              quantity: Math.min(order.quantity + 1, remaining),
            }
          : order
      )
    );
  }

  function handleSubtractQuantity(id) {
    // check if ticket on sale
    const ticket = tickets.find((ticket) => ticket._id === id);
    const parsedstartDate = moment(ticket?.startDate);
    const parsedendDate = moment(ticket?.endDate);
    const currentDate = new Date();
    if (currentDate >= parsedendDate) {
      return;
    } else if (currentDate < parsedstartDate) {
      return;
    }
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, quantity: Math.max(0, order.quantity - 1) }
          : order
      )
    );
  }

  useEffect(() => {
    setOrders(tickets.map((ticket) => ({ id: ticket._id, quantity: 0 })));
  }, [tickets]);

  return (
    <section class=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div class="grid grid-cols-12">
          <div class="col-span-12 xl:col-span-8 lg:pr-8 pb-8 lg:py-1 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <MainStage mapData={mapData} setMapData={setMapData} />
          </div>
          <div class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-1">
            <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div class="mt-8">
              <form>
                {/* <div class="flex items-center justify-between py-8">
                  <p class="font-medium text-xl leading-8 text-black">
                    {orders.reduce((acc, order) => acc + order.quantity, 0) +
                      " Items"}
                  </p>
                  <p class="font-semibold text-xl leading-8 text-indigo-600">
                    {orders.reduce(
                      (acc, order) =>
                        acc +
                        order.quantity *
                          tickets.find((ticket) => ticket._id === order.id)
                            .price,
                      0
                    ) + "d"}
                  </p>
                </div> */}
                <button
                  onClick={(event) => handleSave(event, orders)}
                  class="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                >
                  Buy on Map
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TicketMap;
