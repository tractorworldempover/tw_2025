import { gql } from '@apollo/client';

export const customImageLoader = ({ src }) => {
  return src; // Return the original image source directly
};


export const HP_OPTIONS = [
  { label: "1 HP - 20 HP", value: "1_20" },
  { label: "21 HP - 30 HP", value: "21_30" },
  { label: "31 HP - 40 HP", value: "31_40" },
  { label: "41 HP - 45 HP", value: "41_45" },
  { label: "46 HP - 50 HP", value: "46_50" },
  { label: "51 HP - 60 HP", value: "51_60" },
  { label: "Above 75 HP", value: "75" },
];


export const PRICE_OPTIONS = [
  { label: "0 Lakh - 3 Lakh", value: "0_3" },
  { label: "3 Lakh - 5 Lakh", value: "3_5" },
  { label: "5 Lakh - 7 Lakh", value: "5_7" },
  { label: "7 Lakh - 10 Lakh", value: "7_10" },
  { label: "Above 10 Lakh", value: ">10" },
];

export const LiveInventoryAPIURL="https://used-tractor-backend.azurewebsites.net/inventory/web/v2/tractor/";



export const HOMEPAGE_QUERIES = gql`
  query GetHomeData($lang: LanguageCodeFilterEnum!) {

    homeSliders(where: {orderby: {field: DATE, order: ASC}, language: $lang}) {
      nodes {
        homesliders { 
          sliderimage {
            node {
              mediaItemUrl
            }
          }
          mobilesliderimage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }

  allLiveInventory(
    where: {orderby: {field: DATE, order: DESC}, language: $lang} 
  ) {
    edges {
      node {
        title
        liveInventoryData {
          engineHours
          brand
          driveType
          enginePower
          maxPrice
          imageLinks
          brand
          isVerified
          district
          state
        }
        slug
        id
      }
    }
  }

   testimonials(where: {orderby: {field: DATE, order: ASC}, language: $lang}) {
    nodes {
      tesimonails {
        description
        videourl
        mobileimage {
          node {
            mediaItemUrl
          }
        }
        webimage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }

contentgallerys(where: {orderby: {field: DATE, order: ASC}, language: $lang}) {
    nodes {
      contentGalleryFields {
        badge
        description
        image {
          node {
            mediaItemUrl
            sourceUrl
          }
        }
      }
      date
      title
      uri
    }
  }

  latestnews(where: {orderby: {field: TITLE, order: ASC}, language: $lang}) {
    edges {
      node {
        contentGalleryFields {
          badge
          description
          image {
            node {
              mediaItemUrl
            }
          }
        }
        title
        uri
        date
      }
    }
  }
  }  
`;

///dealer list  
export const DEALERLIST_DATA = gql` 
query DealerList($lang: LanguageCodeFilterEnum!) {
  dealerslist(where: {orderby: {field: DATE, order: ASC}, language: $lang}) {
    nodes {
      dealerlistFields {
        address
        dealerName
        googleLocation {
          url
        }
        phoneNumber
        storeName
      }
      language {
        slug
      }
    }
  }
 
 
  }  
`;

export const GET_LIVE_INVENTORY = gql` 
query GetLiveInventory($lang: LanguageCodeFilterEnum!, $first: Int!, $after: String) {
  allLiveInventory(
    where: {orderby: {field: DATE, order: DESC}, language: $lang}
    first: $first,
    after: $after
  ) {
    edges {
      node {
        title
        liveInventoryData {
          engineHours
          brand
          driveType
          enginePower
          maxPrice
          imageLinks
          brand
          isVerified
          district
          state
          isBatteryBranded
          tyreState
          buyingYear
          battery
          finance
        }
        slug
        id
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
} 
`;

export const GET_LIVE_INVENTORY_BYSEARCH = gql` 
query GetLiveInventory($lang: LanguageCodeFilterEnum!, $first: Int!, $after: String,$search: String) {
  allLiveInventory(
    where: {orderby: {field: DATE, order: DESC}, language: $lang, search: $search}
    first: $first,
    after: $after
  ) {
    edges {
      node {
        title
        liveInventoryData {
          engineHours
          brand
          driveType
          enginePower
          maxPrice
          imageLinks
          brand
          isVerified
          district
          isBatteryBranded
          tyreState
          buyingYear
          battery
          finance
        }
        slug
        id
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
} 
`;

export const GET_SIMILAR_INVENTORY_BYSEARCH = gql` 
query GetLiveInventory($lang: LanguageCodeFilterEnum!,$search: String) {
  allLiveInventory(
    where: {orderby: {field: DATE, order: DESC}, language: $lang, search: $search}
    ) {
    edges {
      node {
        title
        liveInventoryData {
          engineHours
          brand
          driveType
          enginePower
          maxPrice
          imageLinks
          brand
          isVerified
          district
        }
        slug
        id
      } 
    } 
  }
} 
`;

export const GET_ALL_STATES = gql`
 query GetAllStates {
  allStateTowns(where: {orderby: {order: ASC, field: TITLE}}) {
    edges {
      node {
        stateTownList {
          state
        }
        id
      }
    }
  }
}
`;
//const states = response.data.allStateTowns.edges.map(edge => edge.node.stateTownList.state);
//console.log(states); 

export const GET_ALL_TOWNS = gql`
  query GetTownsByState($state: String!) {
  allStateTowns(where: {name: $state}) {
    edges {
      node {
        stateTownList {
          townsList
          state
        }
      }
    }
  }
}
`;
//const states = response.data.allStateTowns.edges.map(edge => edge.node.stateTownList.townsList);
//{ "state": "Maharashtra"}

//get the popular tractor only



export const GET_ALL_POPULAR_BRANDS = gql`
query GetBrands {
  brandsmodels(where: {orderby: {field: TITLE, order: ASC}, categoryName: "popular_tractors"}) {
    edges {
      node {
        brandmodelFields {
          brand
          models
          brandLogo
        }
        slug
      }
    }
  }
}
`;

export const GET_ALL_BRANDS = gql`
query GetBrands {
  brandsmodels(where: {orderby: {field: TITLE, order: ASC}}, first: 50) {
    edges {
      node {
        brandmodelFields {
          brand
          models
          brandLogo
        }
        slug
      }
    }
  }
}
`;
//const brands = response.data.brandsmodels.edges.map(edge => edge.node.brandmodelFields.brand);

export const GET_ALL_MODELS_BY_BRAND = gql`
query GetModelsByBrand($brand: String!) {
  brandsmodels(where: {name: $brand}) {
    edges {
      node {
        brandmodelFields {
          brand
          models
        }
      }
    }
  }
}
`;

// //all latest news
// export const GET_ALL_LATEST_NEWS= gql`
// query AllLatestNews($lang: [LanguageCodeEnum!]) {
//   latestnews(where: {orderby: {field: TITLE, order: ASC}, language: $lang}) {
//     edges {
//       node {
//         contentGalleryFields {
//           badge
//           description
//           image {
//             node {
//               mediaItemUrl
//             }
//           }
//         }
//         title
//         uri
//         date
//       }
//     }
//   }
// }
// `; 

