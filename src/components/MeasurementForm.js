import {useEffect, useState} from 'react';
import Canvas from "../components/Canvas.js"
import {v4 as uuidv4} from "uuid"
import {useOutletContext} from "react-router-dom"

function MeasurementForm({id,measurements}){

    //pull in outlet props
    const [handleAddMeasurement, handleMeasurementUpdate, savedMeasurements,setSavedMeasurements, onDelete] = useOutletContext()

    //are measurements loaded historically
    let measurementNull
    if(measurements === null) {measurementNull = true} 
    else{measurementNull = false}

    //set states
    const [patternObject, setPatternObject] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formMeasurements, setFormMeasurements] = useState(measurementNull ? {} : measurements)
    const [submittedFormMeasurements, setSubmittedFormMeasurements] = useState(formMeasurements)

    //pull in pattern data
    useEffect(() => {
        fetch(`http://localhost:3500/patterns/${id}`)
        .then(data => data.json())
        .then(json => setPatternObject(json))
    }, [id])
    
    //format current date
    function currentDate(){
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
       
        let currentDate = `${month}/${day}/${year}`;
        return currentDate; 
    }


    //when form is submitted
    function handleSubmit(event){

        
        event.preventDefault()

        //perfom these only when the input name is not blank and if the input name is the same after they confirm ok


        //if name is not blank
        if(event.target.Name.value !== ""){

            const newMeasurementObject = {
                id: uuidv4(),
                name: event.target.Name.value,
                type: patternObject.type,
                typeId: id,
                dateCreated: currentDate(),
                mymeasurements: formMeasurements
            }

             //if name already exists
            if(savedMeasurements.map(obj => obj.name).includes(newMeasurementObject.name)){
                let result = window.confirm(`Do you want to override ${newMeasurementObject.name} ?`)
                // if user wants to override name then patch
                if(result){

                    setSubmittedFormMeasurements(formMeasurements)
                    setIsSubmitted(true)

                    const patchId = savedMeasurements.find(item => item['name'] === newMeasurementObject.name).id

                    fetch(`http://localhost:3500/measurements/${patchId}`,{
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                    dateCreated: newMeasurementObject.dateCreated,
                    mymeasurements: newMeasurementObject.mymeasurements
                    })
                    })
                    .then(response => response.json())
                    .then((json) => handleMeasurementUpdate(json))
                }
                else{
                    setIsSubmitted(false)
                    alert("Please input new name")
                }
            }
            else{

                setSubmittedFormMeasurements(formMeasurements)
                setIsSubmitted(true)

                fetch("http://localhost:3500/measurements",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": 'application/json'
                    },
                    body: JSON.stringify(newMeasurementObject)
                })
                .then(response => response.json())
                .then((json) => handleAddMeasurement(json))
            }
        }
        else{
            setIsSubmitted(false)
            alert("Pleast input name")
        }

    }
           
    if (!patternObject.type){
        return <h1>Loading...</h1>
    }

    const measurementKeys = Object.keys(patternObject.measurements)
    const measurementValues = Object.values(patternObject.measurements)
    
    function handleChange(event){
        setFormMeasurements({...formMeasurements,[event.target.name]:event.target.value})
    }

    const formElements = measurementKeys.map((key,index) => {
        return( 
            <div key={index}>
                <label htmlFor={key}>{measurementValues[index]}</label>
                <input type="text" name={key} onChange={handleChange} value={formMeasurements[key]}></input><br/> 
            </div>
        )
    })


    return (
        <div className="container">
            <h1 className = "title">{`${patternObject.type} measurements`}</h1>
            <div className = "patternDetails">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor={"Name"}>Name</label>
                    <input type="text" name={"Name"}></input><br/><br/>
                    {formElements}
                    <input type="submit" value="Save and Display Pattern" className = "save-button"></input>
                </form>
                {isSubmitted? <Canvas typeId={id} measurements={submittedFormMeasurements} className="canvas"></Canvas>: <></>}
            </div>
 
        </div>
    )  
}

export default MeasurementForm




