"use client";

import { useState, useEffect } from "react";
import GeoSearchResults from "@/components/geo_search_results";

export default function GeoSearch() {

  const [geoData, setGeoData] = useState({});
  const [formData, setFormData] = useState({
    lat: "",
    lon: "",
    miles: "30",
  });

  const [errors, setErrors] = useState({
    lat: "",
    lon: "",
    miles: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getMultiSearchData = async (lat, lon, miles) => {
    try {
      const params = new URLSearchParams({
        q: "*",
        query_by: 'store_name',
        sort_by:`location(${lat}, ${lon}):asc`,
        filter_by:`location:(${lat}, ${lon}, ${miles} mi)`
      });

      const response = await fetch(`/api/geosearch?${params.toString()}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Search error:", error);
      throw error; // Propagate error to be handled by the caller
    }
  };


  const miles = [
    { id: "1", name: "30" },
    { id: "2", name: "40" },
    { id: "3", name: "50" },
    { id: "4", name: "500" },
  ];

  const validateCoordinates = () => {
    const newErrors = {};

    // Validate latitude (-90 to 90)
    const lat = parseFloat(formData.lat);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    // Validate longitude (-180 to 180)
    const lon = parseFloat(formData.lon);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(errors[name]);
    if (errors[name]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCoordinates()) {
      const resp =  await getMultiSearchData(formData.lat, formData.lon, formData.miles)
      // console.log("Valid coordinates:", resp);
      setGeoData(resp)
    } else {
      console.log("Missing data");
    }
  };

  return (
    <>
    
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>Lat: </label>
          <input
            className="rounded-md my-10 mx-2 p-1 text-sky-500"
            type="number"
            placeholder="lat"
            value={formData.lat}
            step="any"
            min="-90"
            max="90"
            name="lat"
            onChange={handleChange}
          />
          <label>Lon: </label>
          <input
            className={`rounded-md my-10 mx-2 p-1 text-sky-500 ${
              errors.lon ? "border-red-500" : "border-gray-300"
            }`}
            type="number"
            value={formData.lon}
            placeholder="lon"
            name="lon"
            step="any"
            min="-180"
            max="180"
            onChange={handleChange}
          />

          <select
            name="miles"
            value={formData.miles}
            // className="rounded-md my-10 mx-2 p-1 text-sky-500"
            onChange={handleChange}
            className={`rounded-md my-10 mx-2 p-1 text-sky-500 ${
              errors.miles ? "border-red-500" : "border-gray-300"
            }`}
            // disabled={isSubmitting}
          >
            {miles.map((mile) => (
              <option key={mile.id} value={mile.name}>
                {mile.name}
              </option>
            ))}
          </select>
          {/* {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )} */}

          <button
            type="submit"
            className="bg-red-400 text-white mx-12 p-1 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <h1> Sample Lat lon</h1>
        <div>41.748489, -88.186111</div>
        <div>33.448376, -112.074036</div>
        <div>34.052235, -118.243683</div>
      </div>
      <br />
      <div>
        <GeoSearchResults data={geoData}></GeoSearchResults>
        
      </div>
    </>
  );
}
