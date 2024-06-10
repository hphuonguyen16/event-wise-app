"use client";
import React from "react";
import { Stage, Layer } from "./react-konva";
import Section from "./Section";
import SeatPopup from "./SeatPopup";
import jsonData from "./seats-data.json";
import TableWithChairs from "./TableWithChairs";
import RectTableWithChairs from "./RectTableWithChairs";
import { Stack, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import Text from "./TextCanvas";
import Object from "./Object";

import * as layout from "./helper";
import { useMapObjectContext } from "@/context/MapObjectContext";
import { SetMealOutlined } from "@mui/icons-material";
import { SeatStatetus } from "@/constants/seatStatus";

const MainStage = () => {
  const containerRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const {
    mapData,
    setMapData,
    selectedSeats,
    setSelectedSeats,
    selectedTier,
    setSelectedTier,
    orders,
    setOrders,
  } = useMapObjectContext();
  const [scale, setScale] = React.useState(2.2);
  const [scaleToFit, setScaleToFit] = React.useState(1);
  const [size, setSize] = React.useState({
    width: 1000,
    height: 1000,
    virtualWidth: 1000,
  });
  console.log(scale);
  const [virtualWidth, setVirtualWidth] = React.useState(1000);

  const [selectedSeatsIds, setSelectedSeatsIds] = React.useState([]);

  const [popup, setPopup] = React.useState({ seat: null });

  // calculate available space for drawing
  React.useEffect(() => {
    const newSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };
    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }
  });

  // calculate initial scale
  React.useEffect(() => {
    if (!stageRef.current) {
      return;
    }
    const stage = stageRef.current;
    const clientRect = stage.getClientRect({ skipTransform: true });

    // const scaleToFit = size.width / clientRect.width;
    // setScale(scaleToFit);
    // setScaleToFit(scaleToFit);
    setVirtualWidth(clientRect.width);
  }, [jsonData, size]);

  // toggle scale on double clicks or taps
  const toggleScale = React.useCallback(() => {
    if (scale === 1) {
      setScale(scaleToFit);
    } else {
      setScale(1);
    }
  }, [scale, scaleToFit]);

  // handle scale increase
  const handleScaleUp = () => {
    setScale(scale + 0.1);
  };

  // handle scale decrease
  const handleScaleDown = () => {
    setScale(scale - 0.1);  
  };

  const handleHover = React.useCallback((seat, pos) => {
    if (seat.status === SeatStatetus.BOOKED) return;
    if (!seat.tier) return;
    console.log("hover", seat);
    setSelectedTier(seat.tier);
    setPopup({
      seat: seat,
      position: pos,
    });
  }, []);

  console.log(mapData)

  const handleSelect = (seat) => {
    setSelectedSeats((prev) => {
      if (!prev.find((item) => item._id === seat._id)) {
        return [...prev, seat];
      } else {
        return prev; // Return previous state if seat already exists
      }
    });
  };

  const handleDeselect = (seat) => {
    setSelectedSeats((prev) => prev.filter((item) => item._id !== seat._id));zzz
  };

  if (jsonData === null) {
    return <div ref={containerRef}>Loading...</div>;
  }

  const maxSectionWidth = layout.getMaximimSectionWidth(mapData.sections);
  const totalSectionsHeight = mapData.sections?.reduce(
    (sum, section) =>
      sum + layout.getSectionHeight(section) + layout.SECTIONS_MARGIN,
    0
  );
  const centerX = (size.width - maxSectionWidth) / 2;
  const centerY = (size.height - totalSectionsHeight) / 2;

  let lastSectionPosition = 0;

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "w",
        width: "100%",
        height: "100%",
      }}
      ref={containerRef}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        onDblTap={toggleScale}
        onDblClick={toggleScale}
        scaleX={scale}
        scaleY={scale}
        draggable
      >
        {mapData.sections?.map((section, index) => {
          const height = layout.getSectionHeight(section);
          const position = lastSectionPosition + layout.SECTIONS_MARGIN;
          lastSectionPosition = position + height;
          const width = layout.getSectionWidth(section);
          const offsetX = (maxSectionWidth - width) / 2;

          return (
            <Layer key={section._id}>
              <Section
                x={centerX + offsetX}
                y={centerY + position}
                height={height}
                key={index}
                section={section}
                onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
                isSelected={
                  mapData.selectedObject?.section &&
                  mapData.selectedObject.section._id === section._id
                }
              />
            </Layer>
          );
        })}
        {mapData.tables?.map((table, index) =>
          table.style === "circle" ? (
            <Layer key={table._id}>
              <TableWithChairs
                x={size.width / 2 - virtualWidth / 2}
                y={size.height / 2 - 100}
                width={virtualWidth}
                numChairs={table.seats}
                tableInfo={table}
                onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
                seatsInfo={table.seatsInfo}
                isSelected={
                  mapData.selectedObject?.table &&
                  mapData.selectedObject.table.style === "circle" &&
                  mapData.selectedObject.table._id === table._id
                }
              />
            </Layer>
          ) : (
            <Layer key={table._id}>
              <RectTableWithChairs
                width={40} // Specify the width of the table
                height={150} // Specify the height of the table
                numChairsHeight={Number(table.seats)} // Specify the number of chairs along the height
                numChairsWidth={Number(table.endSeats)} // Specify the number of chairs along the width
                tableInfo={table}
                selectedSeatsIds={selectedSeatsIds}
                // onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
                seatsInfo={table.seatsInfo}
                isSelected={
                  mapData.selectedObject?.table &&
                  mapData.selectedObject.table.style === "square" &&
                  mapData.selectedObject.table._id === table._id
                }
              />
            </Layer>
          )
        )}
        {mapData.texts?.map((item, index) => (
          <Layer key={item._id}>
            <Text
              textInfo={item}
              isSelected={
                mapData.selectedObject?.text &&
                mapData.selectedObject.text._id === item._id
              }
            />
          </Layer>
        ))}
        {mapData.objects?.map((item, index) => (
          <Layer key={item._id}>
            <Object
              label={item.label}
              shape={item.style}
              icon={item.icon}
              objectInfo={item}
              isSelected={
                mapData.selectedObject?.object &&
                mapData.selectedObject.object._id === item._id
              }
            />
          </Layer>
        ))}
      </Stage>
      {/* draw popup as html */}
      {popup.seat && (
        <SeatPopup
          position={popup.position}
          seat={popup.seat}
          onClose={() => {
            setPopup({ seat: null });
          }}
        />
      )}
      <Stack
        direction="column"
        sx={{
          width: "80px",
          height: "150px",
          position: "fixed",
          left: "2%",
          top: "10%",
          zIndex: 1000,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ border: "1px solid " }} variant="contained">
          <AddIcon sx={{ fontSize: "30px" }} onClick={handleScaleUp} />
        </IconButton>
        <IconButton sx={{ border: "1px solid " }} variant="contained">
          <RemoveIcon sx={{ fontSize: "30px" }} onClick={handleScaleDown} />
        </IconButton>
      </Stack>
    </div>
  );
};

export default MainStage;
