import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { MdLocationOn, MdGpsFixed } from "react-icons/md";
import { IconContext } from "react-icons";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import React, { useState } from "react";
import DraggableMarker from "./DraggableMarker";
import LocationMarker from "./LocationMarker";
import { useSelector } from "react-redux";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
const MapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => (props.mode === "dark" ? "white" : "black")};
  label {
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 100;
    text-align: right;
  }
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;

    i {
      position: relative;
      bottom: 1px;
      margin-left: 5px;
    }
  }
`;
const MapMYLocation = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 999;
  cursor: pointer;
  i {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function MapUser() {
  const [clickGps, setclickGps] = useState(false);
  const address = useSelector((state) => state.address);
  const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      <MapHeader mode={mode}>
        <h3>
          <i>
            <IconContext.Provider value={{ size: "24px" }}>
              <MdLocationOn />
            </IconContext.Provider>
          </i>
          انتخاب مقصد
        </h3>
        <label>
          آدرس تحویل فعلی : {address.city} ، خیابان {address.road}
        </label>
      </MapHeader>
      <MapContainer
        center={[35.653, 51.359]}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: "450px", zIndex: 5, position: "relative" }}
        className="shadow rounded"
      >
        <TileLayer
          attribution=""
          url="https://maps.omniscale.net/v2/nc-restaurant-738743ee/style.grayscale/{z}/{x}/{y}.png"
        />
        {clickGps ? <LocationMarker /> : <DraggableMarker />}

        <MapMYLocation onClick={() => setclickGps(true)}>
          <i>
            <IconContext.Provider value={{ size: "26px" }}>
              <MdGpsFixed />
            </IconContext.Provider>
          </i>
        </MapMYLocation>
      </MapContainer>
    </>
  );
}

export default MapUser;
