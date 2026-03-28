import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Tooltip } from "react-leaflet";
import { getDate } from "../EventsList/EventItem/EventItem";

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

  const router = useRouter();

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

  return (
    <>
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
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
        />

        <FlyToUser location={userLocation} />

        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={0.9}
              permanent={false}
            >
              You are here 📍
            </Tooltip>
          </Marker>
        )}

        {validEvents.map((event) => (
          <Marker
            key={event._id}
            position={[event.lat, event.lng]}
            eventHandlers={{ click: () => router.push(`/events/${event._id}`) }}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={0.9}
              permanent={false}
            >
              <b>{event.title}</b>
              <br />
              {event.location.name}
              <br />
              {getDate(event.date)}
              <br />€{event.price}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

const FindMeButton = styled.button`
  border-radius: 20px;
  border: none;
  background-color: var(--main-color);
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.2s;
  position: absolute;
  right: 25px;
  bottom: 25px;
  &:hover {
    background-color: var(--main-hover-color);
  }
`;
