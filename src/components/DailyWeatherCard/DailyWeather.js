import React, { Fragment } from 'react'
import classes from './DailyWeather.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {metricFunction, weatherIcon} from '../../utilities';

const DailyWeather = ({daily,i,unit}) => 
{
  console.log('each hourlyweather ');
  // to get icon according to the weather description
  const [icon]=weatherIcon(daily.weather[0]);
  // convert date obj to string format (eg: "Thu 22")
  const date=new Date(daily.dt*1000).toLocaleString('en-IN',{weekday:'short',day:'2-digit'});
  return (
    <Fragment>
    <div className={`my-2  ${classes['daily-card']} ${i===0?classes.first:null}`}>
        <small className='fs-6'>{date}</small>
        <div className=' fs-3'>
          {(unit==='\u00B0C' || unit==='')?Math.round(daily.temp.max):Math.round(metricFunction(daily.temp.max,unit))}&deg;
          </div>
        <div className='text-white fs-5 pb-2'>
          {(unit==='\u00B0C' || unit==='')?Math.round(daily.temp.min):Math.round(metricFunction(daily.temp.max,unit))}&deg;
        </div>
        <FontAwesomeIcon icon={icon} fontSize={35} />
    </div>
    <div className={`${i===4?null:classes.element} my-2`}></div>
    </Fragment>
  )
}

export default DailyWeather