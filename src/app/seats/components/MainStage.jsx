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

import * as layout from "./helper";

const MainStage = ({ mapData, setMapData }) => {
  const containerRef = React.useRef(null);
  const stageRef = React.useRef(null);

  const [scale, setScale] = React.useState(1.7);
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

  let lastSectionPosition = 0;

  const handleHover = React.useCallback((seat, pos) => {
    setPopup({
      seat: seat,
      position: pos,
    });
  }, []);

  const handleSelect = React.useCallback(
    (seatId) => {
      const newIds = selectedSeatsIds.concat([seatId]);
      setSelectedSeatsIds(newIds);
    },
    [selectedSeatsIds]
  );

  const handleDeselect = React.useCallback(
    (seatId) => {
      const ids = selectedSeatsIds.slice();
      ids.splice(ids.indexOf(seatId), 1);
      setSelectedSeatsIds(ids);
    },
    [selectedSeatsIds]
  );

  if (jsonData === null) {
    return <div ref={containerRef}>Loading...</div>;
  }

  const maxSectionWidth = layout.getMaximimSectionWidth(
    jsonData.seats.sections
  );
  console.log(mapData);
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "w",
        width: "100vw",
        height: "100vh",
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
      >
        <Layer>
          {mapData.sections.map((section, index) => {
            const height = layout.getSectionHeight(section);
            const position = lastSectionPosition + layout.SECTIONS_MARGIN;
            lastSectionPosition = position + height;
            const width = layout.getSectionWidth(section);

            const offset = (maxSectionWidth - width) / 2;

            return (
              <Section
                x={offset}
                y={position}
                height={height}
                key={index}
                section={section}
                selectedSeatsIds={selectedSeatsIds}
                onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
              />
            );
          })}
        </Layer>
        {mapData.tables.map((table, index) =>
          table.style === "circle" ? (
            <Layer key={index}>
              <TableWithChairs
                x={size.width / 2 - virtualWidth / 2}
                y={size.height / 2 - 100}
                width={virtualWidth}
                numChairs={table.seats}
                tableInfo={table}
                selectedSeatsIds={selectedSeatsIds}
                onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
                seatsInfo={table.seatsInfo}
              />
            </Layer>
          ) : (
            <Layer key={index}>
              <RectTableWithChairs
                width={40} // Specify the width of the table
                height={150} // Specify the height of the table
                numChairsHeight={Number(table.seats)} // Specify the number of chairs along the height
                numChairsWidth={Number(table.endSeats)} // Specify the number of chairs along the width
              />
            </Layer>
          )
        )}
      </Stage>
      {/* draw popup as html */}
      {popup.seat && (
        <SeatPopup
          position={popup.position}
          seatId={popup.seat}
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
