import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    principal: 0,
    loanAmount:0,
    roi: 8, // rate of interest
    tenure: 84,
    downPayment:100000,
    addressData: {},
    modalStatus: false,
    totalAmtInt: 0, 
};

// Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
         // Loan Amount action to update Loan amount
         setLoanAmount: (state, action) => {
            console.log('Action Payload (Loan amount):', action.payload);
            state.loanAmount = action.payload;  // Updating principal amount
        },
        // Principal action to update principal state
        setPrincipal: (state, action) => {
            console.log('Action Payload (Principal):', action.payload);
            state.principal = action.payload;  // Updating principal amount
        },
        // Rate of interest action to update roi
        setRateOfInterest: (state, action) => {
            console.log('Action Payload (Rate of Interest):', action.payload);
            state.roi = action.payload;  // Updating rate of interest
        },
        // Loan tenure action to update tenure
        setLoanTenure: (state, action) => {
            console.log('Action Payload (Loan Tenure):', action.payload);
            state.tenure = action.payload;  // Updating loan tenure
        },
         // Loan tenure action to update DownPayment
         setDownPayment: (state, action) => {
            console.log('Down Payout (Down Payout):', action.payload);
            state.downPayment = action.payload;  // Updating DownPayment
        },
          // Total Principle And Int action to update 
          setTotalPrincipleAndInt: (state, action) => {
            console.log('Action Payload (Total Principle And Int):', action.payload);
            state.totalAmtInt = action.payload;  
        },
        // Existing reducers for address data
        setAddressData: (state, action) => {
            console.log('Action Payload (Address Data):', action.payload);
            state.addressData = action.payload.addressData;  // Update address data
        },
        // Modal status action to update modal status
        setModalStatus: (state, action) => {
            console.log('Action Payload (Modal Status):', action.payload);
            state.modalStatus = action.payload.modalStatus;  // Update modal status
        },
      
    },
});

// Export the actions and reducer
export const { setPrincipal,setLoanAmount,setRateOfInterest, setLoanTenure, setAddressData, setDownPayment,setModalStatus,setTotalPrincipleAndInt } = userSlice.actions;
export default userSlice.reducer;
