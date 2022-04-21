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
    let icon =null;
    let url="";
  if(weather.main==='Rain')
  {
    icon = faCloudShowersHeavy;
    url='rain.jpg';
  }
  else if (weather.main === 'Drizzle')
  {
    icon=faCloudRain;
    url='rain.jpg';
  }
  else if (weather.main === 'Thunderstorm')
  {
    icon=faCloudBolt
    url='rain.jpg';
  }
  else if (weather.main === 'Snow')
  {
    icon=faSnowflake;
    url='rain.jpg';
  }
  else if (weather.main === 'Clear' && weather.icon.slice(-1) === 'n')
  {
    icon=faMoon;
    url='night-sky.jpg';
  }
  else if (weather.main === 'Clear' && weather.icon.slice(-1) === 'd')
  {
    icon=faSun;
    url='clear-sky.jpg';
  }
  else if (weather.main === 'Clouds' && weather.icon.slice(-1) === 'n')
  {
    icon=faCloudMoon;
    url='cloud-with-moon.jpg';
  }
  else if (weather.main === 'Clouds' && weather.icon.slice(-1) === 'd')
  {
    icon=faCloudSun;
    url='few-clouds.jpg';
  }
  else if (weather.main === 'Clouds' && weather.icon.slice(-1) === 'n' && weather.description==='overcast clouds')
  {
    icon=faCloudMoon;
    url='overcast.jpg';
  }
  else if (weather.main === 'Clouds' && weather.icon.slice(-1) === 'd' && weather.description==='overcast clouds')
  {
    icon=faCloudSun;
    url='overcast.jpg';
  }
  return [icon,url];
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