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
                <div className={"h-auto grow p-2"}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/moulinettes" element={<MouliPage/>}/>
                    </Routes>
                </div>
                <div>
                    <footer className={"bg-gray-800 text-white p-2"}>
                        <p className={"text-center"}>Made with ❤️ by Eliot</p>
                    </footer>
                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;
