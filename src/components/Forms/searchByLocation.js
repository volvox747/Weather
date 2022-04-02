import React from 'react'
import {useState} from 'react'

const LocationForm = (props) => 
{
    const [location, setLocation] = useState('');
    const handler=(e)=>
    {
        e.preventDefault();
        props.onGet(location);
        setLocation('');
    }
    return (
        <form onSubmit={handler}>
            <lable htmlFor='location' className="form-label">Location</lable>
            <input type={'text'} id="location" className="form-control mb-3" onChange={(e)=>setLocation(e.target.value)} value={location}/>
            <button className='btn btn-primary'>Submit</button>
        </form>
    )
}


export default LocationForm