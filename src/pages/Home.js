import PatternType from "../components/PatternType"
import {useState, useEffect} from "react"

function Home(){

    const [patternObject, setPatternObject] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:3500/patterns")
        .then(response => response.json())
        .then(json => setPatternObject(json))
    }, [])

    const patternButtons = patternObject.map(pattern => {
        return <PatternType pattern={pattern} key={pattern.id}></PatternType>
    })

    return (
        <>
            <h1 className="home-title">AUTOSO</h1>
            <h2 className="intro">Choose a pattern type to get started</h2>
            <div className="button-container">
                {patternButtons}
            </div>
            
        </>
    )
}

export default Home