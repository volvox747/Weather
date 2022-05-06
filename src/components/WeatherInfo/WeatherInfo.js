import { memo } from 'react';
import { metricFunction, uvIndex } from '../../utilities'


const WeatherInfo = ({data}) => 
{
  // console.log('Weather Info');
  // to convert uvi digit to text
  const uvi=uvIndex(data.current.uvi)
  return (
    <div className=''>
           <div className='card-body position-relative'>
               <h4 className='card-title'>Weather Details</h4>
                <div className='card-text pt-3'>
                  <h1 className='mb-0 display-3 '>
                    {(data.units==='\u00B0C' || data.units==='')?Math.round(data.current.feels_like):Math.round(metricFunction(data.current.feels_like,data.units))}&deg;
                  </h1>
                  <p>Feels Like</p>
                  <div className='pt-3'>
                    <p className='d-flex justify-content-between mb-4'>Humidity: <span>{data.current.humidity}%</span></p>
                  
                    <p className='d-flex justify-content-between mb-4'>Visibility: <span>{data.current.visibility/1000}km/h</span></p>
                  
                    <p className='d-flex justify-content-between mb-4'>Pressure: <span>{data.current.pressure}</span></p>
                  
                    <p className='d-flex justify-content-between mb-4'>UV Index: <span>{uvi}</span></p>
                  
                    <p className='d-flex justify-content-between'>Wind Speed: <span>{Math.round(data.current.wind_speed)} km/h</span></p>
                  </div>
                </div>
           </div>
       </div>
  )
}

export default memo(WeatherInfo)