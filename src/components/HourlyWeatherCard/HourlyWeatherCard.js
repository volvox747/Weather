import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import HourlyWeather from './HourlyWeather'

const HourlyWeatherCard = ({hourlyWeather,unit,timezone}) => 
{
  // console.log('Main Houly Weather Card');
  return (
    <div className='mb-4'>
    <div className='pb-3 card-body'>
        <h4 className='card-title'>Hourly Forecast</h4>
        <div className='card-text d-flex justify-content-evenly'>
        {hourlyWeather.map((obj,index)=><HourlyWeather key={index} i={index} timezone={timezone} unit={unit} hourly={obj}/>)}
        </div>
        <Link to={'/hourly'}>
          <button className='btn btn-primary'>Next 48 hours</button>
        </Link>
    </div>
    </div>
  )
}

export default memo(HourlyWeatherCard)