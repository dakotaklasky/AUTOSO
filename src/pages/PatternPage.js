import {useParams,useLocation} from "react-router-dom"
import MeasurementForm from "../components/MeasurementForm.js"


function PatternPage(){

    const params = useParams()
    const patternId = params.id

    const location = useLocation()
    const measurements = location.state

    return (
        <div>
            <MeasurementForm id={patternId} measurements={measurements}/>
        </div>
    )
    
}

export default PatternPage