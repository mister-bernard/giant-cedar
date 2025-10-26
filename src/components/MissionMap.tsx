import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Crosshair } from "lucide-react";

const MAPBOX_TOKEN = "pk.eyJ1IjoiYXNkZmZkc2E1NSIsImEiOiJjbWg4N2UxdzEweHZoMndvYTh5enlxNW83In0.hgsVonD6F9foyMQdXbeUFQ";

export const MissionMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [8.2275, 46.8182], // Swiss Alps
      zoom: 8,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("click", (e) => {
      if (marker) {
        marker.remove();
      }

      const newMarker = new mapboxgl.Marker({ color: "#000000" })
        .setLngLat(e.lngLat)
        .addTo(map.current!);

      setMarker(newMarker);
      toast(`Location selected: ${e.lngLat.lat.toFixed(4)}, ${e.lngLat.lng.toFixed(4)}`);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

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
      </div>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};
