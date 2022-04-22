import React from 'react'
import HourlyWeather from './HourlyWeather'

const HourlyWeatherCard = ({hourlyWeather}) => {
  return (
    <div className='mb-4'>
    <div className='pb-3 card-body'>
        <h4 className='card-title'>Hourly Forecast</h4>
        <div className='card-text d-flex justify-content-evenly'>
        {hourlyWeather.map((obj,index)=><HourlyWeather key={index} i={index} hourly={obj}/>)}
        </div>
        <button className='btn btn-secondary'>Next 48 hours</button>
    </div>
    </div>
  )
}

export default HourlyWeatherCard