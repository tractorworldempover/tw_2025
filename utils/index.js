import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddressData } from "../store/slices/userDataSlice";
import Dealer1 from "@Images/dealer/dealer1.svg";
import CryptoJS from "crypto-js";
const SECRET_KEY = "Tractorworldbymahindra@2025"; // This can be any secret key you want

export const HomeHPRanges = [
  { min: 0, max: 20, key: "oneData", label: "0 - 20 HP" },
  { min: 21, max: 30, key: "twoData", label: "21 - 30 HP" },
  { min: 31, max: 40, key: "ThreeData", label: "31 - 40 HP" },
  { min: 41, max: 45, key: "FourData", label: "41 - 45 HP" },
  { min: 46, max: 50, key: "FifthData", label: "46 - 50 HP" },
  { min: 51, max: Infinity, key: "SixthData", label: "Above 51 HP" },
];

// Function to encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      console.error("Decryption failed: No valid UTF-8 data returned");
      return null;
    }

    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

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
    Math.round(
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenure)) /
        (Math.pow(1 + monthlyInterestRate, tenure) - 1)
    ) || 0
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
  const monthlyInterestRate = interestRate / 100 / 12;
  const emi =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, months)) /
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
    const filteredTractors = filterByHorsepower(
      liveInventoryData,
      range.min,
      range.max
    );

    if (filteredTractors.length >= 2) {
      compareTractorData[range.key] = []; // ✅ Initialize as an array

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
  const tractorDetails = inventoryData.find(
    (item) => item.tractor_id === tractorId
  );

  if (!tractorDetails) {
    console.warn(`No tractor found for ID: ${tractorId}`);
    return null;
  }

  return tractorDetails;
};

export const metaDetailsById = (inventoryData) => {
  const metaDetails = inventoryData;
  if (!metaDetails) {
    console.warn(`No tractor found for ID: ${tractorId}`);
    return null;
  }
  // console.log(JSON.stringify(metaDetails) + "metaDetails");
  const {
    brand,
    model,
    year,
    engine_power,
    user_location,
    state,
    district,
    tyre_state,
    engine_hours,
    drive_type,
    is_insured,
    finance,
    engine_condition,
    tyre_condition,
  } = metaDetails;

  const insuredText = is_insured ? "insured" : "not insured";
  const financeText = finance
    ? `finance available up to ${finance}`
    : "no finance available";

  // Generate Meta Description
  const description = `Buy ${year} ${brand} ${model} (${engine_power}) in ${user_location}, ${district}, ${state}. ${engine_hours} hours run, ${drive_type} drive, ${tyre_state} tyres, engine in ${engine_condition} condition. This tractor is ${insuredText} and ${financeText}.`;

  // Generate Meta Keywords
  const keywords = [
    `${brand} ${model}`,
    `${brand} tractor`,
    `${model} tractor`,
    `${brand} ${model} ${year}`,
    `used ${brand} tractor`,
    `${brand} tractor ${state}`,
    `tractors in ${user_location}`,
    `buy ${brand} tractor`,
    `${engine_power} tractor`,
    `second hand tractors`,
    `used tractors for sale`,
    `tractor with ${drive_type}`,
    `${tyre_condition} tyres`,
    `${engine_condition} engine`,
  ].join(", ");

  return { description, keywords };
};

/**
 * Gets the first valid processed image URL from image_links.
 * @param {Array|Object} imageLinks - The array or object of image objects.
 * @param {string} DefaultTractor - The fallback image URL to use if no valid processed image is found.
 * @returns {string} - The first valid processed image URL, or the default image if no valid processed image is found.
 */
export async function getValidImageUrl(imageLinks, DefaultTractor) {
  const authKey =
    "?sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-04-01T14:30:38Z&st=2023-03-29T06:30:38Z&spr=https&sig=mk0i2ZPyaotRM5smvwnf9y9%2BcZljr9BrtLIK2%2FnnJ6k%3D";

  const imageArray = Array.isArray(imageLinks)
    ? imageLinks
    : Object.values(imageLinks || {});

  if (imageArray.length > 0) {
    for (let i = 0; i < imageArray.length; i++) {
      const baseImageUrl = imageArray[i]?.processed_image;
      if (baseImageUrl) {
        debugger;
        const needsAuth = baseImageUrl.includes("blob.core.windows.net");
        const imageUrl = needsAuth ? `${baseImageUrl}${authKey}` : baseImageUrl;

        try {
          const response = await fetch(imageUrl, { method: "HEAD" });
          if (response.ok) {
            return imageUrl;
          }
        } catch (error) {
          // skip
        }
      }
    }
  }

  // Default fallback logic (no authKey if not needed)
  if (typeof DefaultTractor === "string") {
    return DefaultTractor;
  } else if (DefaultTractor?.src) {
    return DefaultTractor.src;
  }

  return ""; // Final fallback
}

