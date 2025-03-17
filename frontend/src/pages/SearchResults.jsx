import React, { useState, useEffect } from "react";
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
        for(let i=0; i<4; i++){
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

export default SearchResults;
