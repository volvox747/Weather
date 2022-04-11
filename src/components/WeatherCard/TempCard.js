import React from 'react'
import  classes  from "./TempCard.module.css";

const TempCard = ({current,location,state,country,date}) => {
  return (
    <div className={`${classes.imgHeight} card bg-dark text-white `}>
        <img src = 'benjamin-voros-U-Kty6HxcQc-unsplash.jpg' className = {`card-img ${classes.imgHeight}`} alt = '' />
        <div className={classes['card-img-overlay']}>
            <h5 className={`${classes['card-title']} lead fs-2 p-3`}>{location}{state!==undefined &&", "+state}{country!==undefined&&", "+country}</h5>
            <div className="card-text lead ps-3 display-5">{Math.round(current.temp)}&deg;</div>
            <div className="card-text lead ps-3 text-capitalize">{current.weather[0].description}</div>
            <small className="card-text text-muted ps-3">Last updated {date}</small>
        </div>
    </div>
  )
}

export default TempCard