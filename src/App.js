import './App.css';
import {Fragment, useState} from 'react'
import { ToggleFrom } from './components/Forms/ToggleFrom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar/Navbar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';


function App() 
{
  const middleware=(
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>)
  const [getData, setGetData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coord,setCoord]=useState([]);
  const getByZip=async(iso2,zip)=>
  {
    setIsLoading(true);
    //$ Get the place name and lat,log coordinates 
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${iso2}&units=metric&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const {name,coord}=await res.json();
    
    //$ Get the current,daily and hourly weather data 
    res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const {current,daily,hourly}=await res.json();
    
    //$ Get the state and country names using openCast API
    res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${coord.lat}+${coord.lon}&key=ecdad83f9a43466cb0d2ef5d24876161`)
    const {results}=await res.json();
    setGetData({
      current,
      daily,
      hourly,
      location:name,
      state: results[0].components.state,
      country: results[0].components.country
    })
    setIsLoading(false)
  }
  console.log(getData);
  
  const getByLocation=async(location,coordinates)=>
  {
    setIsLoading(true);
    setCoord(coordinates);
    //$ Get the state code and country code using location name,state name and country name 
    // let response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location},${stateOfLocation},${country}&key=ecdad83f9a43466cb0d2ef5d24876161`);
    // const {results}=await response.json();
    // console.log(results);
    // //$ Get the coordinates of the entered location 
    // let geometry={};
    // for (const result of results) 
    // {
    //   if(result.components.state===stateOfLocation && result.components.country===country)
    //   {
    //     geometry=result.geometry;
    //     break
    //   }   
    // }
    // console.log(geometry);
    //$ Get the current,daily and hourly weather data based on the coordinates found above 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[1]}&lon=${coordinates[0]}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const {current,daily,hourly}=await response.json();
    // const data=await response.json();
    // console.log(data);
    setGetData({
      location,
      current,
      daily,
      hourly
    });
    setIsLoading(false);
  }
  return (
    <Fragment>
      <Navbar/>
      <div className="container">
        <ToggleFrom onGet={{zip:getByZip,loc:getByLocation}}/>
        {isLoading===false && Object.keys(getData).length!==0 && <WeatherCard data={getData}/>}
        {isLoading===true && middleware}
        {coord.length!==0 && <iframe className='py-5' width = "1100"
        height = "600"
        src = {`https://embed.windy.com/embed2.html?lat=${coord[1]}&lon=${coord[0]}&width=650&height=450&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
        frameborder = "0"
        title='radar' > </iframe>}
      </div>
    </Fragment>
  );
}


export default App;
