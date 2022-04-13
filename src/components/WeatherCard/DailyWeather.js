import React from 'react'
import classes from './DailyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import weatherIcon from '../../utilities';

const DailyWeather = ({daily,i}) => 
{
  const icon=weatherIcon(daily.weather[0]);
  const date=new Date(daily.dt*1000).toLocaleString('en-IN',{weekday:'short',day:'2-digit'});
  return (

    <div className={`my-2 px-3 text-center ${i===4?null:classes.element}`}>
        <small>{date}</small>
        <div className='lead fs-5 fw-bold'>{Math.round(daily.temp.max)}&deg;</div>
        <div className='text-muted pb-2'>{Math.round(daily.temp.min)}&deg;</div>
        <FontAwesomeIcon icon={icon} fontSize={25} />
    </div>
  )
}

export default DailyWeather