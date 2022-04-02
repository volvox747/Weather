import './App.css';
import {useState} from 'react'
import { byCountry } from 'country-code-lookup';

function App() {
  const [zip, setZip] = useState('');
  const [country,setCountry]=useState('');
  const handler=async(e)=>
  {
    e.preventDefault();
    const {iso2}=byCountry(country)
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${iso2}&appid=c6b6521bbfa0ecfa8b508528f3f9823e`, {
      method: "GET"
    });
    const data=await res.json();
    console.log(data);
    setZip('');
    setCountry('');
  }
  return (
    <div className="App-header">
      <form onSubmit={handler}>
        <lable>ZipCode</lable>
        <input type={'text'} onChange={(e)=>setZip(e.target.value)} value={zip}/>
        <label>Country</label>
        <input type={'text'} onChange={(e)=>setCountry(e.target.value)} value={country}/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
