import React from 'react'
import DailyWeather from './DailyWeather';


const DailyWeatherCard = ({dailyWeather,unit}) => 
{
  console.log('hourly weather card');
  return (
    <div className=' mb-4'>
    <div className='pb-3 card-body'>
        <h4 className='card-title'>Daily Forecast</h4>
        <div className='card-text d-flex justify-content-evenly'>
          {dailyWeather.map((obj, index) => (<DailyWeather key={index} i={index} daily={obj} unit={unit} />))}
        </div>
        <button className='btn btn-secondary'>Next 3 days</button>
    </div>
    </div>
  );
}

export default DailyWeatherCard