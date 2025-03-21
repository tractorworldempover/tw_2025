import "../styles/globals.css"; 
import { getApolloClient } from "@service/apollo-client";
import { ApolloProvider } from '@apollo/client'; 
import { appWithTranslation } from 'next-i18next';
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import React, { useState, useEffect } from "react";
import LoaderHi from '@Images/loader.gif';
import LoaderMr from '@Images/loaderMr.gif';
import LoaderEn from '@Images/loaderEn.gif';
import Loader from '@components/Loader';

// Import translations 

function MyApp({ Component, pageProps }) {

  const [client, setClient] = useState(null);
  const language = "EN";

  useEffect(() => {
    async function initializeApollo() {
      const apolloClient = await getApolloClient(); // Ensure client is initialized
      setClient(apolloClient);
    }
    initializeApollo();
  }, []);

  if (!client) {
    return  <Loader loaderImage={language == 'HI' ? LoaderHi : language == 'MR' ? LoaderMr : LoaderEn} />; // Wait for client to be initialized
  }
 
   return ( 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      </PersistGate>
    </Provider>  
  );
} 
  
export default appWithTranslation(MyApp);