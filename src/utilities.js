import {
    faSun,
    faMoon,
    faCloudMoon,
    faCloudBolt,
    faCloudSun,
    faCloudRain,
    faCloudShowersHeavy
} from '@fortawesome/free-solid-svg-icons';
import {
    faSnowflake
} from '@fortawesome/free-regular-svg-icons';


const weatherIcon=(weather)=>
{
    let icon =null
  if(weather.main==='Rain')
  {
    icon = faCloudShowersHeavy;
  }
  else if (weather.main === 'Drizzle')
  {
    icon=faCloudRain;
  }
  else if (weather.main === 'Thunderstorm')
  {
    icon=faCloudBolt
  }
  else if (weather.main === 'Snow')
  {
    icon=faSnowflake;
  }
  else if (weather.main === 'Clear' && weather.icon.slice(-1) === 'n')
  {
    icon=faMoon;
  }
  else if (weather.main === 'Clear' && weather.icon.slice(-1) === 'd')
  {
    icon=faSun;
  }
  else if (weather.main === 'Clouds' && weather.icon.slice(-1) === 'n')
  {
    icon=faCloudMoon;
  }
  else if (weather.main === 'Clouds' && weather.icon.slice(-1) === 'd')
  {
    icon=faCloudSun;
  }
  return icon;
}

export default weatherIcon;