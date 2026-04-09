import { useEffect, useRef } from 'react';

// Proper Google Maps types
interface GoogleMapProps {
  apiKey: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  markerTitle?: string;
}

// Google Maps type definitions
interface GoogleMapsMap {
  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
}

interface GoogleMapsMarker {
  setPosition: (position: { lat: number; lng: number }) => void;
  setMap: (map: GoogleMapsMap | null) => void;
  setTitle: (title: string) => void;
}

interface GoogleMapsConstructor {
  Map: new (
    container: HTMLElement,
    options: {
      center: { lat: number; lng: number };
      zoom: number;
      styles?: Array<{
        featureType: string;
        elementType: string;
        stylers: Array<{ [key: string]: string | number }>;
      }>;
    }
  ) => GoogleMapsMap;
  Marker: new (options: {
    position: { lat: number; lng: number };
    map: GoogleMapsMap;
    title: string;
    animation: number;
  }) => GoogleMapsMarker;
  Animation: {
    DROP: number;
  };
}

interface GoogleMapsWindow extends Window {
  google?: {
    maps?: GoogleMapsConstructor;
  };
  initMap?: () => void;
}

export function GoogleMap({ 
  apiKey, 
  center = { lat: 37.7749, lng: -122.4194 },
  zoom = 15,
  markerTitle = "EveryTech HQ"
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const win = window as GoogleMapsWindow;
    const existingScript = document.getElementById('google-maps-script');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      win.initMap = () => {
        if (mapRef.current && win.google?.maps) {
          const maps = win.google.maps;
          
          const map = new maps.Map(mapRef.current, {
            center,
            zoom,
            styles: [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#1a1a2e" }]
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#1a1a2e" }]
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#8b8b9a" }]
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#2d2d44" }]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#161625" }]
              }
            ]
          });

          new maps.Marker({
            position: center,
            map,
            title: markerTitle,
            animation: maps.Animation.DROP
          });
        }
      };
    } else if (win.google?.maps && mapRef.current) {
      win.initMap?.();
    }
  }, [apiKey, center, zoom, markerTitle]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[300px] rounded-xl border border-border overflow-hidden"
    />
  );
}