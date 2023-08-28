"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from 'maplibre-gl';
import { useTheme } from "next-themes";

/* <html>
  <head>
    <link href="https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.css" rel="stylesheet" />
    <style>
      body { margin: 0; }
      #map { height: 100vh; }
    </style>
  </head>
  <body>
    <div id="map" />
    <script src="https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.js"></script>
    <script>
      const apiKey = "v1.public.eyJqdGkiOiJjNjlkMWZkNi1hZGRlLTQ3NDQtOGY4Mi1iNzYxMzNmNjExZjkifTC5pVAwZG-Y2Y56HU6DWHQtwuyFBBoEllfCyb7qUsYT3J7iX4VOtwNZ80uDqA-iSrOsfMUl47JGpQa9ct9pJMtgbQCa9_W6djtaJjI42zaVZdO9S04m9MX3mxT-tP99GiYt-WpCrg97ydCakcA6pOmDDgdm1E8tbsAWhloWa31GRTyAVtRM-mpY1zhlPxH0aSwEbyVq5fR4eZqR7gSHWKOtLPDQUTqw73_uuQYweGuu6eHRAwRWZuzQm9JRPD68uHTdb55SqAyMJAH5LWhyNJBhb9dPnu36H1V6-Hn-H-qmHD6uD70xB6DYRGatnuxpE4omopICDG5ncoivMe8S1UQ.ZWU0ZWIzMTktMWRhNi00Mzg0LTllMzYtNzlmMDU3MjRmYTkx";
      const mapName = "livebus-dark-maps";
      const region = "us-east-1";

      const map = new maplibregl.Map({
        container: "map",
        style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
        center: [-123.115898, 49.295868],
        zoom: 11,
      });
      map.addControl(new maplibregl.NavigationControl(), "top-left");
    </script>
  </body>
</html>
 */

export function Maps() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<Map>();
    const [lng] = useState(-46.62);
    const [lat] = useState(-23.53);
    const { systemTheme } = useTheme();
    const [mapsTheme, setMapsTheme] = useState(systemTheme);
    const [zoom] = useState(13);
    const [API_KEY] = useState(process.env.NEXT_PUBLIC_MAPS_API_KEY);

    useEffect(() => {
        if (!map) return;
        if (map.current || !mapContainer.current) return; // stops map from intializing more than once

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://maps.geo.us-east-1.amazonaws.com/maps/v0/maps/livebus-${systemTheme}-maps/style-descriptor?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom
        })
    }, [API_KEY, lng, lat, zoom, systemTheme]);


    useEffect(() => {
        if (map.current) {
            map.current.setStyle(`https://maps.geo.us-east-1.amazonaws.com/maps/v0/maps/livebus-${systemTheme}-maps/style-descriptor?key=${API_KEY}`)
        }
    }, [systemTheme, API_KEY])

    return (
        <div ref={mapContainer} className="absolute top-0 left-0 w-full h-full" />
    )
}