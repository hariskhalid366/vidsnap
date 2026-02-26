import { useEffect, useRef } from "react";

/**
 * Google AdSense wrapper with intelligent fallback.
 * Replace "ca-pub-XXXXXXXXXXXXXXXXX" in index.html with your Publisher ID.
 * Replace the slot strings with your real Ad Unit slots.
 */
export default function AdBanner({ slot = "default", format = "horizontal" }) {
  const ref = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // AdSense not loaded (dev mode / ad blocker)
    }
  }, []);

  const slotIds = {
    "hero-bottom": "1234567890",
    "mid-page": "0987654321",
    "before-faq": "1122334455",
    default: "5544332211",
  };

  const styles = {
    horizontal: { display: "block", width: "100%", height: "90px" },
    rectangle: { display: "block", width: "300px", height: "250px" },
  };

  return (
    <div
      className="ad-container"
      style={{ minHeight: format === "horizontal" ? "100px" : "270px" }}
    >
      <span className="ad-label">Advertisement</span>

      {/* Real AdSense ins tag — only renders when adsbygoogle.js is loaded */}
      {/* <ins
        ref={ref}
        className="adsbygoogle"
        style={styles[format] || styles.horizontal}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
        data-ad-slot={slotIds[slot] || slotIds.default}
        data-ad-format={format === 'horizontal' ? 'auto' : 'rectangle'}
        data-full-width-responsive="true"
      /> */}
      <ins
        className="adsbygoogle"
        ref={ref}
        style={styles[format] || styles.horizontal}
        data-ad-client="ca-pub-9133057606079185"
        data-ad-slot="1552368047"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      {/* Dev/fallback placeholder (hidden when real ad loads) */}
      <div
        className="ad-mock"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginBottom: 6, opacity: 0.4 }}
        >
          <rect
            x="2"
            y="6"
            width="20"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7 12h10M7 15h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div>Google AdSense – {format} ad</div>
        <div style={{ fontSize: "0.75rem", marginTop: 2 }}>
          Add your Publisher ID to activate
        </div>
      </div>
    </div>
  );
}
