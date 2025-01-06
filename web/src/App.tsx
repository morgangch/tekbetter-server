import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import HomePage from "./pages/HomePage";
import MouliPage from "./pages/mouli/MouliPages";


function App() {


    useEffect(() => {
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/moulinettes" element={<MouliPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
