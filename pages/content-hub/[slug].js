import { useRouter } from "next/router";
import Layout from "@components/Layout";
import Banner from "@components/Banner";
import { useTranslation } from "next-i18next";
import bannerImg from "@Images/contentHub/banner.svg";
import { getLocaleProps } from "@helpers";
import Image from "next/image";

export async function getServerSideProps(context) {
  return await getLocaleProps(context);
}

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const { t, i18n } = useTranslation("common");

  const breadcrumbData = [
    { label: t("Home.Home"), link: "/" },
    { label: t("Home.Blog"), link: "#" },
  ];

  // Fetch blog data by slug here (using getServerSideProps or getStaticProps)

  return (
    <div>
      <Layout currentPage={"Blog"}>
        <Banner
          breadcrumbs={breadcrumbData}
          heading={t("Content_Hub.Blog")}
          bannerImg={bannerImg}
        />
        <div>
          {/* <h1>Blog Detail Page</h1>
          <p>Slug: {slug}</p> */}

          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Category Label */}
            <div className="mb-4">
              <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
                MAHINDRA TRACTOR
              </span>
            </div>

            {/* Blog Title */}
            <h1 className="text-3xl font-bold mb-2 leading-tight">
              Mahindra vs Swaraj Tractor Comparison: Which One Drives Better
              Results?
            </h1>

            {/* Meta Info */}
            <div className="text-sm text-gray-500 mb-6">
              <span className="font-medium">TRACTOR GURU</span> • April 29, 2025
            </div>

            {/* Featured Image */}
            <Image
              src="/images/conentGallery/1.svg"
              alt="Mahindra vs Swaraj Tractor Comparison"
              width={800}
              height={400}
              className="w-full rounded shadow"
            />

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-red-700 prose-a:font-semibold prose-ul:pl-5 prose-li:marker:text-gray-600">
              <p>
                Farmers need to make a crucial decision when selecting the right
                tractor for their farm operations. Efficient tractor machinery
                provides time and productivity benefits. The Indian farmers
                compare the Mahindra and Swaraj tractors with each other. These
                two popular brands offer the most efficient equipment with
                high-quality construction standards. Additionally, they deliver
                maximum performance in each of their machinery and
                implementations. But the question remains – Mahindra vs Swaraj
                Tractor: Who performs better?
              </p>

              <p className="mb-5">
                This blog provides a feature-by-feature comparison of both
                tractor models, assisting customers in choosing the best farming
                equipment. The decision-making process for your choice of the
                best tractor for agriculture will be easier with this
                comparison.
              </p>

              {/* Table of Contents */}
              <div className="border border-gray-300 rounded-md p-4 shadow-sm bg-white">
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  Table of Contents
                </h3>
                <ul className="text-sm list-decimal list-inside space-y-1">
                  <li>
                    <a href="#mahindra">Overview of Mahindra Tractor</a>
                  </li>
                  <li>
                    <a href="#swaraj">Overview of Swaraj Tractor</a>
                  </li>
                  <li>
                    <a href="#comparison">
                      Mahindra vs Swaraj Tractors: Key Differences
                    </a>
                    <ul className="list-decimal ml-4">
                      <li>Performance and Power</li>
                      <li>Technology and Features</li>
                      <li>Build Quality and Tractor Lifting Capacity</li>
                      <li>Price and Affordability</li>
                      <li>After-Sales Service</li>
                      <li>Heavy-Duty Tractor Variants</li>
                    </ul>
                  </li>
                  <li>
                    <a href="#which-to-buy">Which One to Buy?</a>
                    <ul className="list-decimal ml-4">
                      <li>Mahindra vs Swaraj Tractor Comparison Table</li>
                      <li>Conclusion</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h2 id="mahindra" className="mt-10 font-bold">
                Overview of Mahindra Tractor
              </h2>
              <p>
                The Mahindra tractor is a well-known brand used by both Indian
                and global consumers. Customers know the{" "}
                <span className="text-red-700 font-semibold">
                  Mahindra tractors
                </span>{" "}
                as tools that are hardy, reliable, and easy to use by farmers.
                Their product categories include varieties of tractor models
                based on the types of farming activities undertaken by the
                farmers. Mahindra tractors get their name because of the power of their engines, along with adequate lifting capacity and variable vehicle designs. Mahindra tractors are the favourite among Indian farmers because they give excellent performance and great fuel efficiency. In the Mahindra vs Swaraj Tractor comparison, Mahindra often takes the lead because of its advanced technology and broader presence globally.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
