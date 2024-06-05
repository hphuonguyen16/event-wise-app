"use client";
import React, { use } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import moment from "moment";
import MainStage from "../../app/seats/components/MainStage";
import { useMapObjectContext } from "../../context/MapObjectContext";
import TicketToBuy from "./TicketToBuy";

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

function ReservedTicketCardList({ tickets, handleSave }) {
  const [orders, setOrders] = useState([]);
  const { mapData, setMapData, selectedTier, setSelectedTier } = useMapObjectContext();
  const [buyOnMap, setBuyOnMap] = useState(false);

  console.log(buyOnMap);

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
    <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full px-4 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          {buyOnMap ? (
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pb-8 lg:py-1 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <MainStage
                mapData={mapData}
                setMapData={setMapData}
                setBuyOnMap={setBuyOnMap}
              />
            </div>
          ) : (
            <TicketToBuy
              tickets={tickets}
              orders={orders}
              setOrders={setOrders}
              handleAddQuantity={handleAddQuantity}
              handleSubtractQuantity={handleSubtractQuantity}
              getTicketStatus={getTicketStatus}
            />
          )}
          <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-1">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-8">
              {buyOnMap && (
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    {orders.reduce((acc, order) => acc + order.quantity, 0) +
                      " Items"}
                  </p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">
                    {orders.reduce(
                      (acc, order) =>
                        acc +
                        order.quantity *
                          tickets.find((ticket) => ticket._id === order.id)
                            .price,
                      0
                    ) + "d"}
                  </p>
                </div>
              )}
              {buyOnMap ? (
                <button
                  onClick={handleSave}
                  className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setBuyOnMap(true)}
                  className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                >
                  Buy on Map
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservedTicketCardList;
