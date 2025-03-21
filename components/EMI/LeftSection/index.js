import React,{useState} from "react";
import InputSlider from "@components/Slider";
import RangeSlider from "@components/Ranger";
import { setLoanTenure,setLoanAmount } from "@store/userDataSlice";
import { useSelector } from "react-redux";
 
const LeftSection = ({state,dispatch,maxPrice }) => {  
 
  dispatch(setLoanAmount(maxPrice)); 
   
  // buttons data
  const [selectedValue, setSelectedValue] = useState(12); 
  const buttonValues = [12, 24, 36, 48, 60, 72, 84]; 

  const handleButtonClick = (value) => {
    setSelectedValue(value);
    dispatch(setLoanTenure(value));
  };  

  return (
    <div> 
      <InputSlider
        state={state}
        dispatch={dispatch}
        title="Loan Amount"
        max={maxPrice}
        step={20000}
        min={20000}
        minLabel="20K"
        maxLabel="50L"
        type="loanAmount"
        value={maxPrice}
      />
      <InputSlider
        state={state}
        dispatch={dispatch}
        type="rateOfInterest"
        title="Interest Rate"
        max={15}
        step={0.1}
        min={0.1}
        minLabel="0.1%"
        maxLabel="15%"
        value={8}
      /> 
      {/* <InputSlider
        state={state}
        dispatch={dispatch}
        title="Total Amount"
        max={maxPrice}
        step={0}
        min={0}
        minLabel="20K"
        maxLabel="50L"
        type="principal"
        value={TotalAmnt}
      /> */}
    <div className="p-4">
    <RangeSlider
        state={state}
        dispatch={dispatch}
        type="downPayment"
        title="Down Payment"
        max={maxPrice}
        step={1}
        min={10000}
        minLabel="0"
        maxLabel={maxPrice}
        value={10000}
      /> 
    </div>
    
    <div className="p-4">
     <div className='my-3'>Loan Period (Months)</div> 
        <div className="grid grid-cols-7 rounded-md shadow-sm" role="group">
            {buttonValues.map((value, index) => {
                const isFirst = index === 0;
                const isLast = index === buttonValues.length - 1;
                const isSelected = value === selectedValue;
                return (
                    <button
                        key={value}
                        onClick={() => handleButtonClick(value)} // Dispatch action on click
                        type="button"
                        className={`sm:px-6 sm:py-3 py-2 font-medium text-gray-900 ${isSelected ? 'bg-secondaryColor text-white' : 'bg-[#F0F0F0]'
                          } ${isFirst ? 'rounded-tl-md rounded-bl-md' : ''} ${isLast ? 'rounded-tr-md rounded-br-md' : ''
                          } hover:rounded-md focus:rounded-md focus:bg-secondaryColor hover:bg-secondaryColor hover:text-white focus:z-10 focus:ring-2 focus:ring-secondaryColor focus:text-white dark:bg-secondaryColor dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-secondaryColor dark:focus:ring-secondaryColor dark:focus:text-white`}
                      >
                        {value}
                    </button>
                );
            })}
        </div>
     </div>
    </div>
  );
};

export default LeftSection;
