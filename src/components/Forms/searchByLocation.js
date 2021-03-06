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
    // this state is used to raise error when the input fields are empty when form is submitted
    const [error,setError]=useState(false);
    // this state is used to raise error when the entered location is inValid
    const [isValidLocation,setIsValidLocation]=useState(false);
    
    // form submit handler
    const handler=(e)=>
    {
        // to prevent the page from reloading
        e.preventDefault();
        // raise error if input field is empty
        if(location.length===0)
        {
            return setError(true);  
        } 
        // passing the data to the weather data getter function
        props.onGet(location,coordinates);
    }
    
    // autoComplete function
    const autoComplete=async(e)=>
    {
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?types=place%2Cpostcode%2Caddress%2Ccountry%2Clocality%2Cdistrict&autocomplete=true&access_token=pk.eyJ1IjoiYmVuc29uY3I3IiwiYSI6ImNsMGgxbHBwNjAyb3Qzb28yYno4ZzA1YWYifQ.JP1IaQwIySVQy5JZ8--aVg`);
        const data=await res.json();
        if (data.features.length === 0 && data.query.length !== 0) 
        {
            setIsValidLocation(true);
        }
        else setIsValidLocation(false);
        return setOptions(data.features)
    }
    
    return (
        <>
        <form onSubmit={handler} className="d-inline" autoComplete={'off'}>
            <label  htmlFor='location' className="form-label">Location</label>
            <input type={'text'} id="location" className={`form-control ${options.length===0 && "mb-3"}`} onChange={(e)=>{setError(false); autoComplete(e); setLocation(e.target.value)}} autoComplete={`off`} value={location} />
            {
                error===true &&
                // error message 
                <p style={{color:'red'}}>Please enter location</p>
            }
            {
                isValidLocation===true &&
                // invalid location message 
                <p style={{color:'red'}}>Please enter valid location</p>
            }
            {
                // if result length != to 0 display the result
                options.length!==0 && 
                <ul className={`card text-dark ${classes['option-list']}`}>
                    {options.map((ele,i)=><div className='p-2' key={i} onClick={()=>{setLocation(ele.place_name);setCoordinates(ele.center);setOptions([])}}>{ele.place_name}</div>)}
                </ul>
            }

            <button className='btn btn-primary me-3'>Submit</button>
        </form>
        <button className='btn btn-danger' onClick={()=>{setLocation('')}}>Clear</button>
        </>
    )
}


export default LocationForm