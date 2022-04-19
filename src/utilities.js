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

const uvIndex=(uv) => 
{
  let uvi="";
  if (uv <= 0 && uv >= 2)
  {
    uvi="Low";
  }
  else if (uv <= 3 && uv >= 5)
  {
    uvi="Moderate";
  }
  else if (uv <= 6 && uv >= 7)
  {
    uvi="High";
  }
  else if (uv <= 8 && uv >= 10)
  {
    uvi="Very High";
  }
  else
  {
    uvi="Extreme";
  }
  return uvi
}
export {weatherIcon,uvIndex};