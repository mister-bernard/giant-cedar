import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// GA4 — only loads if VITE_GA_MEASUREMENT_ID is set in .env.local
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
if (GA_ID) {
  // Variant is assigned by useVariant on first render; we init GA early
  // so the script is in flight. The variant user property is set there.
  import("./analytics").then(({ initGA }) => initGA(GA_ID));
}

createRoot(document.getElementById("root")!).render(<App />);
