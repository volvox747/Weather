import React from 'react'
import DailyWeather from './DailyWeather';


const DailyWeatherCard = ({dailyWeather}) => {
  return (
    <div className='card mb-4'>
    <div className='pb-5 card-body'>
        <h4 className='card-title'>Daily Forecast</h4>
        <div className='card-text d-flex justify-content-evenly'>
          {dailyWeather.map((obj, index) => (<DailyWeather key={index} i={index} daily={obj} />))}
        </div>
    </div>
    </div>
  );
}

export default DailyWeatherCard