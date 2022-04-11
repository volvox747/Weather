import React from 'react'
import {useState} from 'react';

const LocationForm = (props) => 
{
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [options, setOptions] = useState([]);
    const handler=(e)=>
    {
        e.preventDefault();
        props.onGet(location,coordinates);
        setLocation('');
    }
    const changeHandler=async(e)=>
    {
        const a = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=place%2Cpostcode%2Caddress%2Ccountry%2Clocality%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiYmVuc29uY3I3IiwiYSI6ImNsMGgxbHBwNjAyb3Qzb28yYno4ZzA1YWYifQ.JP1IaQwIySVQy5JZ8--aVg`);
        const data=await a.json();
        setOptions(data.features)
    }
    return (
        <form onSubmit={handler} autoComplete={'off'}>
            <lable  htmlFor='location' className="form-label">Location</lable>
            <input type={'text'} id="location" className="form-control mb-3" onChange={(e)=>{changeHandler(e); setLocation(e.target.value)}} autoComplete={`off`} value={location} />
            
            {options.length!==0 && <ul className='z-index'>
                {options.map((ele,i)=><button key={i} onClick={()=>{setLocation(ele.place_name);setCoordinates(ele.center);setOptions([])}}>{ele.place_name}</button>)}
            </ul>}
            
            <button className='btn btn-primary'>Submit</button>  
        </form>
    )
}


export default LocationForm