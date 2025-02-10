import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./Config";
import "./css/animate.min.css";
import "./css/style2.css";
import "./css/style3.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "./services/Auth.jsx";
import { ApiService } from "./services/ApiService.jsx";
import Cookies from "js-cookie";
import SpinnerLoader from "./components/shared-components/spinnerloader/SpinnerLoader.js";
import AppRoutes from "./route";

function App() {
  const { user, userSessionExpired } = useAuth();
  const [websiteStatus, setWebsiteStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [shearImage, setShearImage] = useState("");

  useEffect(() => {
    const checkPathname = () => {
      const currentPath = window.location.pathname;
      const disallowedEndings = ["formatting", "formatting-admin", "checkout"];
      const shouldKeepCookies = disallowedEndings.some((ending) =>
        currentPath.endsWith(ending)
      );

      if (!shouldKeepCookies) {
        Cookies.remove("newResumeId");
        Cookies.remove("resumeExampleId");
        Cookies.remove("freshCoverId");
        Cookies.remove("newExampleCoverId");
        Cookies.remove("gen_cvr_ai");
        Cookies.remove("payotp");
      }
    };

    checkPathname();
    window.addEventListener("popstate", checkPathname);

    return () => {
      window.removeEventListener("popstate", checkPathname);
    };
  }, []);

  useEffect(() => {
    ApiService.getSettingForWebsite().then((res) => {
      setWebsiteStatus(res.data.data.settings.website_status);
      setShearImage(
        `${res.data.data.image_url}/${res.data.data.settings.share_image}`
      );
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link rel="stylesheet" href="./App.css"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Rubik&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossorigin="anonymous"
          />

          <title>React App</title>
        </head>
        <body>
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            <BrowserRouter>
              <div className="App">
                <AppRoutes />
              </div>
            </BrowserRouter>
          )}
        </body>
      </html>
      <script src="/main.js" async=""></script>
    </>
  );
}

export default App;
