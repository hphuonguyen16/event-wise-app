import React, { use } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
function TicketCardList({ tickets, handleSave }) {
  const [orders, setOrders] = useState([]);

  console.log(orders);

  function handleAddQuantity(id) {
    const ticket = tickets.find((ticket) => ticket._id === id);
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
            <div class="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 class="font-manrope font-bold text-3xl leading-10 text-black">
                Tickets
              </h2>
              <h2 class="font-manrope font-bold text-xl leading-8 text-gray-600">
                2 Items
              </h2>
            </div>
            <div class="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div class="col-span-12 md:col-span-7">
                <p class="font-normal text-lg leading-8 text-gray-400">
                  Ticket Details
                </p>
              </div>
              <div class="col-span-12 md:col-span-5">
                <div class="grid grid-cols-5">
                  <div class="col-span-3">
                    <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                      Quantity
                    </p>
                  </div>
                  <div class="col-span-2">
                    <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                      Total
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                class="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group"
              >
                <div class="grid grid-cols-1 md:grid-cols-4 w-full">
                  <div class="md:col-span-2">
                    <div class="flex flex-col max-[500px]:items-center gap-3">
                      <h6 class="font-semibold text-base leading-7 text-black">
                        {ticket.name}
                      </h6>

                      <h6 class="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                        {ticket.price > 0
                          ? ticket.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            }) 
                          : "Free"}
                      </h6>
                      <h6 class="font-medium text-sm leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                        {ticket.quantity - ticket.sold > 0
                          ? ticket.quantity - ticket.sold + " Tickets Available"
                          : "Sold Out"}
                      </h6>
                    </div>
                  </div>
                  <div class="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div class="flex items-center h-full">
                      <button
                        onClick={() => handleSubtractQuantity(ticket._id)}
                        class="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                        placeholder="1"
                        disabled
                        value={
                          orders.find((order) => order.id === ticket._id)
                            ?.quantity
                        }
                        onChange={(e) => {
                          setOrders(
                            orders.map((order) =>
                              order.id === ticket._id
                                ? { ...order, quantity: e.target.value }
                                : order
                            )
                          );
                        }}
                      />
                      <button
                        onClick={() => handleAddQuantity(ticket._id)}
                        class="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                      {orders.find((order) => order.id === ticket._id)
                        ?.quantity * ticket.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-1">
            <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div class="mt-8">
              <form>
                <div class="flex items-center justify-between py-8">
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
                </div>
                <button
                  onClick={(event) => handleSave(event, orders)}
                  class="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TicketCardList;