import NavBar from "./components/NavBar"
import { Outlet } from "react-router-dom";
import {useState, useEffect} from 'react'

//Page Structure:
//App
//  Home
//    PatternPage
//  MyMeasurements
//  
//Component Structure:
//NavBar
//  My Measurements 
//  PatternType
//    MeasurementForm
//    Canvas

function App() {
  const [savedMeasurements, setSavedMeasurements] = useState([])

  useEffect(() =>{
    fetch("http://localhost:3500/measurements")
    .then(data => data.json())
    .then(json => setSavedMeasurements(json))
    },[])

  function handleAddMeasurement(newMeasurements){
    setSavedMeasurements([...savedMeasurements,newMeasurements])
    }
  
  function onDelete(deletedMeasurementObject){
    const updatedMeasurementObjects = savedMeasurements.filter((measurement) =>{
      return measurement.id !== deletedMeasurementObject.id
    })
    setSavedMeasurements(updatedMeasurementObjects)
  }

  function handleMeasurementUpdate(updatedMeasurement){
    const updatedMeasurementObjects = savedMeasurements.map(measurement =>{
      if(measurement.id === updatedMeasurement.id){
        return updatedMeasurement
      } 
      else{
        return measurement
      }
    })
    setSavedMeasurements(updatedMeasurementObjects)
  }

  return (
    <div>
      <div className="bg-image"></div>
        <header className="myheader">
          <br></br>
          <NavBar/>
        </header>
        <div className="mybody">
          {/* render child elements Home, MyMeasurements, PatternPage */}
          {/* context gets passed to MyMeasurements to ensure measurement data is 
          getting updated properly in database and to display to user */}
          <Outlet context={[handleAddMeasurement,handleMeasurementUpdate,savedMeasurements, setSavedMeasurements, onDelete]}/>
        </div>
    </div>  
  )
}

export default App;
