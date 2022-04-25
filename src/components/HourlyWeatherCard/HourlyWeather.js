import React, { Fragment } from 'react'
import classes from './HourlyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {metricFunction, weatherIcon} from '../../utilities';


const HourlyWeather = ({hourly,i,unit}) => 
{
  console.log('each hourlyweather ');
  // to get icon according to the weather description
  const [icon] = weatherIcon(hourly.weather[0]);
  // convert date obj imto 24 hr time format
  const date=new Date(hourly.dt*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
  return (
    <Fragment>

    <div className={`my-2 ${classes['hour-card']} ${i===0?classes.first:null}`}>
        <small className='fs-6'>{date}</small>
        <div className='fs-3 pb-2'>
          {(unit==='\u00B0C' || unit==='')?Math.round(hourly.temp):Math.round(metricFunction(hourly.temp,unit))}&deg;
        </div>
        <FontAwesomeIcon icon={icon} fontSize={35} />
    </div>
        <div className={`${i===4?null:classes.element} my-2`}/>
    </Fragment>
  )
}

export default HourlyWeather