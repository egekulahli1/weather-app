import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL,geoApiOptions } from "../../api";

function Search({onSearchChange}){

    const [search, setSearch] = useState(null);
    
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    const loadOptions =(inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=500000&namePrefix=${inputValue}`, geoApiOptions)
        .then(response => response.json())
        .then((response) =>{
            return {
                options : response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    };
            }),
        };
    })
        .catch(err => console.error(err));
    };   

    
    return (
        <AsyncPaginate
            placeholder="Search for a city..."
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            />
        );

    }

export default Search;