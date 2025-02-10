import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";
import "animate.css/animate.css";
import "./index.css";
import "./css/formatting.css";
import App from "./App";
import { CartProvider } from "./data/CartStore";
import { AuthProvider } from "./services/Auth";
import Whatsapp from "./components/Whatsapp";
import { Helmet } from "react-helmet";
import axios from "axios";
import { store } from "./store";
import { Provider } from "react-redux";
import AiChatBotComp from "./components/AIChatBotComp";
import "react-lazy-load-image-component/src/effects/blur.css";

// Fetch website settings dynamically
const fetchWebsiteSettings = async () => {
  try {
    const res = await axios.get(
      `https://backend.aiproresume.com/public/api/settings-for-website`
    );
    const data = res.data.data.settings;
    return {
      title: data.title || "Default Title",
      description: data.description || "Default Description",
      imageUrl:
        `${res.data.data.image_url}/${data.share_image}` ||
        "https://backend.aiproresume.com/public/images/header_logo.png",
      keywords:
        data.keywords ||
        "AI resume pro, resume maker pro, resume pro, my perfect resume, find my resume, free resume builder, resume help, resume design, build my resume",
    };
  } catch (err) {
    console.error(err);
    return {
      title: "Default Title",
      description: "Default Description",
      imageUrl: "https://backend.aiproresume.com/public/images/header_logo.png",
      keywords: "resume, resume builder, AI resume",
    };
  }
};

// Component to wrap Helmet and App
const AppWithHelmet = ({ title, description, imageUrl, keywords }) => (
  <HttpsRedirect>
    <Helmet>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:image" content={imageUrl} />

      <meta name="keywords" content={keywords} />
    </Helmet>
    <AuthProvider>
      <CartProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <AiChatBotComp />
          </BrowserRouter>
        </Provider>
        <Whatsapp />
      </CartProvider>
    </AuthProvider>
  </HttpsRedirect>
);

// Hydration instead of createRoot for dynamic SSR rendering
const renderApp = async () => {
  const settings = await fetchWebsiteSettings();

  ReactDOM.hydrateRoot(
    document.getElementById("root"),
    <React.StrictMode>
      <AppWithHelmet {...settings} />
    </React.StrictMode>
  );
};

renderApp();
