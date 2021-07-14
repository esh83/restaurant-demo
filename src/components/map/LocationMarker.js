import axios from "axios";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useDispatch } from "react-redux";
import { changeAddress } from "../../redux-data/actions/addressAction";
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    position !== null &&
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`
        )
        .then((res) =>
          dispatch(
            changeAddress(
              res.data.address.city || res.data.address.town,
              res.data.address.road
            )
          )
        )
        .catch((err) => console.log(err));
  }, [position, dispatch]);

  const map = useMap();
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
    });

    map.on("moveend", function () {
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
    });
  }, [map]);

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

export default React.memo(LocationMarker);
