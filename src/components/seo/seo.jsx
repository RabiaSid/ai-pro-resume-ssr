// way 1
// import React, { useEffect } from "react";

// const SeoMetaTagsWithScript = ({ mainTitle, seoData }) => {
//   const imageUrl = `${seoData?.image_url}/${seoData?.share_image}`;

//   useEffect(() => {
//     // Update meta tags dynamically
//     const updateOrCreateMetaTag = (selector, attribute, content) => {
//       let tag = document.querySelector(selector);
//       if (!tag) {
//         tag = document.createElement("meta");
//         if (selector.includes("property")) {
//           tag.setAttribute("property", selector.split('="')[1]);
//         } else {
//           tag.setAttribute("name", selector.split('="')[1]);
//         }
//         document.head.appendChild(tag);
//       }
//       tag.setAttribute(attribute, content);
//     };

//     // Update or create necessary meta tags
//     updateOrCreateMetaTag(
//       'meta[name="description"]',
//       "content",
//       seoData?.description || "Default description..."
//     );
//     updateOrCreateMetaTag(
//       'meta[property="og:title"]',
//       "content",
//       seoData?.title || "Default title..."
//     );
//     updateOrCreateMetaTag(
//       'meta[property="og:description"]',
//       "content",
//       seoData?.description || "Default description..."
//     );
//     updateOrCreateMetaTag(
//       'meta[property="og:image"]',
//       "content",
//       imageUrl || "Default image URL..."
//     );
//     updateOrCreateMetaTag(
//       'meta[name="twitter:title"]',
//       "content",
//       seoData?.title || "Default title..."
//     );
//     updateOrCreateMetaTag(
//       'meta[name="twitter:description"]',
//       "content",
//       seoData?.description || "Default description..."
//     );
//     updateOrCreateMetaTag(
//       'meta[name="twitter:image"]',
//       "content",
//       imageUrl || "Default image URL..."
//     );

//     // JSON-LD structured data script tag
//     const scriptId = "structured-data-script";
//     let existingScript = document.getElementById(scriptId);
//     if (existingScript) existingScript.remove();

//     const script = document.createElement("script");
//     script.type = "application/ld+json";
//     script.id = scriptId;
//     script.innerHTML = JSON.stringify({
//       "@context": "http://schema.org",
//       "@type": "WebPage",
//       name: seoData?.title || "Default title",
//       description: seoData?.description || "Default description",
//       image: imageUrl || "Default image URL",
//       publisher: {
//         "@type": "Organization",
//         name: "AI Pro Resume",
//       },
//     });
//     document.head.appendChild(script);
//   }, [seoData, imageUrl]);

//   return null; // No visible component output, only meta updates
// };

// export default SeoMetaTagsWithScript;

// way 2
import React from "react";
import { Helmet } from "react-helmet";

const SeoMetaTags = ({ mainTitle, seoData }) => {
  const imageUrl = seoData?.image_url
    ? `${seoData?.image_url}/${seoData?.share_image}`
    : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      {mainTitle && <title>{seoData?.title}</title>}
      <meta name="title" content={seoData?.title} />
      <meta name="description" content={seoData?.description} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoData?.title} />
      <meta property="og:description" content={seoData?.description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoData?.url || window.location.href} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData?.title} />
      <meta name="twitter:description" content={seoData?.description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
};

export default SeoMetaTags;
