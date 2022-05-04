import React from 'react'
import Accordion from '../Accordion/Accordion';


const TwoDayHourlyForecast = ({hourlyWeather,unit,location}) => 
{
  return (
      <>
      <div className='bg-light'>
      <div className='container py-5'>
            <div className='pb-5'>
              <span className='display-5 '>Hourly Weather</span>
              <span className='lead fs-4'>- {location}</span>
            </div>
        <div className='accordion mx-5'>
            {hourlyWeather.map((element,i)=><Accordion key={i} index={i} data={element} unit={unit}/>)}
        </div>
      </div>
      </div>
      </>
  )
}

export default TwoDayHourlyForecast