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
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <BrowserRouter>
          <div className="App">
            <AppRoutes />
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
