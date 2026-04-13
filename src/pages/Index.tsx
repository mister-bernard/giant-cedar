/**
 * Index.tsx — A/B router.
 * Assigns variant once, renders the correct theme, passes tracking down.
 * All copy lives in src/content/copy.ts — edit there to update both themes.
 */

import { useVariant } from "@/hooks/useVariant";
import { MinimalistArchitect } from "@/themes/MinimalistArchitect";
import { AlpineEditorial }     from "@/themes/AlpineEditorial";

const Index = () => {
  const { variant, track } = useVariant();

  if (variant === "alpine") {
    return <AlpineEditorial variant={variant} track={track} />;
  }
  return <MinimalistArchitect variant={variant} track={track} />;
};

export default Index;
