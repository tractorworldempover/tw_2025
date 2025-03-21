import React from "react";

const ChartFooter = ({ emi, principal, interestPayable }) => {
  return (
    <div className="sm:w-2/3 w-3/4 block m-auto">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center"><span className="w-[10px] h-[10px] border-[2px] bg-orange-400 border-orange-400 mx-4 align-middle"></span>
            <label className="text-gray-700 font-semibold">Principal</label>
          </div>
          <div className="flex-grow text-right font-bold">
            &#8377;{principal.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center"><span className="w-[10px] h-[10px] border-[2px] bg-[#FBB040] border-[#FBB040] mx-4 align-middle"></span>
            <label className="text-gray-700 font-semibold">Interest Paid</label>
          </div>
          <div className="flex-grow text-right font-bold">
            &#8377;{interestPayable.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div> 
  );
};

export default ChartFooter;
