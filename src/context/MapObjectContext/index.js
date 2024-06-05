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
