import React from 'react'
import HourlyWeather from './HourlyWeather'

const HourlyWeatherCard = ({hourlyWeather}) => {
  return (
    <div className='card'>
    <div className='pb-5 card-body'>
        <h4 className='card-title'>Hourly Forecast</h4>
        <div className='card-text d-flex justify-content-evenly'>
        {hourlyWeather.map((obj,index)=><HourlyWeather key={index} i={index} hourly={obj}/>)}
        </div>
    </div>
    </div>
  )
}

export default HourlyWeatherCard