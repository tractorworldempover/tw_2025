import React, { useState } from "react";
import { setDownPayment } from "../../store/slices/userDataSlice";
import { formatPrice } from "@utils";

export default function RangeSlider({
  step,
  dispatch,
  title,
  min,
  max,
  minLabel,
  maxLabel,
  type,
  value
}) {
  const [val, setVal] = useState(value);

  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);
    if (newValue >= min && newValue <= max) {
      dispatch(setDownPayment(newValue));
      setVal(newValue);
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value === "" ? "" : Number(event.target.value);
    if (newValue >= min && newValue <= max) {
      dispatch(setDownPayment(newValue));
      setVal(newValue);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Title */}
      <label className="text-gray-700 font-semibold">{title}</label>
      
      {/* Slider and Input */}
      <div className="flex items-center space-x-4">
        {/* Slider */}
        <input
          type="range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          min={min}
          max={max}
          step={step}
          value={formatPrice(val)}
          onChange={handleSliderChange}
        />

        {/* Input Field */}
        <input
          type="text"
          value={formatPrice(val)}
          onChange={handleInputChange}
          className="w-40 p-2 border border-gray-300 rounded-md text-center"
          min={min}
          max={max}
          step={step}
        />
      </div>

      {/* Slider Labels */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
