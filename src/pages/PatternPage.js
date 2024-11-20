import {useParams,useLocation} from "react-router-dom"
import MeasurementForm from "../components/MeasurementForm.js"

//display measurement form depending on which pattern type is selected
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