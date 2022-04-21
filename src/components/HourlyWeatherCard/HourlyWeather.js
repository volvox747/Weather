import React, { Fragment } from 'react'
import classes from './HourlyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {weatherIcon} from '../../utilities';


const HourlyWeather = ({hourly,i}) => 
{
  const [icon] = weatherIcon(hourly.weather[0]);
  const date=new Date(hourly.dt*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
  return (
    <Fragment>

    <div className={`my-2 ${classes['hour-card']} ${i===0?classes.first:null}`}>
        <small className='fs-6'>{date}</small>
        <div className='fs-3 pb-2'>{Math.round(hourly.temp)}&deg;</div>
        <FontAwesomeIcon icon={icon} fontSize={35} />
    </div>
        <div className={`${i===4?null:classes.element} my-2`}/>
    </Fragment>
  )
}

export default HourlyWeather