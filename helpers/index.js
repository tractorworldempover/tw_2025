import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getLocaleProps(context, namespaces = ['common']) {
  const locale = context.locale;

  console.log("🛠 getLocaleProps is running with locale:", locale);

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, namespaces)),
    }
  };
}
