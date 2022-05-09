import React from 'react'
import Accordion from '../Accordion/Accordion';


const TwoDayHourlyForecast = ({hourlyWeather,unit,date,location,timezone}) => 
{
  date = new Date(date.dt * 1000).toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
    timeZoneName: "short"
  });
  return (
      <>
      <div className='bg-light'>
      <div className='container py-5'>
            <div className='pb-5'>
              <span className='display-5 '>Hourly Weather</span>
              <span className='lead fs-4'>- {location}</span>
              <p>As of {date}</p>
            </div>
        <div className='accordion mx-5'>
            {hourlyWeather.map((element,i)=><Accordion key={i} timezone={timezone} index={i} data={element} unit={unit}/>)}
        </div>
      </div>
      </div>
      </>
  )
}

export default TwoDayHourlyForecast