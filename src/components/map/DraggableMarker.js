import axios from "axios";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Marker } from "react-leaflet";
import { useDispatch } from "react-redux";
import { changeAddress } from "../../redux-data/actions/addressAction";
function DraggableMarker() {
  const [position, setPosition] = useState({ lat:35.653, lng: 51.359 });
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`
      )
      .then((res) => dispatch(changeAddress( res.data.address.city ,res.data.address.road)))
      .catch((err) => console.log(err));
  }, [position , dispatch]);

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

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

export default React.memo(DraggableMarker);
