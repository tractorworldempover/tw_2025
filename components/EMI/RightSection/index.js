import { calculateEmi, calculateInterest } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrincipleAndInt } from "@store/userDataSlice";
import EmiChart from "./emiChart";
import ChartFooter from "./chartFooter";
import { useEffect } from "react";

const RightSection = ({ state }) => {
  const loanAmount = state[0].price;
  const tenure = useSelector((state) => state.user.tenure);
  const downPayment = useSelector((state) => state.user.downPayment); 
  const {
    roi = 8,  
   } = {};  
   
  const emi = calculateEmi({ loanAmount, roi, tenure, downPayment });
  const interestPayable = calculateInterest({ emi, tenure, loanAmount, downPayment }); 
  const loanAmt = Number(loanAmount) || 0;
  const downPay = Number(downPayment) || 0; 
  const principalAmt = loanAmt - downPay;
  const totalAmtwithIntres = parseInt(principalAmt + interestPayable); 
  return (
    <div className="rightsection-wrapper">
      <EmiChart principal={principalAmt} interestPayable={interestPayable} emi={emi} />
      <ChartFooter
        emi={emi}
        principal={principalAmt}
        interestPayable={interestPayable}
      />
    </div>
  );
};

export default RightSection;