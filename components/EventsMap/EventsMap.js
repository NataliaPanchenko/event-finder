import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import styled from "styled-components";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function FlyToUser({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 13, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
}

export default function EventsMap({ events }) {
  const [userLocation, setUserLocation] = useState(null);
  const center = [52.52, 13.405];

  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [25, 25],
  });

  const validEvents = Array.isArray(events)
    ? events.filter(
        (event) =>
          typeof event.lat === "number" && typeof event.lng === "number"
      )
    : [];

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      <Title>Event&apos;s location</Title>

      <FindMeButton
        onClick={getUserLocation}
        style={{
          marginBottom: "10px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Find me 📍
      </FindMeButton>

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <FlyToUser location={userLocation} />

        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>You are here 📍</Popup>
          </Marker>
        )}

        {validEvents.map((event) => (
          <Marker key={event._id} position={[event.lat, event.lng]}>
            <Popup>{event.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

const FindMeButton = styled.button`
  margin-left: 10px;
  border-radius: 20px;
  border: none;
  background-color: #4496cf;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #357ab8;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 10px;
  text-align: center;
`;
