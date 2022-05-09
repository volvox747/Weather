import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import DailyWeather from './DailyWeather';


const DailyWeatherCard = ({dailyWeather,unit,timezone}) => 
{
  return (
    <div className=' mb-4'>
    <div className='pb-3 card-body'>
        <h4 className='card-title'>Daily Forecast</h4>
        <div className='card-text d-flex justify-content-evenly'>
          {dailyWeather.map((obj, index) => (<DailyWeather key={index} i={index} daily={obj} timezone={timezone} unit={unit} />))}
        </div>
        <Link to={'/daily'}>
          <button className = 'btn btn-primary' > Next 3 days </button>
        </Link>
        
    </div>
    </div>
  );
}

export default memo(DailyWeatherCard)