import Home from "./pages/Home"
import App from "./App"
import MyMeasurements from "./pages/MyMeasurements"
import PatternPage from "./pages/PatternPage"
import ErrorPage from "./pages/ErrorPage"
import Canvas from "./components/Canvas"

const routes = [
    {
     path: "/",
     element: <App />,
     errorElement: <ErrorPage />,
     children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/mymeasurements",
            element: <MyMeasurements/>
        },
        {
            path: "/pattern/:id",
            element:<PatternPage/>
        }
       
     ]
    }
]

export default routes