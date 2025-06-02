import { useRouter } from "next/router";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import { useTranslation } from "next-i18next";
import bannerImg from "@Images/contentHub/banner.svg";
import { getLocaleProps } from "@helpers";
import Head from "next/head";
import { staticMetaByRoute } from "../../utils";

export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}

export default function Terms_and_Conditions() {
  const { t } = useTranslation("common");
  const meta = staticMetaByRoute["/terms-and-conditions"];

  const breadcrumbData = [
    { label: t("Home.Home"), link: "/" },
    { label: t("Terms and Conditions"), link: "#" },
  ];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <Layout currentPage={t("Home.Terms_&_Conditions")}>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={t("Home.Terms_&_Conditions")}
          bannerImg={bannerImg}
        />
        <div className="px-6 py-12 max-w-5xl mx-auto text-justify text-gray-800">
          <h2 className="text-2xl font-bold mb-6">Terms and Conditions</h2>
          <p className="mb-4">
            Welcome to Tractor World by Mahindra. By accessing this website, you
            agree to be bound by the following terms and conditions. If you do
            not agree with any part of these terms, please do not use our
            website.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2">
            1. Use of the Website
          </h3>
          <p className="mb-4">
            This website is intended for your personal and non-commercial use
            only. You agree not to use this site for unlawful purposes or for
            any activity that could harm, disable, or impair the website.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2">
            2. Intellectual Property
          </h3>
          <p className="mb-4">
            All content on this website, including logos, text, graphics,
            images, and software, is the property of Tractor World or its
            licensors and is protected by applicable copyright and trademark
            laws.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2">3. User Conduct</h3>
          <p className="mb-4">
            You agree not to upload or transmit any material that is unlawful,
            defamatory, obscene, or harmful. We reserve the right to terminate
            your access if your behavior is found to be inappropriate.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2">
            4. Limitation of Liability
          </h3>
          <p className="mb-4">
            We strive to keep the website updated and accurate, but we make no
            warranties of any kind. Tractor World shall not be liable for any
            damages arising out of your use of the website.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2">5. Privacy Policy</h3>
          <p className="mb-4">
            Your privacy is important to us. Please refer to our Privacy Policy
            page for more information about how we collect and use your data.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2">6. Modifications</h3>
          <p className="mb-4">
            We may update these terms and conditions at any time. Changes will
            be effective immediately upon posting on this page.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-2">7. Contact</h3>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, you can
            contact us via the details provided on our Contact Us page.
          </p>

          <p className="mt-10 text-sm text-gray-600">
            Last updated: June 2, 2025
          </p>
        </div>
      </Layout>
    </>
  );
}
