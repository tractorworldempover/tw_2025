import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {LiveInventoryAPIURL } from "@utils/constants";

export async function getLocaleProps(context) {

  console.log("🛠 getLocaleProps is running with locale:", context.locale);

  const locale = context.locale;
  let inventoryData = [];

  try {
    const res = await fetch(LiveInventoryAPIURL);
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`); 

    const rawData = await res.json();
    inventoryData = Array.isArray(rawData?.data)
      ? rawData.data.filter(item => [1, 2, 3].includes(item.status)) // Filter by status
      : [];

  } catch (error) {
    console.error("❌ Error fetching data in getLocaleProps:", error);
  }

  return {
    props: {
      locale,
      inventoryData, // Ensure it's included
      ...(await serverSideTranslations(locale, ['common'])),
    }
  };
 
}
