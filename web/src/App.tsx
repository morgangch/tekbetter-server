import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import HomePage from "./pages/HomePage";
import MouliPage from "./pages/mouli/MouliPages";
import TopBar from "./comps/TopBar";
import "./assets/styles/base.css"

function App() {


    useEffect(() => {
    }, []);

    return (
        <BrowserRouter>
            <div className={"h-screen flex flex-col"}>
                <TopBar/>
                <div className={"flex"}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/moulinettes" element={<MouliPage/>}/>
                    </Routes>
                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;
