"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface TripDurationUiProps {
  onSelectedOption: (value: string) => void;
}

function TripDurationUi({ onSelectedOption }: TripDurationUiProps) {
  const [days, setDays] = useState<number>(3);

  const increment = () => {
    setDays((prev) => Math.min(prev + 1, 30)); // Setting a max limit of 30 days
  };

  const decrement = () => {
    setDays((prev) => Math.max(prev - 1, 1)); // Minimum 1 day
  };

  const handleConfirm = () => {
    onSelectedOption(`${days} days`);
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full mt-2">
      <h2 className="text-center font-medium text-lg mb-4">
        How many days do you want to travel?
      </h2>
      <div className="flex items-center justify-center gap-4 my-4">
        <Button
          onClick={decrement}
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <span className="text-xl font-bold">-</span>
        </Button>
        <div className="text-2xl font-bold">{days} Days</div>
        <Button
          onClick={increment}
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <span className="text-xl font-bold">+</span>
        </Button>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={handleConfirm}
          className="px-8 py-2 hover:cursor-pointer text-white rounded-md"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default TripDurationUi;
