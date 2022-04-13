import React, { Fragment } from 'react'
import DailyWeatherCard from '../DailyWeatherCard/DailyWeatherCard';
import HourlyWeatherCard from '../HourlyWeatherCard/HourlyWeatherCard';
import TempCard from './TempCard';

export const WeatherCard = ({data}) => {
  const date=new Date(data.current.dt*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false});
  return (
      <Fragment>
   {/* <div className='card p-4 w-50'> */}
        <TempCard  current={data.current} location={data.location} state={data.state} country={data.country} date={date}/>
        {/* <div className='pb-5 d-flex'>
        {data.daily.slice(0,5).map((obj,index)=><DailyWeather key={index} i={index} daily={obj}/>)}
        </div> */}
        <DailyWeatherCard dailyWeather={data.daily.slice(0,5)}/>
        {/* <div className='pb-5 d-flex'>
        {data.hourly.slice(1,6).map((obj,index)=><HourlyWeather key={index} i={index} hourly={obj}/>)}
        </div> */}
        <HourlyWeatherCard hourlyWeather={data.hourly.slice(1,6)}/>

       <div className='card-body'>
           <p>Humidity: {data.current.humidity}%</p>
           <p>Visibility: {data.current.visibility}</p>
           <p>Pressure: {data.current.pressure}</p>
       </div>
   {/* </div> */}
      </Fragment>
  )
}
