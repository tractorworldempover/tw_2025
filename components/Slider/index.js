import React, { useState } from "react";
import { setPrincipal,setRateOfInterest,setLoanAmount } from "../../store/slices/userDataSlice";
 
 
export default function InputSlider({
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
  const handleInputChange = (event) => {
    handleValueInputChange(event, type); // Pass type to handleInputChange
  };

  const handleValueInputChange = (event, type) => {
    // debugger;
    const newValue = event.target.value === "" ? "" : Number(event.target.value);
  
    if (newValue >= min && newValue <= max) {
      switch (type) {
        case 'principal':
          dispatch(setPrincipal(newValue));
          break;
        case 'rateOfInterest':
          dispatch(setRateOfInterest(newValue));
          break; 
        case 'loanAmount':
        dispatch(setLoanAmount(newValue));
        break;
        default:
          console.error('Unknown type:', type);
      }
  
      setVal(newValue);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
  {/* Title */}
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      <span className="w-[20px] h-[20px] border-[2px] bg-orange-400 border-orange-400 mx-4 align-middle"></span>
      <label className="text-gray-700 font-semibold">{title}</label>
    </div>
    <div className="flex-grow text-right mb-4">
      <input
        type={type === ('principal' || 'loanAmount') ? 'text' : 'number'}
        value={val}
        onChange={handleInputChange}
        className="w-40  p-2 border border-gray-300 rounded-md text-center bg-[#F6F6F6]"
        min={min}
        max={max}
      />
    </div>
  </div>
</div>
  );
}
