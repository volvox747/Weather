import React from 'react'
import classes from '../DailyWeatherCard/DailyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import weatherIcon from '../../utilities';


const HourlyWeather = ({hourly,i}) => 
{
  const icon = weatherIcon(hourly.weather[0]);
  const date=new Date(hourly.dt*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
  return (
    <div className={`my-2 px-5 ${i===4?null:classes.element} `}>
        <small className='fs-6'>{date}</small>
        <div className='lead fs-3 pb-2'>{Math.round(hourly.temp)}&deg;</div>
        <FontAwesomeIcon icon={icon} fontSize={35} />
    </div>
  )
}

export default HourlyWeather