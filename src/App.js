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
  
  const getByLocation=async(location,coordinates)=>
  {
    setIsLoading(true);
  
    //$ Get the current,daily and hourly weather data based on the coordinates found above 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[1]}&lon=${coordinates[0]}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const {current,daily,hourly}=await response.json();
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
      </div>
    </Fragment>
  );
}

export default App;
