import React from 'react'
import {useState} from 'react'
import { byCountry } from 'country-code-lookup';
import classes from './location.module.css'
export const ZipForm = (props) => 
{
    // to get the zip and country name
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [zipError, setZipError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    // this state is used to display the autocomplete list
    const [options, setOptions] = useState([]);
    // passing the zip and country name to the api
    const handler=(e)=>
    {
        // prevents the form from getting submitted
        e.preventDefault();
        // if both are empty raise both errors
        if(zip.length === 0 && country.length===0)
        {
            setZipError(true);
            setCountryError(true);
            return;
        }
        // if zip is empty raise zip error
        else if (zip.length === 0 && country.length !== 0)
        {
            setZipError(true);
            return;
        }
        // if country is empty raise country error
        else if (zip.length !== 0 && country.length === 0 )
        {
            setCountryError(true);
            return;
        }
        // get the country code with country name
        const {iso2}=byCountry(country);
        props.onGet(iso2,zip);

    }
    // autoComplete function
    const autoComplete = async (e) => {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=country&autocomplete=true&access_token=pk.eyJ1IjoiYmVuc29uY3I3IiwiYSI6ImNsMGgxbHBwNjAyb3Qzb28yYno4ZzA1YWYifQ.JP1IaQwIySVQy5JZ8--aVg`);
        const data = await res.json();
        // if the output array and input entered by the user are empty raise an error
        if(data.features.length===0 && data.query.length!==0)
        {
            setCountryError(true);
        }
        // display the result from autocomplete api
        return setOptions(data.features)
    }

    return (
        <>
            <form onSubmit={handler} className="d-inline">
                <label htmlFor='zip' className="form-label">ZipCode</label>
                <input id="zip" type={'text'} className="form-control mb-3" onChange={(e)=>{setZipError(false);setZip(e.target.value)}} value={zip}/>
                {zipError===true && <p style={{color:'red'}}>Please enter valid zipcode</p>}           
                <label htmlFor='country' className="form-label">Country</label>
                <input id="country" type={'text'} className={`form-control ${options.length===0 && "mb-3"}`} onChange={(e)=>{setCountryError(false);autoComplete(e);setCountry(e.target.value)}} autoComplete="off" value={country}/>
                {countryError===true && <p style={{color:'red'}}>Please enter country</p>}           
                {
                    options.length!==0 && 
                    <ul className={`card text-dark ${classes['option-list']}`}>
                        {
                            options.map((ele,i)=>
                            <div className='p-2' key={i} onClick={()=>{setCountry(ele.place_name);setOptions([])}}>
                                {ele.place_name}
                            </div>)
                        }
                    </ul>
                }
                <button type='submit' className='btn btn-primary me-3'>Submit</button>
            </form>
            <button className='btn btn-danger d-inline' onClick={()=>{setCountry(''); setZip('');}}>Clear</button>
        </>
    )
}
