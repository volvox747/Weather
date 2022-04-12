import React from 'react'
import  classes  from "./TempCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud,faSun,faMoon, faCloudMoon, faCloudMoonRain, faCloudSunRain, faCloudBolt, faCloudSun, faCloudRain, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';

const TempCard = ({current,location,state,country,date}) => 
{
  let icon=null
  if(current.weather[0].main==='Rain')
  {
    icon = faCloudShowersHeavy;
  }
  else if (current.weather[0].main === 'Drizzle')
  {
    icon=faCloudRain;
  }
  else if (current.weather[0].main === 'Thunderstorm')
  {
    icon=faCloudBolt
  }
  else if (current.weather[0].main === 'Snow')
  {
    icon=faSnowflake;
  }
  else if (current.weather[0].main === 'Clear' && current.weather[0].icon.slice(-1) === 'n')
  {
    icon=faMoon;
  }
  else if (current.weather[0].main === 'Clear' && current.weather[0].icon.slice(-1) === 'd')
  {
    icon=faSun;
  }
  else if (current.weather[0].main === 'Clouds' && current.weather[0].icon.slice(-1) === 'n')
  {
    icon=faCloudMoon;
  }
  else if (current.weather[0].main === 'Clouds' && current.weather[0].icon.slice(-1) === 'd')
  {
    icon=faCloudSun;
  }
  return (
    <div className={` card pb-3 `}>
        <div className="card-header">
            <h5 className={` lead fs-3 pt-2`}>{location}{state!==undefined &&", "+state}{country!==undefined&&", "+country}</h5>
        </div>
        <div className='card-body'>
            <div className="card-text d-flex align-items-center">
              <span className='display-1 pe-3'>{Math.round(current.temp)}&deg;</span>
              <FontAwesomeIcon icon={icon} fontSize={80} />
            </div>
            <div className="card-text lead fs-3 text-capitalize">{current.weather[0].description}</div> 
            <small className="card-text">Last updated {date}</small>
            
        </div>
    </div>
  )
}

export default TempCard