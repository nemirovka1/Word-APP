import { StartPage } from "./startingPage";
import App from "./App";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

export const RoutersPage = () => {
    return (
    <Router>
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/game" element={<App/>}/>
        </Routes>
    </Router>
    )
}