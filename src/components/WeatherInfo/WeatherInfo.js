import React from 'react'
import { uvIndex } from '../../utilities'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {fa}

const WeatherInfo = ({data}) => {
  
  const uvi=uvIndex(data.current.uvi)
  return (
    <div className=''>
           <div className='card-body position-relative'>
               <h4 className='card-title'>Weather Details</h4>
                <div className='card-text pt-3'>
                  <h1 className='mb-0 display-3 '>{Math.round(data.current.feels_like)}&deg;</h1>
                  <p>Feels Like</p>
                  <div className='px-2'>
                    <p className='d-flex justify-content-between mb-4'>Humidity: <span>{data.current.humidity}%</span></p>
                  
                    <p className='d-flex justify-content-between mb-4'>Visibility: <span>{data.current.visibility/1000}km/h</span></p>
                  
                    <p className='d-flex justify-content-between mb-4'>Pressure: <span>{data.current.pressure}</span></p>
                  
                    <p className='d-flex justify-content-between mb-4'>UV Index: <span>{uvi}</span></p>
                  
                    <p className='d-flex justify-content-between'>Wind Speed: <span>{Math.round(data.current.wind_speed)} km/h</span></p>
                  </div>
                </div>
                {/* < button className = {`btn btn-secondary offset-5 rounded-circle`}><FontAwesomeIcon icon={faArrowDown}/></button> */}
           </div>
       </div>
  )
}

export default WeatherInfo