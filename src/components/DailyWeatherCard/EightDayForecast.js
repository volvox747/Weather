import React from 'react'
import DailyForecastAccordion from '../Accordion/DailyForecastAccordion'

const EightDayForecast = ({dailyWeather,location,unit}) => {
  return (
      <>
      <div className='bg-light'>
      <div className='container py-5'>
            <div className='pb-5'>
              <span className='display-5 '>Daily Weather</span>
              <span className='lead fs-4'>- {location}</span>
            </div>
        <div className='accordion mx-5'>
            {dailyWeather.map((element,i)=><DailyForecastAccordion key={i} index={i} data={element} unit={unit}/>)}
        </div>
      </div>
      </div>
      </>
  )
}

export default EightDayForecast