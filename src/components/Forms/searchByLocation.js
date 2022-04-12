import React from 'react'
import {useState} from 'react';
import classes from './location.module.css'

const LocationForm = (props) => 
{
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [options, setOptions] = useState([]);
    // const [state, setState] = useState('');
    // const [country, setCountry] = useState('');
    const handler=(e)=>
    {
        e.preventDefault();
        props.onGet(location,coordinates);
        setLocation('');
        // setState('');
        // setCountry('');
    }
    const changeHandler=async(e)=>
    {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=place%2Cpostcode%2Caddress%2Ccountry%2Clocality%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiYmVuc29uY3I3IiwiYSI6ImNsMGgxbHBwNjAyb3Qzb28yYno4ZzA1YWYifQ.JP1IaQwIySVQy5JZ8--aVg`);
        const data=await res.json();
        setOptions(data.features)
    }
    return (
        <form onSubmit={handler} autoComplete={'off'}>
            <lable  htmlFor='location' className="form-label">Location</lable>
            <input type={'text'} id="location" className={`form-control ${options.length===0 && "mb-3"}`} onChange={(e)=>{changeHandler(e); setLocation(e.target.value)}} autoComplete={`off`} value={location} />
            
            {options.length!==0 && <ul className={`card ${classes['option-list']}`}>
                {options.map((ele,i)=><div className='p-2' key={i} onClick={()=>{setLocation(ele.place_name);setCoordinates(ele.center);setOptions([])}}>{ele.place_name}</div>)}
            </ul>}

            <button className='btn btn-primary'>Submit</button>
            
            {/* <label htmlFor='state' className="form-label">State</label>
            <input id="state" type={'text'} className="form-control mb-3" onChange={(e)=>setState(e.target.value)} value={state}/>
  
            <label htmlFor='country' className="form-label">Country</label>
            <input id="country" type={'text'} className="form-control mb-3" onChange={(e)=>setCountry(e.target.value)} value={country}/> */}
  
        </form>
    )
}


export default LocationForm