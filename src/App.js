import classes from './App.module.css';
import {Fragment, useState,useEffect} from 'react'
import { ToggleFrom } from './components/Forms/ToggleFrom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { weatherIcon } from './utilities';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import TempCard from './components/CurrentWeather/TempCard';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import DailyWeatherCard from './components/DailyWeatherCard/DailyWeatherCard';
import HourlyWeatherCard from './components/HourlyWeatherCard/HourlyWeatherCard';


function App() 
{
  // loading spinner jsx code
  const middleware=(
  <div className="spinner-border text-secondary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>)
  const [getData, setGetData] = useState({});
  // this state is triggered admist request and response of data
  const [isLoading, setIsLoading] = useState(false);
  // used for mapping on radar
  const [coord,setCoord]=useState([]);
  
  // function to get weather data based on zip code and country entered by the user 
  const getByZip=async(iso2,zip)=>
  {
    setIsLoading(true);
    // Get the place name and lat,log coordinates 
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${iso2}&units=metric&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const {name,coord}=await res.json();
    
    // Get the current,daily and hourly weather data 
    res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const {current,daily,hourly}=await res.json();
    
    // Get the state and country names using openCast API
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
  console.log(getData)
  // Function to get weather data based on location entered by the user 
  const getByLocation=async(location,coordinates)=>
  {
    setIsLoading(true);
    setCoord(coordinates);
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

  // Function to get weather data based on users current IP address 
  const getWeatherThroughIP=async()=>{
    setIsLoading(true);
    // get city,state,country name & geography coordinates from idata API
    let response = await fetch(`https://api.ipdata.co/?api-key=4825cba494257a270b1a4e24386c124042b61f8e54720ac8a4ed04ec`);
    const {city,region,country_name,latitude,longitude}=await response.json();
    // get current, daily, hourly weather data using coordinates responded by ipdata API
    response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,alerts&appid=c6b6521bbfa0ecfa8b508528f3f9823e`);
    const {current,daily,hourly} = await response.json();
    // set the coordinates array which is used to locate the place on radar map
    setCoord([longitude,latitude])
    setGetData({
      current,
      daily,
      hourly,
      location: city+", "+region+", "+country_name,
    })
    setIsLoading(false);
  }
  
  // change the background according to the weather description
  let ans=[];
  if (Object.keys(getData).length !== 0){
    ans=weatherIcon(getData.current.weather[0])
  }
  
  // calls getWeatherThroughIP function when the page renders for the first time
  useEffect(() => {
    getWeatherThroughIP();
  }, []);

  return (
    <Fragment>
      <section style={{backgroundImage:`url(${ans[1]})`}} className={classes['current-weather']}>
              <div className={classes.overlay}></div>
          <div className='row'>
            <div className=' col-xl-8 col-lg-7 col-md-6 position-relative'>
              {
                isLoading===false && Object.keys(getData).length!==0 && 
                <TempCard  current={getData.current} location={getData.location} state={getData.state} country={getData.country} date={getData.current.dt}/>
              }
              {
                isLoading === true && middleware
              }
            </div>
            <div className={`col-xl-4 col-lg-5 col-md-6 ${classes.glass} text-white`}>
              <ToggleFrom onGet={{zip:getByZip,loc:getByLocation}}/><hr/>
              {
                isLoading === false && Object.keys(getData).length !== 0 &&
                <>
                <WeatherInfo data={getData}/>
                <hr/>
                <DailyWeatherCard dailyWeather={getData.daily.slice(0,5)}/><hr/>
                <HourlyWeatherCard hourlyWeather={getData.hourly.slice(1,6)}/>
                </>
              }
              {
                isLoading === true && middleware
              }
            </div>
          </div>
      </section>
      <div className="container position-relative my-5">
        {isLoading===true && middleware}
        {coord.length!==0 && <iframe className={classes.iframe}
        src = {`https://embed.windy.com/embed2.html?lat=${coord[1]}&lon=${coord[0]}&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
        frameborder = "0"
        title='radar' > </iframe>}
      </div>
    </Fragment>
  );
}


export default App;
