import React from 'react'

const WeatherInfo = ({data}) => {
  return (
    <div className='card'>
           <div className='card-body'>
               <h4 className='card-title'>Weather Today in {data.location}</h4>
                <div className='card=text pt-3'>
                    <p>Humidity: {data.current.humidity}%</p>
                    <p>Visibility: {data.current.visibility}</p>
                    <p>Pressure: {data.current.pressure}</p>
                </div>
           </div>
       </div>
  )
}

export default WeatherInfo