import React, { Fragment } from "react";
import {useState} from 'react'
import LocationForm from "./searchByLocation";
import { ZipForm } from "./searchByZip";
export const ToggleFrom = (props) => 
{
  const [displayForm, setDisplayForm] = useState('location');  
  return (
    <Fragment>
      <div className="card p-4 w-50 my-5">
        <div
          className="btn-group pb-4"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            value="location"
            onClick={(e) => setDisplayForm(e.target.value)}
            // autocomplete="off"
            checked={displayForm === "location" ? true : false}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">
            Search by Location
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            // autocomplete="off"
            onClick={(e) => setDisplayForm(e.target.value)}
            value="zip"
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio2">
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
