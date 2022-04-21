import React from 'react'
import {useState} from 'react'
import { byCountry } from 'country-code-lookup';
export const ZipForm = (props) => 
{
    // to get the zip and country name
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    // passing the zip and country name to the api
    const handler=(e)=>
    {
        e.preventDefault();
        // get the countru code with country name
        const {iso2}=byCountry(country)
        props.onGet(iso2,zip);
        setZip('');
        setCountry('');
    }
    return (
            <form onSubmit={handler}>
                <lable htmlFor='zip' className="form-label">ZipCode</lable>
                <input id="zip" type={'text'} className="form-control mb-3" onChange={(e)=>setZip(e.target.value)} value={zip}/>
                <label htmlFor='country' className="form-label">Country</label>
                <input id="country" type={'text'} className="form-control mb-3" onChange={(e)=>setCountry(e.target.value)} value={country}/>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
    )
}
