import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import HomePage from "./pages/HomePage";
import MouliPage from "./pages/mouli/MouliPages";
import TopBar from "./comps/TopBar";
import "./assets/styles/base.css"
import CalendarPage from "./pages/CalendarPage";
import SyncPage from "./pages/SyncPage";
import AuthPage from "./pages/AuthPage";
import FullError from "./comps/FullError";
import {vars} from "./api/api";

function App() {

    const [error, setError] = React.useState<{
        title?: string,
        message?: string
    } | null>(null);

    useEffect(() => {
        vars.setErrorPopup = (title: string | null, message: string | null) => {
            setError({
                title: title || "An error occured",
                message: message || "An error occured, please try again later."
            });
        }
    }, []);

    return (
        <BrowserRouter>
            <div className={"h-screen flex flex-col"}>
                <TopBar/>
                {error &&
                    <FullError title={error.title} message={error.message}/>}
                <div className={"h-auto grow p-2"}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/auth" element={<AuthPage/>}/>
                        <Route path="/calendar" element={<CalendarPage/>}/>
                        <Route path="/sync" element={<SyncPage/>}/>
                        <Route path="/moulinettes" element={<MouliPage/>}/>
                        <Route path="/moulinettes/:project_slug"
                               element={<MouliPage/>}/>
                    </Routes>
                </div>
                <div>
                    <footer className={"bg-gray-800 text-white p-2"}>
                        <p className={"text-center"}>
                            Made with ❤️ by
                            <a
                                href="https://example.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={"no-underline text-inherit ml-1"}
                            >
                                Eliot
                            </a>
                            {" & "}
                            <a
                                href="https://justmael.me"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={"no-underline text-inherit ml-1"}
                            >
                                Maël
                            </a>
                        </p>
                    </footer>
                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;
