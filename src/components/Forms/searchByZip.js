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
        e.preventDefault();
        if(zip.length === 0 && country.length===0)
        {
            console.log(zip.length,country);
            setZipError(true);
            setCountryError(true);
            return;
        }
        else if (zip.length === 0 && country.length !== 0)
        {
            setZipError(true);
            return;
        }
        else if (zip.length !== 0 && country.length === 0)
        {
            setCountryError(true);
            return;
        }
        // get the countru code with country name
        const {iso2}=byCountry(country)
        props.onGet(iso2,zip);
        setZip('');
        setCountry('');
    }
    // autoComplete function
    const autoComplete = async (e) => {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=place%2Cpostcode%2Caddress%2Ccountry%2Clocality%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiYmVuc29uY3I3IiwiYSI6ImNsMGgxbHBwNjAyb3Qzb28yYno4ZzA1YWYifQ.JP1IaQwIySVQy5JZ8--aVg`);
        const data = await res.json();
        setOptions(data.features)
    }

    return (
            <form onSubmit={handler}>
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
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
    )
}
