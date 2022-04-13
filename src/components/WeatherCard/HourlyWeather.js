import React from 'react'
import classes from './DailyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import weatherIcon from '../../utilities';


const HourlyWeather = ({hourly,i}) => 
{
  const icon = weatherIcon(hourly.weather[0]);
  const date=new Date(hourly.dt*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
  return (
    <div className={`my-2 px-3 ${i===5?null:classes.element} `}>
        <small>{date}</small>
        <div className='lead fs-5 pb-2'>{Math.round(hourly.temp)}&deg;</div>
        <FontAwesomeIcon icon={icon} fontSize={25} />
    </div>
  )
}

export default HourlyWeather