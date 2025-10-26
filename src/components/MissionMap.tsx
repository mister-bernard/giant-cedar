import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Crosshair, Square } from "lucide-react";

const MAPBOX_TOKEN = "pk.eyJ1IjoiYXNkZmZkc2E1NSIsImEiOiJjbWg4N2UxdzEweHZoMndvYTh5enlxNW83In0.hgsVonD6F9foyMQdXbeUFQ";

interface MissionMapProps {
  onAreaSelect: (bounds: number[][] | null) => void;
}

export const MissionMap = ({ onAreaSelect }: MissionMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-116.5668, 47.6777], // Northern Idaho (Coeur d'Alene area)
      zoom: 7,
    });

    // Initialize drawing control
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      modes: {
        ...MapboxDraw.modes,
      },
    });

    map.current.addControl(draw.current);
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Listen for drawing events
    map.current.on("draw.create", updateArea);
    map.current.on("draw.delete", deleteArea);
    map.current.on("draw.update", updateArea);

    map.current.on("click", (e) => {
      if (!isDrawing && marker) {
        marker.remove();
      }

      if (!isDrawing) {
        const newMarker = new mapboxgl.Marker({ color: "#000000" })
          .setLngLat(e.lngLat)
          .addTo(map.current!);

        setMarker(newMarker);
        toast(`Location selected: ${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)}`);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    // Update drawing mode
    if (draw.current && map.current) {
      if (isDrawing) {
        draw.current.changeMode("draw_polygon");
      } else {
        draw.current.changeMode("simple_select");
      }
    }
  }, [isDrawing]);

  function updateArea() {
    const data = draw.current?.getAll();
    if (data && data.features.length > 0) {
      const feature = data.features[0];
      if (feature.geometry.type === "Polygon") {
        const coordinates = feature.geometry.coordinates[0];
        onAreaSelect(coordinates);
        toast("Area selected successfully");
      }
    }
  }

  function deleteArea() {
    onAreaSelect(null);
    toast("Area cleared");
  }

  const handleGeocode = async () => {
    if (!address || !map.current) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.current.flyTo({ center: [lng, lat], zoom: 14 });

        if (marker) {
          marker.remove();
        }

        const newMarker = new mapboxgl.Marker({ color: "#000000" })
          .setLngLat([lng, lat])
          .addTo(map.current);

        setMarker(newMarker);
        toast(`Location found: ${data.features[0].place_name}`);
      }
    } catch (error) {
      toast.error("Failed to geocode address");
    }
  };

  const handleClearArea = () => {
    draw.current?.deleteAll();
    deleteArea();
    setIsDrawing(false);
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <Input
          type="text"
          placeholder="Enter address or location..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleGeocode()}
          className="bg-background/95 backdrop-blur border-border h-12 text-base"
        />
        <Button onClick={handleGeocode} size="lg" className="h-12">
          <Crosshair className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setIsDrawing(!isDrawing)}
          size="lg"
          variant={isDrawing ? "default" : "outline"}
          className="h-12"
        >
          <Square className="w-5 h-5" />
        </Button>
        {draw.current?.getAll().features.length > 0 && (
          <Button onClick={handleClearArea} size="lg" variant="outline" className="h-12">
            Clear Area
          </Button>
        )}
      </div>
      <div ref={mapContainer} className="absolute inset-0" />
      {isDrawing && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background/95 backdrop-blur px-8 py-4 rounded-lg border-2 border-primary shadow-xl max-w-md">
          <p className="text-base font-semibold mb-2 text-center">📍 Draw Your Mission Area</p>
          <p className="text-sm text-muted-foreground text-center">
            Click points on the map to outline your area, then double-click to finish
          </p>
        </div>
      )}
    </div>
  );
};
