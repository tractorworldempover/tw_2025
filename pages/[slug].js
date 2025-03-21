export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "example-page" } },
      { params: { slug: "another-page" } },
    ],
    fallback: false, // Change to "true" if you want dynamic pages
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug, // Just passing the slug as a prop
    },
  };
}

export default function Page({ slug }) {
  return (
    <div>
      <h1>Page: {slug}</h1>
      <p>This is a simple static page for {slug}.</p>
    </div>
  );
}
