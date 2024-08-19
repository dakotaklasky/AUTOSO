import { Link } from "react-router-dom";

function PatternType({pattern}){
    return (
        <Link to={`/pattern/${pattern.id}`}>
        <button>{pattern.type}</button>
        </Link>
    )


}

export default PatternType