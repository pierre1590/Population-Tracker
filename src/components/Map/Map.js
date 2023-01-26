import { MapContainer,  TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './map.css';






export const Map = ({lat,lng,area}) => {
 

  const key = lat + ':' + lng;

if(area < 1500) {
  return (
    <MapContainer
      key={key}
      center={[lat,lng]}
      zoom={15}
      scrollWheelZoom={false}
      className='map-leaflet' 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
     
    </MapContainer>
  );
} else {
  return (
    <MapContainer
      key={key}
      center={[lat,lng]}
      zoom={5}
      scrollWheelZoom={false}
      className='map-leaflet' 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
     
    </MapContainer>
  );
}
}





 
    





   