export async function getValidImageArrayUrls(imageLinks, DefaultTractor) {
  const authKey =
    "?sv=2021-12-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-04-01T14:30:38Z&st=2023-03-29T06:30:38Z&spr=https&sig=mk0i2ZPyaotRM5smvwnf9y9%2BcZljr9BrtLIK2%2FnnJ6k%3D";

  const imageArray = Array.isArray(imageLinks)
    ? imageLinks
    : Object.values(imageLinks || {});

  const validImages = [];

  for (let i = 0; i < imageArray.length; i++) {
    const baseImageUrl = imageArray[i]?.processed_image || imageArray[i];
    if (!baseImageUrl) continue;

    const needsAuth = baseImageUrl.includes("blob.core.windows.net");
    const imageUrl = needsAuth ? `${baseImageUrl}${authKey}` : baseImageUrl;

    try {
      const response = await fetch(imageUrl, { method: "HEAD" });
      if (response.ok) {
        validImages.push(imageUrl);
      }
    } catch (error) {
      // skip
    }
  }

  // Fallback to default tractor if no valid image found
  if (validImages.length === 0) {
    if (typeof DefaultTractor === "string") {
      return [DefaultTractor];
    } else if (DefaultTractor?.src) {
      return [DefaultTractor.src];
    } else {
      return [];
    }
  }

  return validImages;
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
      image: Dealer1,
    },

    {
      name: "Bholenath Motors",
      id: "2",
      location: "Ahmednagar",
      owner: "Jitesh Kantrod",
      phone: "+91 89834 32552",
      email: "example@gmail.com",
      address:
        "Nevasa Road, Ashok Factory, Near HP Petrol Pump, Shrirampur, Ahmednagar",
      Google_Location: "https://maps.app.goo.gl/ArMsM2PsjmY8EwUP8",
      image: Dealer1,
    },
    {
      name: "Om Motors",
      id: "3",
      location: "Latur",
      owner: "Nitin Bhise",
      phone: "+91 99605 73777",
      email: "example@gmail.com",
      address:
        "Ring Road, Babalgaon Naka, in front of gramin police station, Latur - 413512",
      Google_Location: "https://maps.app.goo.gl/bJ75mNRqQ9oj6mKx7",
      image: Dealer1,
    },
    {
      name: "Jai Kisan Tractors",
      id: "4",
      location: "Sangamner",
      owner: "Samir Tamboli, Ismail Tamboli",
      phone: "+91 98601 55763, +91 98909 01018",
      email: "example@gmail.com",
      address:
        "Jai Kisan Tractors garage, In front of Siddhivinayak lawns, Sangamner - Nagar Road, Sangamner - 422605",
      Google_Location: "https://maps.app.goo.gl/t3xTKpSQSZZSjBQs7",
      image: Dealer1,
    },
    {
      name: "Aum Tractors",
      id: "5",
      location: "Solapur",
      owner: "Kiran Ransingh",
      phone: "+91 95458 68555",
      email: "example@gmail.com",
      address:
        "15/2A, Kegaon, near Dudh Pandhari, Pune Highway, Solapur - 413255",
      Google_Location: "https://maps.app.goo.gl/cCGnPF1QQFDd3fLVA",
      image: Dealer1,
    },
    {
      name: "Anuraj Tractors",
      id: "6",
      location: "Ahmednagar",
      owner: "Amol Ranshing",
      phone: "+91 8806667664",
      email: "example@gmail.com",
      address:
        "Arangaon, Ahmednagar - Daund Road, ahead of VRD, Near Pranav Hotel, Ahmednagar - 414006",
      Google_Location: "https://maps.app.goo.gl/ucq9KM75Sir2Jka4A",
      image: Dealer1,
    },
    {
      name: "Ambrish Tractors",
      id: "7",
      location: "Jalna",
      owner: "Ambrish Ramkishan Lahoti",
      phone: "+91 94208 24716, +91 94222 16425",
      email: "example@gmail.com",
      address:
        "5031, Saraswati Gining Factory Compound, Old Jalna Road, near Nagar Parishan, Jalna, Maharashtra- 431203",
      Google_Location: "https://maps.app.goo.gl/5FRWyTLjPbwykA2R6",
      image: Dealer1,
    },
    {
      name: "Sainath Tractors",
      id: "8",
      location: "Sehore",
      owner: "Sanjay Rathore",
      phone: "+91 97554 19104",
      email: "example@gmail.com",
      address:
        "Sainath tractors, near Mandi Thane, Sehore, Sehore District, Madhya Pradesh - 466001",
      Google_Location: "",
      image: Dealer1,
    },
    {
      name: "Kartikeya Traders",
      id: "9",
      location: "Sagar",
      owner: "Malti Sachan",
      phone: "+91 99261 84981",
      email: "example@gmail.com",
      address:
        "Ward No 20, Zone 03,51/41/1, Shastri Ward, N.H 934, Sagar - 470002",
      Google_Location: "",
      image: Dealer1,
    },
    {
      name: "National Tractors",
      id: "10",
      location: "Jabalpur",
      owner: "Amish Khandelwal",
      phone: "+91 97134 37232",
      email: "example@gmail.com",
      address:
        "93, Near ISBT, Vijay Nagar, Deendayal Bus stand, Jabalpur, MP - 482001",
      Google_Location: "https://maps.app.goo.gl/NenPBbJcnxEwUAgK7",
      image: Dealer1,
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
      image: Dealer1,
    },
    {
      name: "Leela Enterprises",
      id: "12",
      location: "Sheopur",
      owner: "Mahendra Dangi",
      phone: "+91 79998 62922",
      email: "example@gmail.com",
      address:
        "Old AB Road, Near Madhumilan Factory, in front of Sanjivani Hospital, Talavada champapura, Biaora, MP - 465674",
      Google_Location: "https://maps.app.goo.gl/bp6LPej165MEJtQ46",
      image: Dealer1,
    },
    {
      name: "Rainbow Tractors",
      id: "13",
      location: "Nanded",
      owner: "Abdul Waheed Abdul Wali",
      phone: "+91 9765692317",
      email: "example@gmail.com",
      address:
        "At Sangavi, Post Taroda Taroda Bk, Hingoli - Kalamnuri - Nanded Rd, opposite Airport, Nanded, Maharashtra 431605",
      Google_Location: "https://maps.app.goo.gl/ZAQY1yjFb1dsWKzk7",
      image: Dealer1,
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
      image: Dealer1,
    },
    {
      name: "VENTILE COMPANY PRIVATE LIMITED",
      id: "15",
      location: "Pune",
      owner: "Tejas Pandit",
      phone: "+91 9922970720",
      email: "example@gmail.com",
      address:
        "251/1, Pune Solapur Road, Kadamwak Vasti, Loni Kalbhor, Haveli, Pune - 412207",
      Google_Location: "https://maps.app.goo.gl/YYVKFeBs1SVRphTz6",
      image: Dealer1,
    },
  ];
};

