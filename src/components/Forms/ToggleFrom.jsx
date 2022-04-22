import React, { Fragment } from "react";
import {useState} from 'react'
import LocationForm from "./searchByLocation";
import { ZipForm } from "./searchByZip";
export const ToggleFrom = (props) => 
{
  // to make the form toggle
  const [displayForm, setDisplayForm] = useState('location');  
  
  return (
    <Fragment>
      <div className=" p-4">
        <div className="pb-4" role="group">
          <input
            type="radio"
            className="form-check-input pe-2"
            name="btnradio"
            id="btnradio1"
            value="location"
            onClick={(e) => setDisplayForm(e.target.value)}
            autocomplete="off"
            checked={displayForm === "location" ? true : false}
          />
          <label className="form-check-label ps-2 pe-3" htmlFor="btnradio1">
            Search by Location
          </label>

          <input
            type="radio"
            className="form-check-input"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
            onClick={(e) => setDisplayForm(e.target.value)}
            value="zip"
          />
          <label className="form-check-label ps-2" htmlFor="btnradio2">
            Search by Zip
          </label>
        </div>
        {displayForm === "location" ? (
          <LocationForm onGet={props.onGet.loc} />
        ) : (
          <ZipForm onGet={props.onGet.zip} />
        )}
      </div>
    </Fragment>
  );
};
