import { useEffect } from "react";

const TawkToWidget = () => {
  useEffect(() => {
    // Add Tawk.to script dynamically
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/66f50d58e5982d6c7bb4b5ba/1i8mjo8m4";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return null; // No UI needed
};

export default TawkToWidget;
