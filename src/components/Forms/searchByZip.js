import React from 'react'
import {useState} from 'react'
import { byCountry } from 'country-code-lookup';
export const ZipForm = (props) => 
{
    // to get the zip and country name
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [zipError, setZipError] = useState(false);
    const [countryError, setCountryError] = useState(false);
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
    return (
            <form onSubmit={handler}>
                <label htmlFor='zip' className="form-label">ZipCode</label>
                <input id="zip" type={'text'} className="form-control mb-3" onChange={(e)=>{setZipError(false);setZip(e.target.value)}} value={zip}/>
                {zipError===true && <p style={{color:'red'}}>Please enter valid zipcode</p>}           
                <label htmlFor='country' className="form-label">Country</label>
                <input id="country" type={'text'} className="form-control mb-3" onChange={(e)=>{setCountryError(false);setCountry(e.target.value)}} value={country}/>
                {countryError===true && <p style={{color:'red'}}>Please enter country</p>}           
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
    )
}
