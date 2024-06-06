"use client";
import React, { use } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import moment from "moment";
import MainStage from "../../app/seats/components/MainStage";
import { useMapObjectContext } from "../../context/MapObjectContext";
import TicketToBuy from "./TicketToBuy";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import {SeatStatetus} from "@/constants/seatStatus";

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
    return ticket?.quantity - ticket?.sold > 0
      ? ticket?.quantity - ticket?.sold + " Tickets Available"
      : "Sold Out";
  }
}

function ReservedTicketCardList({ tickets, handleSave }) {
  const {
    mapData,
    setMapData,
    selectedTier,
    setSelectedTier,
    orders,
    setOrders,
    updateSeatStatus,
    getMapData,
  } = useMapObjectContext();
  const [buyOnMap, setBuyOnMap] = useState(false);

  function handleDeleteOrder(index) {
    const order = orders[index];
    setOrders(orders.filter((_, i) => i !== index));
    updateSeatStatus(order.seat, SeatStatetus.AVAILABLE);
  }

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
              getTicketStatus={getTicketStatus}
            />
          )}
          <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-1">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-8">
              {buyOnMap && (
                <div>
                  {orders?.map((order, index) => {
                    const ticket = order.ticketType;
                    return (
                      <div
                        key={order.id}
                        className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                          <div className="md:col-span-2">
                            <div className="flex flex-col max-[500px]:items-center gap-3">
                              <h6 className="font-semibold text-base leading-7 text-black">
                                1 x {ticket?.name}
                              </h6>
                            </div>
                            <div className="flex flex-col max-[500px]:items-center gap-3">
                              <h6 className="font-medium text-base leading-7 text-black">
                                {order.seat.name}
                              </h6>
                            </div>
                            <div className="flex max-[500px]:items-center gap-1">
                              <div
                                class="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                                style={{ backgroundColor: ticket.tier.color }}
                              ></div>
                              <span>{ticket.tier.name}</span>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center justify-evenly h-full">
                              <p className="font-semibold text-lg text-black">
                                {order.quantity > 0
                                  ? (
                                      order.quantity * ticket?.price
                                    ).toLocaleString("vi", {
                                      style: "currency",
                                      currency: "VND",
                                    })
                                  : "Free"}
                              </p>
                              <IconButton onClick={() => handleDeleteOrder(index)}>
                                <ClearIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {buyOnMap ? (
                <button
                  onClick={(event) => handleSave(event, orders)}
                  className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                >
                  Checkout
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
