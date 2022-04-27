import React from 'react'
import classes from '../../App.module.css'

const Radar = ({lat,lng}) => {
  return (
    <>
    <iframe className={classes.iframe}
        src = {`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lng}&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
        frameBorder = "0"
        title='radar' > </iframe>
    </>
  )
}

export default Radar    