export const fetchLocations = async (setLocations, setStates) => {
  try {
    const response = await fetch(
      "https://used-tractor-backend.azurewebsites.net/user/web/user-location-details/"
    );
    const data = await response.json();
    console.log("Fetched Data:", data);

    const locationData = data.data || {}; // Ensure it's an object
    setLocations(locationData);

    const uniqueStates = [
      ...new Set(Object.values(locationData).map((item) => item.state)),
    ];
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

export default function InventoryPage({ inventoryData }) {
  const [inventory, setInventory] = useState(inventoryData);

  useEffect(() => {
    // Only run on client
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("inventoryData");

      if (stored) {
        setInventory(JSON.parse(stored));
      } else {
        sessionStorage.setItem("inventoryData", JSON.stringify(inventoryData));
      }
    }
  }, [inventoryData]);

  return (
    <div>
      {inventory.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export async function getInventoryData() {
  let inventoryData = [];

  try {
    const res = await fetch(
      "https://used-tractor-backend.azurewebsites.net/inventory/web/v2/tractor/"
    );
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
    const rawData = await res.json();
    inventoryData = Array.isArray(rawData?.data)
      ? rawData.data.filter((item) => [1, 2, 3].includes(item.status)) // Filter by status
      : [];
  } catch (error) {
    console.error("❌ Error fetching data in getLocaleProps:", error);
  }
  return inventoryData;
}

export const useInventory = (initialData = []) => {
  const [inventory, setInventory] = useState(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("inventoryData");

    if (stored) {
      const decrypted = decryptData(stored);
      if (decrypted && decrypted.length > 0) {
        // Only update state if data is different
        if (JSON.stringify(decrypted) !== JSON.stringify(inventory)) {
          setInventory(decrypted);
        }
      }
      setLoading(false);
    } else if (initialData.length > 0) {
      if (JSON.stringify(initialData) !== JSON.stringify(inventory)) {
        setInventory(initialData);
      }
      setLoading(false);
    } else {
      getInventoryData()
        .then((data) => {
          if (data && data.length > 0) {
            if (JSON.stringify(data) !== JSON.stringify(inventory)) {
              const encrypted = encryptData(data);
              sessionStorage.setItem("inventoryData", encrypted);
              setInventory(data);
            }
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [initialData]);

  return { inventory, loading };
};

// SEO-Meta-Data
export const staticMetaByRoute = {
  "/": {
    title: "Tractor World | Home",
    description:
      "Discover top-rated new and used tractors, compare models, apply for loans, and locate dealers across India.",
    keywords:
      "tractors in India, new tractors, used tractors, tractor comparison, tractor dealers, apply tractor loan",
  },

  "/compare": {
    title: "Compare Tractors | Tractor World",
    description:
      "Compare two tractors side-by-side based on brand, horsepower, price, and features before buying.",
    keywords:
      "compare tractors, tractor comparison India, Mahindra vs Swaraj, tractor features, tractor price comparison",
  },

  "/about": {
    title: "About Us | Tractor World",
    description:
      "Learn more about Tractor World—India's trusted platform for tractor buyers, dealers, and financing.",
    keywords:
      "about Tractor World, tractor platform India, trusted tractor marketplace, tractor portal information",
  },

  "/locate-dealer": {
    title: "Locate Tractor Dealers Near You | Tractor World",
    description:
      "Find verified tractor dealers in your city or state. Search by brand, location, or dealership ratings.",
    keywords:
      "tractor dealers near me, locate tractor dealer, Mahindra dealers, Swaraj dealers, tractor dealerships India",
  },

  "/loan": {
    title: "Apply for Tractor Loan Online | Tractor World",
    description:
      "Get quick tractor loans with easy EMI options. Check eligibility and apply online for agricultural financing.",
    keywords:
      "tractor loan, apply tractor loan online, EMI tractor finance, agricultural loan India, tractor EMI calculator",
  },

  "/content-gallery": {
    title: "Tractor Videos & Blogs | Content Gallery | Tractor World",
    description:
      "Watch tractor reviews, learn tips for farming equipment, and explore in-depth blog content on Tractor World.",
    keywords:
      "tractor blogs, tractor videos, farming tips, agriculture content, tractor reviews, content gallery India",
  },

  "/contact-us": {
    title: "Contact Us | Tractor World Support",
    description:
      "Reach out to the Tractor World team for inquiries, support, partnerships, or feedback.",
    keywords:
      "contact Tractor World, tractor support, dealer inquiry, tractor platform help, customer service tractor world",
  },

  "/inventory": {
    title: "Browse Tractors for Sale | Inventory | Tractor World",
    description:
      "Explore our full inventory of new and used tractors from top brands. Filter by price, HP, location, and more.",
    keywords:
      "tractors for sale, used tractors India, new tractors, tractor inventory, Mahindra tractors, Swaraj tractors, buy tractor online",
  },

  "/sell-tractor": {
    title: "Sell Your Tractor Online | Tractor World",
    description:
      "List your tractor for sale in just a few steps. Reach thousands of buyers across India through Tractor World.",
    keywords:
      "sell tractor, list tractor for sale, used tractor India, tractor seller portal, post tractor ad, sell second-hand tractor",
  },

  "/terms-and-conditions": {
    title: "Terms & Conditions | Tractor World",
    description:
      "Review the terms and conditions that govern your use of Tractor World. Learn about user rights, responsibilities, and policies.",
    keywords:
      "Tractor World terms, terms and conditions, user agreement, tractor website policies, legal terms, platform rules",
  },
};
