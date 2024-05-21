'use client'
import React from 'react'
import MainStage from './components/MainStage';

function page() {
  return (
    <MainStage
      onSelectSeat={(seatId) => {
        console.log("selected - " + seatId);
      }}
    />
  );
}

export default page