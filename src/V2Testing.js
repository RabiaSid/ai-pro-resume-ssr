import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const V2Testing = () => {
  return (
    <div className="flex items-center gap-4">
      <Helmet>
        <meta
          name="robots"
          content="nofollow, noindex, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
      </Helmet>
      <Link
        to={"/resume/formatting-dev-testing"}
        state={{ isExamples: false, exampleId: 0, selectedTemplateId: 3 }}
      >
        New Resume
      </Link>

      <Link
        to={"/create-cover-letter/formatting-dev-testing"}
        state={{ isExamples: false, exampleId: 0, selectedTemplateId: 1 }}
      >
        New Cover
      </Link>

      <Link to="/import-resume-v2-testing">use Parser</Link>
    </div>
  );
};

export default V2Testing;
