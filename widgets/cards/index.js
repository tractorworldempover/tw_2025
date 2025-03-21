import React from 'react';

const Card = ({ title, textAlign, textSize, fontWeight, TextColor, bgColor, smwidth, mdwidth, lgwidth, xlwidth, width, justify }) => {
  return (
    <div className={`flex justify-${justify}`}>
      <div className={`rounded-md shadow-sm bg-${bgColor}
   xl:w-${xlwidth} lg:w-${lgwidth} md:w-${mdwidth} sm:w-${smwidth} w-${width}`}>
        <div className="sm:p-4 p-[.7rem]">
          <h2 className={`text-${textSize} font-${fontWeight} text-${textAlign} text-${TextColor}`}>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;