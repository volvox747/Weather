import React, { Fragment } from 'react'
import classes from './DailyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {weatherIcon} from '../../utilities';

const DailyWeather = ({daily,i}) => 
{
  const icon=weatherIcon(daily.weather[0]);
  const date=new Date(daily.dt*1000).toLocaleString('en-IN',{weekday:'short',day:'2-digit'});
  return (
    <Fragment>

    <div className={`my-2  ${classes['daily-card']} ${i===0?classes.first:null}`}>
        <small className='fs-6'>{date}</small>
        <div className=' fs-3'>{Math.round(daily.temp.max)}&deg;</div>
        <div className='text-muted fs-5 pb-2'>{Math.round(daily.temp.min)}&deg;</div>
        <FontAwesomeIcon icon={icon} fontSize={35} />
    </div>
    <div className={`${i===4?null:classes.element} my-2`}></div>
    </Fragment>
  )
}

export default DailyWeather