import React from 'react'
import {useState} from 'react';
import classes from './location.module.css'

const LocationForm = (props) => 
{
    // this state is used to get the location name when the use clicks one of the options
    const [location, setLocation] = useState('');
    // this state is used to get the coordinates when the use clicks one of the options
    const [coordinates, setCoordinates] = useState([]);
    // this state is used to display the autocomplete list
    const [options, setOptions] = useState([]);
    
    const [error,setError]=useState(false);
    // form submit handler
    const handler=(e)=>
    {
        // to prevent the page from reloading
        e.preventDefault();
        if(location.trim.length===0 && coordinates.length===0)
        {
            setError(true);
            return
        } 
        // passing the data to the weather data getter function
        props.onGet(location,coordinates);
        setLocation('');
    }
    // autoComplete function
    const autoComplete=async(e)=>
    {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=place%2Cpostcode%2Caddress%2Ccountry%2Clocality%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiYmVuc29uY3I3IiwiYSI6ImNsMGgxbHBwNjAyb3Qzb28yYno4ZzA1YWYifQ.JP1IaQwIySVQy5JZ8--aVg`);
        const data=await res.json();
        setOptions(data.features)
    }
    
    return (
        <form onSubmit={handler} autoComplete={'off'}>
            <label  htmlFor='location' className="form-label">Location</label>
            <input type={'text'} id="location" className={`form-control ${options.length===0 && "mb-3"}`} onChange={(e)=>{setError(false); autoComplete(e); setLocation(e.target.value)}} autoComplete={`off`} value={location} />
            {error===true && <p style={{color:'red'}}>Please enter location</p>}           
            {options.length!==0 && <ul className={`card text-dark ${classes['option-list']}`}>
                {options.map((ele,i)=><div className='p-2' key={i} onClick={()=>{setLocation(ele.place_name);setCoordinates(ele.center);setOptions([])}}>{ele.place_name}</div>)}
            </ul>}

            <button className='btn btn-primary'>Submit</button>
        </form>
    )
}


export default LocationForm