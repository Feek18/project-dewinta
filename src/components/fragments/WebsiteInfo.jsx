import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/translations")
      .then((response) => response.json())
      .then((result) => {
        setData(result.websiteInfo);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Menampilkan Web Title */}
      <title>{data.web_title || "Title"}</title>

      {/* Menampilkan Meta Tags */}
      <meta
        name="description"
        content={data.meta_description || "Description"}
      />
      <meta name="keywords" content={data.meta_keywords || "Keywords"} />

      {/* Menampilkan Favicon */}
      <link
        rel="icon"
        href={
          data?.favicon
            ? `http://localhost:8000/storage/favicons/logo.png`
            : ""
        }
        type="image/png"
      />
    </div>
  );
}

export default App;
