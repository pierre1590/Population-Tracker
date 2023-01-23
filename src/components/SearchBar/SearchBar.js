
import React from 'react';
import './searchbar.css';


const SearchBar = ({value,onChange}) => {   

    
    return (
        <>
        <div>
        <input 
            type="search"
            value={value}
            onChange={onChange} 
            placeholder="Search for a country"
            className='searchbar'
        />
        </div>
        </>
    )
    }

export default SearchBar;