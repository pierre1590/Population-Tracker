import SearchBar from './components/SearchBar/SearchBar.js';
import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [countries,setCountries]= useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  
  
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
  };

  const onChange = (e) => {
    setSearch(e.target.value);
    const updatedCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredCountries(updatedCountries);
  };



   





  return (
    <>
      <div>
        <SearchBar onChange={onChange} value={search}/>
        {
          <ul className="list">
            {search.length > 0 && filteredCountries.map((country) => (
              <li key={country.name} onClick={() => handleSelect(country)}>
                {country.name}
              </li>
            ))}
          </ul>
        } 
      </div>
      {/*Create a div to shows population, capital and currency information from the selected country from filteredCountries */}
      <div> 
        {filteredCountries.map((country) => (
          <div key={country.name}>  
            <h1>{country.name}</h1>
            <p>Population: {country.population}</p>
            <p>Capital: {country.capital}</p>
            <p>Currency: {country.currencies[0].name}</p>
          </div>
        ))}
      </div>
    
</>  
  )
}

export default App;
