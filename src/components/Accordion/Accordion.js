import {
    faArrowDownLong,
    faArrowUpLong,
    faDroplet,
    faTemperatureHigh,
    faWind,
    faEye,
    faCloud,
    faSun
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { metricFunction, weatherIcon } from '../../utilities';
import classes from './Accordion.module.css'

const Accordion = ({data,index,unit}) => {
    const date = new Date(data.dt * 1000).toLocaleString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
      const weekday = new Date(data.dt * 1000).toLocaleString('en-IN', {
          weekday: 'long',
          day:'2-digit',
          month:'long'
      });
  return (
      <>
        {date.slice(0,2)==='24' && <h2 className='py-2 border-bottom'>{weekday}</h2>}
        {index===0&& <h2 className='py-2 border-bottom'>{weekday}</h2>}
    <div className="accordion-item">
    <div className="accordion-header" id={`heading${index}`}>
      <div className={`accordion-button ${index!==0 && 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded={index===0?'true':'false'} aria-controls={`collapse${index}`}>
        <div className ={classes['accordion-header']} >

        <span className={``}>{date.slice(0,2)==='24'?"00"+date.slice(2):date}</span>
        <span className={``}>
            {
                (unit === '\u00B0C' || unit === '') ? Math.round(data.temp): Math.round(metricFunction(data.temp, unit))
            } &deg;
            {/* {Math.round(data.temp)}&deg; */}
        </span>
        <span className={`d-none d-sm-inline`}>
            <FontAwesomeIcon icon={weatherIcon(data.weather[0])[0]} className={`px-2`} fontSize={25}/>
            <span className={`text-capitalize`}>{data.weather[0].description}</span>
        </span>
        <span className={`d-none d-md-inline `}>
            <FontAwesomeIcon icon={faDroplet}className={`pe-2`}/>
            <span className={`me-3`}>{data.humidity}%</span>
        </span>
        </div>
      </div>
    </div>
    <div id={`collapse${index}`} className={`accordion-collapse collapse ${index===0 &&'show'}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
      <div className={`accordion-body text-center`}>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Feels Like</p>
                    <FontAwesomeIcon icon={faTemperatureHigh}className="pe-2"/>
                    {(unit==='\u00B0C' || unit==='')?Math.round(data.feels_like):Math.round(metricFunction(data.feels_like,unit))}&deg;
                    {/* {Math.round(data.feels_like)}&deg; */}
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Humidity</p>
                    <FontAwesomeIcon icon={faDroplet}className="pe-2"/>
                    {data.humidity}%
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Pressure</p>
                    <FontAwesomeIcon icon={faArrowUpLong}/>
                    <FontAwesomeIcon icon={faArrowDownLong}className="pe-2"/>
                    {data.pressure} mb
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>UV Index </p>
                    <FontAwesomeIcon icon={faSun}className="pe-2"/>
                    {data.uvi} out of 10
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Cloud cover</p>
                    <FontAwesomeIcon icon={faCloud}className="pe-2"/>
                    {data.clouds}%
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Visibility</p>
                    <FontAwesomeIcon icon={faEye}className="pe-2"/>
                    {data.visibility/1000}km/hr
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Weather</p>
                    <FontAwesomeIcon icon={weatherIcon(data.weather[0])[0]} className="pe-2" fontSize={20}/>
                    {data.weather[0].description}
                </div>
                <div className="col-sm-6 col-md-3 py-3 border">
                    <p>Wind Speed</p>
                    <FontAwesomeIcon icon={faWind}className="pe-2"/>
                    {data.wind_speed}km/hr
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
      </>
  )
}

export default Accordion