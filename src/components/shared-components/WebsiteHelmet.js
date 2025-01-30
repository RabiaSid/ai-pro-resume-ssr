import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const WebsiteHelmet = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios
      .get(`https://backend.aiproresume.com/public/api/settings-for-website`)
      .then((res) => {
        setImageUrl(
          `${res.data.data.image_url}/${res.data.data.settings.share_image}`
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Helmet>
      {/* HTML Meta Tags */}
      <title>AIProResumeBuilder</title>
      <meta name="title" content="AIProResumeBuilder" />
      <meta
        name="description"
        content="AIProResumeBuilder is the best tool for creating professional resumes."
      />

      {/* Facebook Meta Tags  */}
      <meta name="url" property="og:url" content="https://aiproresume.com" />
      <meta name="type" property="og:type" content="website" />
      <meta name="title" property="og:title" content="AIProResumeBuilder" />
      <meta
        name="description"
        property="og:description"
        content="AIProResumeBuilder is the best tool for creating professional resumes."
      />
      <meta
        name="image"
        property="og:image"
        content={`https://placehold.co/600x400`}
      />

      {/* Twitter Meta Tags  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="aiproresume.com" />
      <meta property="twitter:url" content="https://aiproresume.com" />
      <meta name="twitter:title" content="AIProResumeBuilder" />
      <meta
        name="twitter:description"
        content="AIProResumeBuilder is the best tool for creating professional resumes."
      />
      <meta name="twitter:image" content={`${imageUrl}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Helmet>
  );
};

export default WebsiteHelmet;
