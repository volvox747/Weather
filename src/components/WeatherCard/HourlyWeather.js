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
const HourlyWeather = ({hourly,i}) => 
{
  let icon=null
  if(hourly.weather[0].main==='Rain')
  {
    icon = faCloudShowersHeavy;
  }
  else if (hourly.weather[0].main === 'Drizzle')
  {
    icon=faCloudRain;
  }
  else if (hourly.weather[0].main === 'Thunderstorm')
  {
    icon=faCloudBolt
  }
  else if (hourly.weather[0].main === 'Snow')
  {
    icon=faSnowflake;
  }
  else if (hourly.weather[0].main === 'Clear' && hourly.weather[0].icon.slice(-1) === 'n')
  {
    icon=faMoon;
  }
  else if (hourly.weather[0].main === 'Clear' && hourly.weather[0].icon.slice(-1) === 'd')
  {
    icon=faSun;
  }
  else if (hourly.weather[0].main === 'Clouds' && hourly.weather[0].icon.slice(-1) === 'n')
  {
    icon=faCloudMoon;
  }
  else if (hourly.weather[0].main === 'Clouds' && hourly.weather[0].icon.slice(-1) === 'd')
  {
    icon=faCloudSun;
  }
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