import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddressData } from "../store/slices/userDataSlice";
import Dealer1 from "@Images/dealer/dealer1.svg";


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
    Math.round((principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) / (Math.pow(1 + monthlyInterestRate, tenure) - 1)) || 0
  );
};

export const calculateInterest = ({ emi, tenure, loanAmount, downPayment }) => {
  const principal = loanAmount - downPayment; // Adjusted loan amount after downpayment
  return emi * tenure - principal; // Total interest payable
};


export const calculateEMI = (maxPrice, interestRate = 8, months = 74) => {
  console.log("maxPrice" + maxPrice);
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

export const getDealersData = () => {
  return [
    {
      name: "Arihant Motors",
      id: "1",
      location: "Tembhurni",
      owner: "Vikas Baldota",
      phone: "+91 73500 20155",
      email: "Narayana970541@gmail.com",
      address: "Solapur - Pune Highway, Tembhurni, Madha, Maharashtra - 413211",
      Google_Location: "https://maps.app.goo.gl/gkGGMSaZ9FLyRJiK6",
      image: Dealer1
    },

    {
      name: "Bholenath Motors",
      id: "2",
      location: "Ahmednagar",
      owner: "Jitesh Kantrod",
      phone: "+91 89834 32552",
      email: "example@gmail.com",
      address: "Nevasa Road, Ashok Factory, Near HP Petrol Pump, Shrirampur, Ahmednagar",
      Google_Location: "https://maps.app.goo.gl/ArMsM2PsjmY8EwUP8",
      image: Dealer1
    },
    {
      name: "Om Motors",
      id: "3",
      location: "Latur",
      owner: "Nitin Bhise",
      phone: "+91 99605 73777",
      email: "example@gmail.com",
      address: "Ring Road, Babalgaon Naka, in front of gramin police station, Latur - 413512",
      Google_Location: "https://maps.app.goo.gl/bJ75mNRqQ9oj6mKx7",
      image: Dealer1
    },
    {
      name: "Jai Kisan Tractors",
      id: "4",
      location: "Sangamner",
      owner: "Samir Tamboli, Ismail Tamboli",
      phone: "+91 98601 55763, +91 98909 01018",
      email: "example@gmail.com",
      address: "Jai Kisan Tractors garage, In front of Siddhivinayak lawns, Sangamner - Nagar Road, Sangamner - 422605",
      Google_Location: "https://maps.app.goo.gl/t3xTKpSQSZZSjBQs7",
      image: Dealer1
    },
    {
      name: "Aum Tractors",
      id: "5",
      location: "Solapur",
      owner: "Kiran Ransingh",
      phone: "+91 95458 68555",
      email: "example@gmail.com",
      address: "15/2A, Kegaon, near Dudh Pandhari, Pune Highway, Solapur - 413255",
      Google_Location: "https://maps.app.goo.gl/cCGnPF1QQFDd3fLVA",
      image: Dealer1
    },
    {
      name: "Anuraj Tractors",
      id: "6",
      location: "Ahmednagar",
      owner: "Amol Ranshing",
      phone: "+91 8806667664",
      email: "example@gmail.com",
      address: "Arangaon, Ahmednagar - Daund Road, ahead of VRD, Near Pranav Hotel, Ahmednagar - 414006",
      Google_Location: "https://maps.app.goo.gl/ucq9KM75Sir2Jka4A",
      image: Dealer1
    },
    {
      name: "Ambrish Tractors",
      id: "7",
      location: "Jalna",
      owner: "Ambrish Ramkishan Lahoti",
      phone: "+91 94208 24716, +91 94222 16425",
      email: "example@gmail.com",
      address: "5031, Saraswati Gining Factory Compound, Old Jalna Road, near Nagar Parishan, Jalna, Maharashtra- 431203",
      Google_Location: "https://maps.app.goo.gl/5FRWyTLjPbwykA2R6",
      image: Dealer1
    },
    {
      name: "Sainath Tractors",
      id: "8",
      location: "Sehore",
      owner: "Sanjay Rathore",
      phone: "+91 97554 19104",
      email: "example@gmail.com",
      address: "Sainath tractors, near Mandi Thane, Sehore, Sehore District, Madhya Pradesh - 466001",
      Google_Location: "",
      image: Dealer1
    },
    {
      name: "Kartikeya Traders",
      id: "9",
      location: "Sagar",
      owner: "Malti Sachan",
      phone: "+91 99261 84981",
      email: "example@gmail.com",
      address: "Ward No 20, Zone 03,51/41/1, Shastri Ward, N.H 934, Sagar - 470002",
      Google_Location: "",
      image: Dealer1
    },
    {
      name: "National Tractors",
      id: "10",
      location: "Jabalpur",
      owner: "Amish Khandelwal",
      phone: "+91 97134 37232",
      email: "example@gmail.com",
      address: "93, Near ISBT, Vijay Nagar, Deendayal Bus stand, Jabalpur, MP - 482001",
      Google_Location: "https://maps.app.goo.gl/NenPBbJcnxEwUAgK7",
      image: Dealer1
    },
    {
      name: "Kamala Tractors",
      id: "11",
      location: "Sheopur",
      owner: "Neha Toshniwal",
      phone: "+91 95848 13756",
      email: "example@gmail.com",
      address: "Pali Road, Sheopur, Madhya Pradesh, Pin - 476337",
      Google_Location: "https://maps.app.goo.gl/UmbHr1922KUM9twa9",
      image: Dealer1
    },
    {
      name: "Leela Enterprises",
      id: "12",
      location: "Sheopur",
      owner: "Mahendra Dangi",
      phone: "+91 79998 62922",
      email: "example@gmail.com",
      address: "Old AB Road, Near Madhumilan Factory, in front of Sanjivani Hospital, Talavada champapura, Biaora, MP - 465674",
      Google_Location: "https://maps.app.goo.gl/bp6LPej165MEJtQ46",
      image: Dealer1
    },
    {
      name: "Rainbow Tractors",
      id: "13",
      location: "Nanded",
      owner: "Abdul Waheed Abdul Wali",
      phone: "+91 9765692317",
      email: "example@gmail.com",
      address: "At Sangavi, Post Taroda Taroda Bk, Hingoli - Kalamnuri - Nanded Rd, opposite Airport, Nanded, Maharashtra 431605",
      Google_Location: "https://maps.app.goo.gl/ZAQY1yjFb1dsWKzk7",
      image: Dealer1
    },
    {
      name: "Tractor House",
      id: "14",
      location: "Dwarka",
      owner: "Rahul Lunawat",
      phone: "+91 7769850099",
      email: "example@gmail.com",
      address: "New Mumbai Agra Road, Dwarka, Nashik - 422011",
      Google_Location: "https://maps.app.goo.gl/zouqmehodeWm5YWK9",
      image: Dealer1
    },
    {
      name: "VENTILE COMPANY PRIVATE LIMITED",
      id: "15",
      location: "Pune",
      owner: "Tejas Pandit",
      phone: "+91 9922970720",
      email: "example@gmail.com",
      address: "251/1, Pune Solapur Road, Kadamwak Vasti, Loni Kalbhor, Haveli, Pune - 412207",
      Google_Location: "https://maps.app.goo.gl/YYVKFeBs1SVRphTz6",
      image: Dealer1
    }
  ];
};


export const fetchLocations = async (setLocations, setStates) => {
  try {
    const response = await fetch("https://used-tractor-backend.azurewebsites.net/user/web/user-location-details/");
    const data = await response.json();
    console.log("Fetched Data:", data);

    const locationData = data.data || {}; // Ensure it's an object
    setLocations(locationData);

    const uniqueStates = [...new Set(Object.values(locationData).map(item => item.state))];
    console.log("Extracted States:", uniqueStates);
    setStates(uniqueStates);
  } catch (error) {
    console.error("Error fetching states:", error);
    alert("Error fetching data: " + error.message);
  }
};

export const getFilteredDistricts = (locations, selectedState) => {
  return Object.keys(locations).filter(
    (district) => locations[district].state === selectedState
  );
};

