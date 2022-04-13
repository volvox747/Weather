import React from 'react'
import HourlyWeather from '../WeatherCard/HourlyWeather'

const HourlyWeatherCard = ({hourlyWeather}) => {
  return (
    <div className='pb-5 d-flex'>
        {hourlyWeather.map((obj,index)=><HourlyWeather key={index} i={index} hourly={obj}/>)}
    </div>
  )
}

export default HourlyWeatherCard