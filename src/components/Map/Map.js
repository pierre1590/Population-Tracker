import { MapContainer,  TileLayer,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './map.css';
import countries from '../../data/countryBorders.geo.json';







export const Map = ({lat,lng,area,nameCountry,iso}) => {
 

  const key = lat + ':' + lng;



// find a country with the compare name country or with ISO
const country = countries.features.find(
  (country) => country.properties.name === nameCountry || country.properties.iso_a3 === iso
);


console.log(countries);



if(area < 15000) {
  return (
    <MapContainer
      key={key}
      center={[lat,lng]}
      zoom={13}
      scrollWheelZoom={false}
      className='map-leaflet' 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON 
        data={country} 
        style={{
          color: 'red',
          weight: 1,
          fillColor: 'red',
          fillOpacity: 0.1
        }} 
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
    <GeoJSON 
        data={country} 
        style={{
          color: 'red',
          weight: 1,
          fillColor: 'red',
          fillOpacity: 0.1
        }} 
      />
    </MapContainer>
  );
}
}





 
    





   



