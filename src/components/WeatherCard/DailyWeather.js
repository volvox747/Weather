import React from 'react'
import classes from './DailyWeather.module.css'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faSun,
  faMoon,
  faCloudMoon,
  faCloudMoonRain,
  faCloudSunRain,
  faCloudBolt,
  faCloudSun,
  faCloudRain,
  faCloudShowersHeavy
} from '@fortawesome/free-solid-svg-icons';
import {
  faSnowflake
} from '@fortawesome/free-regular-svg-icons';

const DailyWeather = ({daily,i}) => 
{
  let icon=null
  if(daily.weather[0].main==='Rain')
  {
    icon = faCloudShowersHeavy;
  }
  else if (daily.weather[0].main === 'Drizzle')
  {
    icon=faCloudRain;
  }
  else if (daily.weather[0].main === 'Thunderstorm')
  {
    icon=faCloudBolt
  }
  else if (daily.weather[0].main === 'Snow')
  {
    icon=faSnowflake;
  }
  else if (daily.weather[0].main === 'Clear' && daily.weather[0].icon.slice(-1) === 'n')
  {
    icon=faMoon;
  }
  else if (daily.weather[0].main === 'Clear' && daily.weather[0].icon.slice(-1) === 'd')
  {
    icon=faSun;
  }
  else if (daily.weather[0].main === 'Clouds' && daily.weather[0].icon.slice(-1) === 'n')
  {
    icon=faCloudMoon;
  }
  else if (daily.weather[0].main === 'Clouds' && daily.weather[0].icon.slice(-1) === 'd')
  {
    icon=faCloudSun;
  }
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