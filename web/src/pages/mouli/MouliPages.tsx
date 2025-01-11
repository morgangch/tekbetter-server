import React from "react";
import TopBar from "../../comps/TopBar";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import MouliContent from "./MouliContent";
import genTests from "../../models/test";
import MouliHistory from "./MouliHistory";

function Project(props: { name: string, id: string, score: number }) {

    return <div
        className={"flex flex-row items-center p-2 rounded-md bg-blue-950 text-white hover:bg-blue-900 cursor-pointer transition"}>

        <div style={{width: "30px"}}>
            <CircularProgressbar value={props.score} strokeWidth={12} styles={
                buildStyles({
                    pathColor: props.score > 75 ? "green" : props.score > 50 ? "yellow" : props.score > 25 ? "orange" : "red",
                    trailColor: "rgba(255, 255, 255, 0.1)",
                })
            }/>
        </div>
        <p className={"text-xl ml-2 font-bold"}>{props.name}</p>
    </div>
}


export default function MouliPage(): React.ReactElement {
    return (
        <div className={"flex flex-row flex-wrap justify-between gap-2 w-full h-full"}>
            <div className={"p-2 w-96"}>
                <h2 className={"text-white font-bold text-xl text-center"}>My Projects</h2>

                <div className={"flex-col space-y-2"}>
                    <Project name={"Navy"} id={"1234"} score={100}/>
                    <Project name={"CPoolDay 3"} id={"1234"} score={30}/>
                    <Project name={"Secured"} id={"1234"} score={5}/>
                    <Project name={"Minishell2"} id={"1234"} score={65}/>
                    <Project name={"Corewar"} id={"1234"} score={90}/>
                </div>

            </div>
            <div className={"flex flex-row"}>
                <div className={"flex-grow"}>
                    <MouliContent mouli={genTests()[0]}/>
                </div>
                <MouliHistory moulis={genTests()} selected={0}/>
            </div>

        </div>
    );
}