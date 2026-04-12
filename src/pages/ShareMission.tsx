import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const ShareMission = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    document.title = "Share Mission Area - Giant Cedar";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const coordsParam = params.get("coords") || "";

    const pairs = coordsParam
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => p.split(",").map((n) => Number(n)) as [number, number])
      .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]));

    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: pairs[0] || [-116.5668, 47.6777],
      zoom: 14,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      if (!pairs.length) return;

      // Ensure polygon is closed
      const first = pairs[0];
      const last = pairs[pairs.length - 1];
      const closed = first[0] === last[0] && first[1] === last[1] ? pairs : [...pairs, first];

      const feature: GeoJSON.Feature<GeoJSON.Polygon> = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [closed],
        },
      };

      const data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
        type: "FeatureCollection",
        features: [feature],
      };

      mapRef.current!.addSource("mission-area", {
        type: "geojson",
        data,
      });

      mapRef.current!.addLayer({
        id: "mission-area-fill",
        type: "fill",
        source: "mission-area",
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.35,
        },
      });

      mapRef.current!.addLayer({
        id: "mission-area-outline",
        type: "line",
        source: "mission-area",
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
      });

      // Fit bounds to polygon
      const bounds = new mapboxgl.LngLatBounds();
      closed.forEach((c) => bounds.extend(c as [number, number]));
      mapRef.current!.fitBounds(bounds, { padding: 40, animate: false });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-3 border-b border-border">
        <h1 className="text-xl font-semibold">Mission Area Preview</h1>
      </header>
      <main className="p-0">
        <div ref={mapContainer} className="w-full h-[calc(100vh-56px)]" />
      </main>
    </div>
  );
};

export default ShareMission;
