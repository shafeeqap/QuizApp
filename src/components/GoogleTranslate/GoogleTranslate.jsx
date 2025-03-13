import { useEffect } from "react";

/* global google */

const GoogleTranslate = () => {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar,ml",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Load script
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // CSS to hide elements
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame {
        display: none !important;
        visibility: hidden !important;
      }
      body {
        top: 0 !important;
      }
      .goog-te-gadget-icon {
        display: none;
      }
      .goog-tooltip {
        display: none !important;
      }
      .goog-tooltip:hover {
        display: none !important;
      }
      .goog-text-highlight {
        background-color: transparent !important;
        border: none !important; 
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);

    // JavaScript fallback to handle dynamic elements
    const observer = new MutationObserver(() => {
      const banners = document.querySelectorAll(".goog-te-banner-frame");
      banners.forEach((banner) => {
        banner.style.display = "none";
        banner.style.visibility = "hidden";
      });

      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        if (iframe.src.includes("translate.googleapis.com")) {
          iframe.style.display = "none";
          iframe.style.visibility = "hidden";
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      document.head.removeChild(style);
      document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
