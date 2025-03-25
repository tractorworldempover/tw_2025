import React, { useState, useEffect } from "react";
import InputSlider from "@components/Slider";
import RangeSlider from "@components/Ranger";
import { setLoanTenure, setDownPayment } from "@store/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { calculateEmi, calculateInterest, formatPrice } from "@utils";

const LeftSection = ({ state, maxPrice }) => {
  const dispatch = useDispatch();
  const loanAmount = state[0].price;
  const tenure = useSelector((state) => state.user.tenure);
  const [selectedtenureValue, setSelectedtenureValue] = useState(tenure);
  const downPayment = useSelector((state) => state.user.downPayment);
  const {
    roi = 8,
  } = {};

  const emi = calculateEmi({ loanAmount, roi, tenure, downPayment });
  const interestPayable = calculateInterest({ emi, tenure, loanAmount, downPayment });
  const loanAmt = Number(loanAmount) || 0;
  //inte+princle
  const totalAmtwithIntres = parseInt(loanAmt + interestPayable);

  // buttons data
  const [selectedValue, setSelectedValue] = useState(12);
  const buttonValues = [12, 24, 36, 48, 60, 72, 84];

  const handleButtonClick = (value) => {
    setSelectedValue(value);
    dispatch(setLoanTenure(value));
  };

  useEffect(() => {
    // alert(`Updated Tenure Value: ${tenure}`);
  }, [tenure]);

  return (
    <div>
      <InputSlider
        state={state}
        dispatch={dispatch}
        title="Loan Amount"
        type="principal"
        max={totalAmtwithIntres}
        step={20000}
        min={20000}
        minLabel="20K"
        maxLabel="50L"
        value={formatPrice(totalAmtwithIntres)}
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

      <div className="p-4">
        <RangeSlider
          state={state}
          dispatch={dispatch}
          type="downPayment"
          title="Down Payment"
          max={loanAmt}
          step={1}
          min={100000}
          minLabel="0"
          maxLabel={maxPrice}
          value={100000}
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
