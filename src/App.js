import SearchBar from './components/SearchBar/SearchBar.js';
import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [countries,setCountries]= useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  
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

//Save the search informations in the selected state
  useEffect(() => {
    const selectedCountry = countries.find((country) => country.name === search);
    if (selectedCountry) {
      setSelected(selectedCountry);
    }
  }, [search, countries]);

   if(search === 0 ){
    setFilteredCountries('');
    
   }
   
  



  return (
    <>
      <div>
        <SearchBar value={search} onChange={onChange} />
        {
          <ul className="list">
            {search.length > 0 &&
              filteredCountries.map((country) => (
                <li key={country.name} onClick={() => handleSelect(country)}>
                  {country.name}
                </li>
              ))}
          </ul>
        }
      </div>
      <div className="info-container">
        <div>
          {/*If flagi there is shows it otherwise flag not available */}
          {selected.flag ? (
            <img
              src={selected.flag}
              alt="flag"
              width={180}
              height={120}
              className="flag"
            />
          ) : (
            <p> </p>
          )}
        </div>
        <div>
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
          <p className="item">
            Timezone:{" "}
            {selected.timezones &&
              selected.timezones.map((timezone) => timezone)}
          </p>
          <p className="item">Region: {selected.region}</p>
          {/*if languages are two use 'and' otherwise use ',' and at end 'and'*/}
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
          {/*Currency in format: Euro - (€) */}
          <p className="item">
            Currencies:{" "}
            {selected.currencies &&
              selected.currencies.map(
                (currency) => currency.name + " - (" + currency.symbol + ")"
              )}
          </p>
        </div>
        <div className="map">

        </div>
      </div>
    </>
  );
}

export default App;
