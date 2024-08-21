import {useEffect} from 'react';
import {Link, useOutletContext} from "react-router-dom"

function MyMeasurements(){

    const [handleAddMeasurement, handleMeasurementUpdate, savedMeasurements,setSavedMeasurements, onDelete] = useOutletContext()

    function handleDelete(savedObject){
        console.log(savedObject)
        fetch(`http://localhost:3500/measurements/${savedObject.id}`,{
            method:"DELETE",
          })
          .then(response => response.json())
          .then(() => onDelete(savedObject))
    }

    const rowElements = savedMeasurements.map(savedObject =>{
        //is this constantly refreshing??
        return(
            <tr key={savedObject.id}>
                <td>{savedObject.name}</td>
                <td>{savedObject.type}</td>
                <td>{savedObject.dateCreated}</td>
                <td><Link to={ `/pattern/${savedObject.typeId}`} state={savedObject.mymeasurements}>View Measurements</Link></td>
                <td onClick={() => handleDelete(savedObject)}>Remove</td>
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
                        <th scope="col">View Measurements</th>
                        <th scrope="col">Delete</th>
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