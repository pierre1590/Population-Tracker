import SearchBar from './components/SearchBar/SearchBar.js';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Col,Row,Container } from 'react-bootstrap';
import {Map} from './components/Map/Map.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [countries,setCountries]= useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
 
  //Save latitude and longitude values for selected country
  const lat = selected.latlng && selected.latlng[0];
  const lng = selected.latlng && selected.latlng[1];
 
  
  console.log(countries)
 //Take data from API with useEffect, async/await and try/catch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
        console.log(setCountries);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

 

  const handleSelect = (country) => {
    setSearch(country.name);
    setFilteredCountries([]);
  }
  const onChange = (e) => {
    setSearch(e.target.value);
    const updatedCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCountries(updatedCountries);
  };

//Save the search informations in the selected state and save lat and lng values
  useEffect(() => {
    const selectedCountry = countries.find((country) => country.name === search);
    if (selectedCountry) {
      setSelected(selectedCountry);
    }
  }, [search, countries]);

   if(search === 0 ){
    setFilteredCountries('');
   }
   
  
  

console.log(lat,lng)

  return (
    <>
      <div>
        <SearchBar value={search} onChange={onChange} />
        {<div className="overlay">
          <ul className="list ">
            {search.length > 0 &&
              filteredCountries.map((country) => (
                <li key={country.name} onClick={() => handleSelect(country)}>
                  {country.name}
                </li>
              ))}
          </ul>
        </div>
        }
      </div>

        {/*Create layout of 1 row and three columns with Bootstrap */}
        <Container className="container">
        <Row>
        <Col>
        <div className="info-container">
        <div className='country-flag'>
          {/*If flagi there is shows it otherwise flag not available */}
          {selected.flag ? (
            <img
              src={selected.flag}
              alt="flag"
              width={240}
              height={180}
              className="flag"
            />
          ) : (
            <p> </p>
          )}
        </div>
        </div>
        </Col>
        <Col>
        <div className="info">
          <h1>{selected.name}</h1>
          <p className="item">Capital: {selected.capital}</p>
          {/*Convert population with Number */}
          <p className="item">
            Population:{" "}
            {selected.population &&
              Number(selected.population).toLocaleString("en") + " ab."}
          </p>
          {/*Calculate ab/Km^2 per square km */}
          <p className="item">
            Density:{" "}
            {selected.population && selected.area
              ? Number(selected.population / selected.area).toLocaleString("en") +
                " ab./Km²"
              : " "}
          </p>
          <p className="item">
            Area:{" "}
            {selected.area &&
              Number(selected.area).toLocaleString("en") + " km²"}
          </p>
          <p className="item">Region: {selected.region}</p>
          <p className="item">
          Timezone:{" "}
            {selected.timezones &&
             selected.timezones.length > 1
              ? selected.timezones
                  .map((timezone) => timezone)
                  .join(", ")
                  .replace(/,(?!.*,)/gim, " and")
              : selected.timezones &&
                selected.timezones.map((timezone) => timezone)}
          </p>
          <p className="item">
            Languages:{" "}
            {selected.languages && selected.languages.length > 1
              ? selected.languages
                  .map((language) => language.name)
                  .join(", ")
                  .replace(/,(?!.*,)/gim, " and")
              : selected.languages &&
                selected.languages.map((language) => language.name)}
          </p>
          <p className="item">
          Currency:{" "}
            {selected.currencies &&
              selected.currencies.map(
                (currency) => currency.name + " - (" + currency.symbol + ")"
              )}
          </p>
        </div>
        </Col>
        <Col>
        <div className="map">
        {selected.latlng ? (
            <Map lat={lat} lng={lng}  />
          ) : (
            ''
          )}
        </div>
        </Col>
        </Row>
        </Container>
    </>
  );
}


     
export default App;
