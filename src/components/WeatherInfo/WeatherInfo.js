import React from 'react'
import { uvIndex } from '../../utilities'
// import {fa}

const WeatherInfo = ({data}) => {
  
  const uvi=uvIndex(data.current.uvi)
  return (
    <div className='card'>
           <div className='card-body'>
               <h4 className='card-title'>Weather Today in {data.location}</h4>
                <div className='card=text pt-3'>
                  <h1 className='mb-0 display-3 '>{Math.round(data.current.feels_like)}&deg;</h1>
                  <p>Feels Like</p>
                    <p>Humidity: {data.current.humidity}%</p>
                  <hr></hr>
                    <p>Visibility: {data.current.visibility/1000}km/h</p>
                  <hr></hr>
                    <p>Pressure: {data.current.pressure}</p>
                  <hr></hr>
                    <p>UV Index: {uvi}</p>
                  <hr></hr>
                    <p>Wind Speed: {Math.round(data.current.wind_speed)} km/h</p>
                </div>
           </div>
       </div>
  )
}

export default WeatherInfo