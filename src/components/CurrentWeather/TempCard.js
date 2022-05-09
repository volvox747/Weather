import React from 'react'
import  classes  from "./TempCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {metricFunction, weatherIcon} from '../../utilities';

const TempCard = ({current,location,date,unit,timezone}) => 
{
  // to get icon according to the weather description
  const [icon] = weatherIcon(current.weather[0]);
  // convert the date obj to 24hr time
  date=new Date(date*1000).toLocaleString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:timezone,timeZoneName:"short"});
  return (
    <div className={`${classes['temp-card']} `}>
        {/* <div className="w-75"> */}
            <h5 className={` display-6`}>{location}</h5>
        {/* </div> */}
        <div className='card-body'>
            <div className="card-text d-flex align-items-center">
              <span className='display-1 pe-3'>{(unit==='\u00B0C' || unit==='')?Math.round(current.temp):Math.round(metricFunction(current.temp,unit))}&deg;</span>
              <FontAwesomeIcon icon={icon} fontSize={80} />
            </div>
            <div className="card-text lead fs-3 text-capitalize">{current.weather[0].description}</div> 
            <small className="card-text">Last updated {date}</small>
            
        </div>
    </div>
  )
}

export default TempCard