import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export const MapLeaflet = ({
  issues = [],
  onSelectIssue,
  onMapClick,
  selectedIssueId,
  interactivePinPlacement = false,
  pinnedCoords,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const pinMarkerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let resizeObserver = null;

    if (!mapInstanceRef.current) {
      // Default to Kathmandu center (27.7007, 85.3240)
      const map = L.map(mapContainerRef.current, {
        center: [27.7007, 85.324],
        zoom: 13,
        zoomControl: false,
        tap: true,
        touchZoom: true,
      });

      // Add clean CartoDB / OSM tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }).addTo(map);

      // Custom zoom control in bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Invalidate size on load and on container resize
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);

      // Handle map click
      map.on('click', (e) => {
        if (onMapClick) {
          onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
        }
      });

      // ResizeObserver to automatically resize map when container size changes
      if (window.ResizeObserver && mapContainerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        });
        resizeObserver.observe(mapContainerRef.current);
      }
    }

    const handleWindowResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    issues.forEach((issue) => {
      const isSelected = issue.id === selectedIssueId;
      const isCritical = issue.severity === 'critical';
      const isResolved = issue.status === 'resolved';

      // Pin Color
      let markerColor = '#031635';
      if (isResolved) markerColor = '#2e7d32';
      else if (isCritical) markerColor = '#ba1a1a';
      else if (issue.category === 'waste') markerColor = '#ba1a1a';
      else if (issue.category === 'traffic') markerColor = '#e65100';
      else if (issue.category === 'power') markerColor = '#d97706';
      else if (issue.category === 'water') markerColor = '#0284c7';

      const customIcon = L.divIcon({
        className: 'custom-civic-marker',
        html: `
          <div style="
            position: relative;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${isSelected ? '38px' : '30px'};
            height: ${isSelected ? '38px' : '30px'};
            background-color: ${markerColor};
            color: white;
            border-radius: 50%;
            border: 2.5px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <span style="font-size: 11px; font-weight: 700;">${
              issue.category === 'waste'
                ? '🗑'
                : issue.category === 'traffic'
                ? '🚗'
                : issue.category === 'power'
                ? '⚡'
                : issue.category === 'water'
                ? '💧'
                : issue.category === 'roads'
                ? '🚧'
                : '📍'
            }</span>
            ${
              isCritical
                ? `<span style="
                position: absolute;
                top: -4px;
                right: -4px;
                width: 10px;
                height: 10px;
                background-color: #ba1a1a;
                border: 2px solid white;
                border-radius: 50%;
                animation: pulse 1.5s infinite;
              "></span>`
                : ''
            }
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([issue.coordinates.lat, issue.coordinates.lng], {
        icon: customIcon,
      });

      marker.on('click', () => {
        if (onSelectIssue) {
          onSelectIssue(issue);
        }
      });

      // Add popup on hover/click
      marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; padding: 4px;">
          <p style="font-size: 11px; font-weight: 700; color: #75777f; margin: 0 0 2px 0;">#${issue.trackingNumber}</p>
          <h4 style="font-size: 13px; font-weight: 700; margin: 0 0 4px 0; color: #1b1b1e;">${issue.title}</h4>
          <p style="font-size: 11px; color: #545f72; margin: 0 0 6px 0;">${issue.locationName}</p>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 10px; font-weight: 700; background: #efedf0; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">${issue.status.replace('_', ' ')}</span>
            <span style="font-size: 10px; font-weight: 700; color: #031635;">Impact: ${issue.impactScore}/100</span>
          </div>
        </div>
      `);

      markersGroup.addLayer(marker);
    });

    // Pinned placement marker (during report wizard)
    if (interactivePinPlacement && pinnedCoords) {
      if (pinMarkerRef.current) {
        pinMarkerRef.current.setLatLng([pinnedCoords.lat, pinnedCoords.lng]);
      } else {
        const pinIcon = L.divIcon({
          className: 'report-placement-pin',
          html: `
            <div style="
              width: 36px;
              height: 36px;
              background-color: #ba1a1a;
              color: white;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg) translate(-50%, -50%);
              border: 3px solid white;
              box-shadow: 0 6px 16px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="transform: rotate(45deg); font-size: 14px;">📍</span>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });

        const pinMarker = L.marker([pinnedCoords.lat, pinnedCoords.lng], {
          icon: pinIcon,
          draggable: true,
        }).addTo(map);

        pinMarker.on('dragend', (e) => {
          const newPos = e.target.getLatLng();
          if (onMapClick) {
            onMapClick({ lat: newPos.lat, lng: newPos.lng });
          }
        });

        pinMarkerRef.current = pinMarker;
      }
    }
  }, [issues, selectedIssueId, pinnedCoords, interactivePinPlacement]);

  return (
    <div id="mapLeafletContainer" className="w-full h-full relative rounded-2xl overflow-hidden shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
