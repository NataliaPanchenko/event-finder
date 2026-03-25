import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function EventsMap() {
  const locations = [
    { _id: "1", name: "Event 1", lat: 52.52, lng: 13.405 },
    { _id: "2", name: "Event 2", lat: 52.525, lng: 13.41 },
    { _id: "3", name: "Event 3", lat: 52.515, lng: 13.42 },
  ];

  const center = [52.52, 13.405];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {locations.map((loc) => (
        <Marker key={loc._id} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
