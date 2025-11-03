"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
}

export default function GoogleMap({ center, zoom = 13 }: GoogleMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any | null>(null); // holds google.maps.Map instance
  const markerRef = useRef<any | null>(null); // holds AdvancedMarkerElement instance

  const [currentLocation, setCurrentLocation] = useState(center ?? null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1) Determine location (center or geolocation fallback)
  useEffect(() => {
    if (center) {
      setCurrentLocation(center);
      return;
    }

    if (!("geolocation" in navigator)) {
      setCurrentLocation({ lat: 12.971563, lng: 79.1662783 }); // fallback NYC
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setCurrentLocation({ lat: 40.7128, lng: -74.006 }); // fallback
      }
    );
  }, [center]);

  // 2) Initialize Google Maps using the new functional API
  useEffect(() => {
    if (!containerRef.current) return;
    if (!currentLocation) return;
    if (mapInstanceRef.current) return; // already initialized

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        // Must expose the key to client: NEXT_PUBLIC_...
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in environment.");
        }

        // Configure the loader (functional API)
        setOptions({
          key: apiKey,
          v: "weekly",
          // we're going to import the marker library below
          libraries: ["marker"],
        });

        // import the maps module
        // importLibrary's TS types might be awkward across versions — cast to any to keep TS happy
        const mapsModule = await (importLibrary as any)("maps");
        const markerModule = await (importLibrary as any)("marker");

        // Extract constructors (use any to avoid TS mismatch if types are missing)
        const MapCtor = (mapsModule as any).Map ?? (mapsModule as any).default ?? (mapsModule as any).maps?.Map;
        const AdvancedMarkerElement = (markerModule as any).AdvancedMarkerElement ?? (markerModule as any).default;

        if (!MapCtor) throw new Error("Could not find Map constructor from imported library.");
        if (!AdvancedMarkerElement) {
          // It's okay if AdvancedMarkerElement is not available; we'll still create a simple marker fallback
          console.warn("AdvancedMarkerElement not found; using fallback marker if available.");
        }

        // create map
        const map = new MapCtor(containerRef.current!, {
          center: currentLocation,
          zoom,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;

        // create marker (prefer AdvancedMarkerElement, else use google.maps.Marker if available)
        if (AdvancedMarkerElement) {
          markerRef.current = new AdvancedMarkerElement({
            map,
            position: currentLocation,
            title: "Current Location",
          });
        } else if ((window as any).google?.maps?.Marker) {
          markerRef.current = new (window as any).google.maps.Marker({
            map,
            position: currentLocation,
            title: "Current Location",
          });
        }

        if (!cancelled) setIsLoading(false);
      } catch (err: any) {
        console.error("Error initializing Google Maps:", err);
        if (!cancelled) {
          setError(err?.message ?? String(err));
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      // Optionally clean up map & marker
      // There is no explicit 'destroy' on map, but removing references helps GC
      markerRef.current = null;
      mapInstanceRef.current = null;
    };
  }, [currentLocation, zoom]);

  // 3) If center prop changes after initialization, update map center & marker
  useEffect(() => {
    if (!mapInstanceRef.current || !center) return;
    const map = mapInstanceRef.current;
    map.setCenter(center);
    if (markerRef.current) {
      // AdvancedMarkerElement uses .position, google.maps.Marker uses .setPosition
      if (markerRef.current.setPosition) {
        markerRef.current.setPosition(center);
      } else {
        markerRef.current.position = center;
      }
    }
  }, [center]);

  return (
    <div className="w-full h-full rounded-lg shadow-md relative">
      <div ref={containerRef} className="w-full h-full" style={{ minHeight: "400px" }} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
          <div className="text-gray-600">Loading map...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100/50">
          <div className="text-red-600 p-4 bg-white rounded shadow">
            Error loading map: {error}
          </div>
        </div>
      )}
    </div>
  );
}
