import {useEffect, useState} from 'react';
import Canvas from "../components/Canvas.js"
import {useNavigate} from 'react-router-dom'

function MeasurementForm({id}){

    const [patternObject, setPatternObject] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3500/patterns/${id}`)
        .then(data => data.json())
        .then(json => setPatternObject(json))
    }, [id])

    const navigate = useNavigate()

    if (!patternObject.type){
        return <h1>Loading...</h1>
    }

    function handleSubmit(event){
        event.preventDefault()
        setIsSubmitted(true)
        
    }

    const measurementKeys = Object.keys(patternObject.measurements)
    const measurementValues = Object.values(patternObject.measurements)

    const formElements = measurementKeys.map((key,index) => {
        return( 
            <div key={index}>
                <label htmlFor={key}>{measurementValues[index]}</label>
                <input type="text" name={key}></input><br/>
            </div>
         
            
        )
    })



    return (
        <>
            <h1>{`${patternObject.type} measurements`}</h1>
            <form onSubmit={handleSubmit}>
                {formElements}
                <input type="submit" value="Submit"></input>
            </form>
            {isSubmitted? <Canvas typeId={id}></Canvas>: <></>}
        </>

    )
        
    
}

export default MeasurementForm




