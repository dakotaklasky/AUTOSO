import PatternType from "../components/PatternType"

function Home(){

    const patternObject = [
        {type: "Top",
         id: 1
        },
        {type: "Pants",
        id: 2
        }]

    const patternButtons = patternObject.map(pattern => {
        return <PatternType pattern={pattern} key={pattern.id}></PatternType>
    })

    return (
        <>
            <h1>Home Page</h1>
            {patternButtons}
        </>
    )
    

}

export default Home