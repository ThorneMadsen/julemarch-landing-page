import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";

// The Tweaks panel is normally toggled by the design host. In this standalone
// repo there's no host, so wire a dev shortcut: press "t" to show/hide it.
let tweaksOpen = false;
window.addEventListener("keydown", (e) => {
  const tag = (e.target.tagName || "").toLowerCase();
  if (e.key === "t" && !["input", "textarea", "select"].includes(tag)) {
    tweaksOpen = !tweaksOpen;
    window.postMessage(
      { type: tweaksOpen ? "__activate_edit_mode" : "__deactivate_edit_mode" },
      "*"
    );
  }
});

createRoot(document.getElementById("root")).render(<App />);
