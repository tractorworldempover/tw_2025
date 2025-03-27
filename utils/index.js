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

    
  export const calculateEMI = (maxPrice, interestRate = 8, months = 74) => {
    console.log("maxPrice"+maxPrice);
    if (!maxPrice || isNaN(maxPrice) || maxPrice <= 0) {
        return "N/A";
    }
    
    const principal = maxPrice;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
                (Math.pow(1 + monthlyInterestRate, months) - 1);
    
    return `EMI starts from ₹ ${Math.round(emi).toLocaleString("en-IN")}*`;
    };

  export const formatPrice = (price) => {
    return price ? `₹ ${price.toLocaleString("en-IN")}` : "N/A";
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

export const getTractorDetailsById = (inventoryData, tractorId) => {
  if (!Array.isArray(inventoryData) || !tractorId) {
      console.warn("Invalid inventory data or tractor ID");
      return null;
  }

  // Find the tractor details by ID
  const tractorDetails = inventoryData.find(item => item.tractor_id === tractorId);

  if (!tractorDetails) {
      console.warn(`No tractor found for ID: ${tractorId}`);
      return null;
  }

  return tractorDetails;
};

/**
 * Gets the first valid processed image URL from image_links.
 * @param {Array|Object} imageLinks - The array or object of image objects.
 * @param {string} DefaultTractor - The fallback image URL to use if no valid processed image is found.
 * @returns {string} - The first valid processed image URL, or the default image if no valid processed image is found.
 */
export async function getValidImageUrl(imageLinks, DefaultTractor) {
  // console.log("imageLinks:", imageLinks); // Log input data

  const imageArray = Array.isArray(imageLinks) ? imageLinks : Object.values(imageLinks);

  if (Array.isArray(imageArray) && imageArray.length > 0) {
    for (let i = 0; i < imageArray.length; i++) {
      const imageUrl = imageArray[2]?.processed_image;
      if (imageUrl) {
        try {
          const response = await fetch(imageUrl, { method: "HEAD" }); // Lightweight check
          if (response.ok) {
            // console.log(`Valid image found at index ${2}:`, imageUrl);
            return imageUrl;
          } else {
            // console.warn(`Image at index ${2} is broken:`, imageUrl);
          }
        } catch (error) {
          // console.error(`Error fetching image at index ${2}:`, error);
        }
      }
    }
  }

  // console.warn("No valid processed image found. Falling back to default image.");
  return typeof DefaultTractor === "string" ? DefaultTractor : DefaultTractor?.src || "";
}
