import React, { createContext, useContext, useState } from "react";

// Create a context
const MapObjectContext = createContext();

// Create a provider component
const MapObjectProvider = ({ children }) => {
  const [mapData, setMapData] = React.useState({
    sections: [],
    tables: [],
    objects: [],
    texts: [],
    selectedObject: {
      section: null,
      table: null,
      object: null,
      text: null,
    },
    // selectedSeats: [],
  });

  const [chosenOption, setChosenOption] = React.useState();
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [tiers, setTiers] = React.useState([]);
  const [selectedTier, setSelectedTier] = React.useState();
  const [ticketTypes, setTicketTypes] = React.useState({});
  const [orders, setOrders] = React.useState([]);
  const [mode, setMode] = React.useState("view"); // ["view", "edit"]

  //function update status of seat in mapData

  function updateSeatStatus(selectedSeat, status) {
    const updatedMapData = { ...mapData };
    if (selectedSeat.type === "section") {
      updatedMapData.sections = updatedMapData.sections.map((section) => {
        if (section._id === selectedSeat.sectionId) {
          section.subsections.forEach((subsection) => {
            for (let row in subsection.seats_by_rows) {
              const seats = subsection.seats_by_rows[row];
              const seatIndex = seats.findIndex(
                (seat) => seat._id === selectedSeat._id
              );
              if (seatIndex !== -1) {
                seats[seatIndex].status = status;
              }
            }
          });
        }
        return section;
      });
    } else if (selectedSeat.type === "table") {
      updatedMapData.tables = updatedMapData.tables.map((table) => {
        if (table._id === selectedSeat.sectionId) {
          table.seatsInfo.forEach((seat) => {
            if (seat._id === selectedSeat._id) {
              seat.status = status;
            }
          });
        }
        return table;
      });
    }

    setMapData(updatedMapData);
    setSelectedSeats([]); // Clear selected seats
  }

  return (
    <MapObjectContext.Provider
      value={{
        mapData,
        setMapData,
        chosenOption,
        setChosenOption,
        selectedSeats,
        setSelectedSeats,
        tiers,
        setTiers,
        selectedTier,
        setSelectedTier,
        ticketTypes,
        setTicketTypes,
        orders,
        setOrders,
        updateSeatStatus,
        mode,
        setMode,
      }}
    >
      {children}
    </MapObjectContext.Provider>
  );
};

// Custom hook to use the context
const useMapObjectContext = () => {
  const context = useContext(MapObjectContext);
  if (!context) {
    throw new Error("useMapObjectContext must be used within a MyProvider");
  }
  return context;
};

export { MapObjectProvider, useMapObjectContext };
