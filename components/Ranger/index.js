import React, { useState, useEffect } from "react";
import { setDownPayment } from "../../store/slices/userDataSlice";
import { formatPrice } from "@utils";
import { useSelector } from "react-redux";

export default function RangeSlider({
  step,
  dispatch,
  title,
  min,
  max,
  minLabel,
  maxLabel,
  type,
}) {
  const downPayment = useSelector((state) => state.user.downPayment); 
  const [val, setVal] = useState(downPayment);

  useEffect(() => {
    // Keep local state in sync with Redux
    setVal(downPayment);
  }, [downPayment]);

  const handleSliderChange = (event) => {
    const newValue = Number(event.target.value);
    dispatch(setDownPayment(newValue));
    setVal(newValue);
  };

  const handleInputChange = (event) => {
    const raw = event.target.value.replace(/[^0-9]/g, ""); // remove ₹, commas, etc.
    const newValue = raw ? Number(raw) : 0;

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
        <input
          type="range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          min={min}
          max={max}
          step={step}
          value={val}
          onChange={handleSliderChange}
        />
        <input
          type="text"
          value={formatPrice(val)}
          onChange={handleInputChange}
          className="w-40 p-2 border border-gray-300 rounded-md text-center"
        />
      </div>

      {/* Min and Max Labels */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
