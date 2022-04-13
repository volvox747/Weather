import React from 'react'
import classes from './DailyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import weatherIcon from '../../utilities';

const DailyWeather = ({daily,i}) => 
{
  const icon=weatherIcon(daily.weather[0]);
  const date=new Date(daily.dt*1000).toLocaleString('en-IN',{weekday:'short',day:'2-digit'});
  return (

    <div className={`my-2 px-5 text-center ${i===4?null:classes.element}`}>
        <small className='fs-6'>{date}</small>
        <div className='lead fs-3 fw-bold'>{Math.round(daily.temp.max)}&deg;</div>
        <div className='text-muted fs-5 pb-2'>{Math.round(daily.temp.min)}&deg;</div>
        <FontAwesomeIcon icon={icon} fontSize={35} />
    </div>
  )
}

export default DailyWeather