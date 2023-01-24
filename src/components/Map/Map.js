import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './map.css';





export const Map = ({lat,lng}) => {
 

  const key = lat + ':' + lng;

 
  
 
    return (
      <>
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
      </>
    );
}


