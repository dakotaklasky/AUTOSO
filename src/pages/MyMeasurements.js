import {useEffect,useState} from 'react';
import {Link} from "react-router-dom"

function MyMeasurements(){

    const [savedMeasurements, setSavedMeasurements] = useState([])

    //needs to run everytime we add a new element to saved measurements
    //need a different state for that?
    useEffect(() =>{
        fetch("http://localhost:3500/measurements")
        .then(data => data.json())
        .then(json => setSavedMeasurements(json))
    },[])


    const rowElements = savedMeasurements.map(savedObject =>{
        return(
            <tr key={savedObject.id}>
                <td>{savedObject.name}</td>
                <td>{savedObject.type}</td>
                <td>{savedObject.dateCreated}</td>
                <td><Link to={`/pattern/${savedObject.typeId}`}>View Pattern</Link></td>
            </tr>
        )
    })

    return (
        <>
            <h1>My Measurements</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date Created</th>
                        <th scope="col">View Pattern</th>
                    </tr>
                </thead>
            <tbody>
                {rowElements}
            </tbody>

            </table>
       
          
            
        </>
    )
}

export default MyMeasurements;