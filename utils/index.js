import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddressData } from "../store/slices/userDataSlice"; 

export const HomeHPRanges = [
  { min: 0, max: 20, key: 'oneData' },
  { min: 21, max: 30, key: 'twoData' },
  { min: 31, max: 40, key: 'ThreeData' },
  { min: 41, max: 45, key: 'FourData' },
  { min: 46, max: 50, key: 'FifthData' },
  { min: 51, max: Infinity, key: 'SixthData' },
];

// export const useGeolocation = () => {
//     const dispatch = useDispatch();
//     const [error, setError] = useState(null);
//     //console.log(error,"maps denied")
//     const getLocation = useCallback(() => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             // const latitude = 20.00 //maharastara
//             // const longitude = 76.00
//             // const latitude = 23.00 //madya pradesh
//             // const longitude = 80.00
//             getAddress(latitude, longitude);
//           },
//           (err) => {
//             setError(err);
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by this browser.');
//       }
//     }, []);
  
//     // const getAddress = useCallback(async (latitude, longitude) => {
//     //   try {

//     //     if (typeof window !== 'undefined') {
//     //     const response = await fetch(
//     //       `${process.env.LOCATION_GET_API}?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
//     //     );
//     //     const data = await response.json();
//     //     if (data && data.address) {
//     //       console.log(data.address, 'address from API');
//     //       dispatch(setAddressData({ addressData: data.address }));
//     //     } else {
//     //       setError('Address not found');
//     //     }
//     //    }
//     //     else {
//     //       console.log('Skipping fetch during build');
//     //     }
//     //   } catch (err) {
//     //     setError('Failed to fetch address');
//     //   }
//     // }, [dispatch]);
  
//     return {error, getLocation };
//   };
  
  export const calculateEmi = ({ loanAmount, roi, tenure, downPayment }) => {
    const principal = loanAmount - downPayment; // Adjusted loan amount after downpayment
    const monthlyInterestRate = roi / (12 * 100); // Monthly interest rate
    return (
      Math.round((principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / (Math.pow(1 + monthlyInterestRate, tenure) - 1)) || "--"
    );
  };
  
  export const calculateInterest = ({ emi, tenure, loanAmount, downPayment }) => {
    const principal = loanAmount - downPayment; // Adjusted loan amount after downpayment
    return emi * tenure - principal; // Total interest payable
  };

    
  // Function to dynamically generate labels for tabs
  export const getTabLabel = (min, max) => {
    if (max === Infinity) {
      return `Above ${min} HP`;
    }
    return `${min} - ${max} HP`;
  };

    // Function to get a random tractor from a list
  const getRandomTractor = (tractors) => {
    const randomIndex = Math.floor(Math.random() * tractors.length);
    return tractors[randomIndex];
  };
// Function to filter tractors based on enginePower
export const filterByHorsepower = (tractors, min, max) => {
  return tractors.filter((tractor) => { 
   const hp = parseInt(tractor.enginePower, 10); // Make sure to convert enginePower to a number
  // const hp = parseInt(tractor.enginePower.split(' ')[0], 10); 
  return hp >= min && hp <= max;
});
};
export const getHomePageTractorsListBasedOnInventory = (liveInventoryData) => {
// Object to store the compare data dynamically
const compareTractorData = {};

HomeHPRanges.forEach((range) => { 
  // Filter tractors for the current range
  const filteredTractors = filterByHorsepower(liveInventoryData, range.min, range.max);

  if (filteredTractors.length >= 2) {
    compareTractorData[range.key] = [];  // ✅ Initialize as an array

    while (filteredTractors.length >= 2) {
      // ✅ Randomly pick two tractors
      const tractor1 = getRandomTractor(filteredTractors);
      let tractor2 = getRandomTractor(filteredTractors);

      // ✅ Store the pair in an array instead of overwriting
      compareTractorData[range.key].push({
        brand1Id: tractor1.tractorId, 
        brand1: tractor1.title,
        brand2Id: tractor2.tractorId, 
        brand2: tractor2.title,
        brand1hp: tractor1.enginePower,
        brand2hp: tractor2.enginePower,
        brand1price: tractor1.price,
        brand2price: tractor2.price,
      });

      // ✅ Remove selected tractors to avoid duplicate comparisons
      filteredTractors.splice(filteredTractors.indexOf(tractor1), 1);
      filteredTractors.splice(filteredTractors.indexOf(tractor2), 1);
    }
  }
});


return compareTractorData;
};
