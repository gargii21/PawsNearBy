/*import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import ProfileCards from "../components/ProfileCards";
import SearchMap from "../components/SearchMap";
import { useLocation } from "react-router-dom";
import axios from "axios";
const SearchResults = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    
    { prId: 2, daycare_name: "Jane Smith", service: "Pet Boarding", lat: 28.7041, lng: 77.1025 },
    { prId: 3, daycare_name: "Alice Brown", service: "Pet Sitting", lat: 19.076, lng: 72.8777 },
  ];

  const [profileTest, setProfileTest] = useState([]); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");
  const service = queryParams.get("service");
  console.log(lat);
  //console.log(location.search);

  //send request to backend  
  useEffect(()=>{
      const fetchdata = async ()=>{
        //console.log('ji');
        const response = await axios.post('http://localhost:5000/search', {
          lat : lat,
          lon:lon,
          service:service
        })
        const temp = response.data.data;
        //console.log(response.data.data);
        //console.log("res chya nantar");
        let list;
        list=[]
        for(let i=0; i<5; i++){
          if(temp[i]==undefined){
            console.log(i)
            console.log("zaal work")
            break;
          }
          let obj;
          const name =temp[i].daycare_name;
          const serv = temp[i].service;
          const pr = temp[i].prId;
          
          obj={prId:pr, daycare_name:name, service:serv, lat:temp[i].prLatitude, lng:temp[i].prLongitude}
          list = [...list, obj]
          setProfileTest(list)

        }
        console.log(temp)
        
        
        //setProfileTest([{prId:pr, daycare_name:name, service:serv, lat:temp.prLatitude, lng:temp.prLongitude}])
      }
      fetchdata();
  }, [])

  return (
    <div className="search-results-container">
      <Filters />
      <ProfileCards profiles={profileTest} setSelectedProfile={setSelectedProfile} />
      <SearchMap profiles={profileTest} setSelectedProfile={setSelectedProfile} />
    </div>
  );
};

export default SearchResults;*/
import React, { useState, useEffect } from "react";
import ProfileCards from "../components/ProfileCards";
import SearchMap from "../components/SearchMap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileTest, setProfileTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lon = queryParams.get("lon");
  const service = queryParams.get("service");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.post('http://localhost:5000/search', {
          lat: lat,
          lon: lon,
          service: service
        });
        const temp = response.data.data;
        let list = [];

        for (let i = 0; i < temp.length; i++) {
          let obj = {
            prId: temp[i].prId,
            daycare_name: temp[i].daycare_name,
            service: temp[i].service,
            lat: temp[i].prLatitude,
            lng: temp[i].prLongitude
          };
          list.push(obj);
        }

        // TEMPORARY DUMMY DATA FOR STYLING (Remove later!)
        if (list.length === 0) {
          list = [
            { prId: 1, daycare_name: "Dummy Caregiver 1", service: "Pet Sitting", lat: 28.61, lng: 77.20, city: "Delhi", fees: 500, rating: 4.5 },
            { prId: 2, daycare_name: "Dummy Caregiver 2", service: "Dog Walking", lat: 19.07, lng: 72.87, city: "Mumbai", fees: 400, rating: 4.2 },
          ];
        }

        setProfileTest(list);

      } catch (error) {
        console.log("Error fetching profiles. Backend might be down.");
        // TEMPORARY DUMMY DATA FOR STYLING (Remove later!)
        setProfileTest([
          { prId: 1, daycare_name: "Dummy Caregiver 1", service: "Pet Sitting", lat: 28.61, lng: 77.20, city: "Delhi", fees: 500, rating: 4.5 },
          { prId: 2, daycare_name: "Dummy Caregiver 2", service: "Dog Walking", lat: 19.07, lng: 72.87, city: "Mumbai", fees: 400, rating: 4.2 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [lat, lon, service]);

  return (
    <div className="search-results-container">
      {loading ? (
        <div className="loading-message">Loading search results...</div>
      ) : profileTest.length === 0 ? (
        <div className="loading-message">No profiles found.</div>
      ) : (
        <>
          <div className="profile-section">
            <ProfileCards profiles={profileTest} setSelectedProfile={setSelectedProfile} />
          </div>
          <div className="map-section">
            <SearchMap profiles={profileTest} setSelectedProfile={setSelectedProfile} />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
