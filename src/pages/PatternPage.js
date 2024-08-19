import {useParams} from "react-router-dom"
import MeasurementForm from "../components/MeasurementForm.js"
import Canvas from "../components/Canvas.js"
import { Outlet } from "react-router-dom"


function PatternPage(){

    const params = useParams()
    const patternId = params.id

    return (
        <div>
            <MeasurementForm id={patternId} />
            <Outlet id={patternId}/>
        </div>
    )
    
}

export default PatternPage