import React from "react";
import TopBar from "../../comps/TopBar";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCheckCircle, faCircleInfo, faSkull, faWarning} from "@fortawesome/free-solid-svg-icons";
import MouliContent from "./MouliContent";
import genTests from "../../models/test";
import {MouliResult} from "../../models/MouliResult";
import {dateToElapsed, dateToString} from "../../tools/DateString";
import WindowElem from "../../comps/WindowElem";

function MouliHistoryItem(props: { mouli: MouliResult, is_selected: boolean, onOpen: () => void }): React.ReactElement {

    const mouli = props.mouli;

    return <div
        className={"flex text flex-row justify-between items-center p-2 rounded-md shadow hover:bg-gray-200 cursor-pointer transition min-w-80"}>

        {props.is_selected && <div style={{width: "10px"}}>
            <FontAwesomeIcon icon={faArrowLeft} className={"text-white"}/>
        </div>}
        <div style={{width: "30px"}}>
            <CircularProgressbar value={props.mouli.total_score} strokeWidth={12} styles={
                buildStyles({
                    pathColor: props.mouli.total_score > 75 ? "green" : props.mouli.total_score > 50 ? "yellow" : props.mouli.total_score > 25 ? "orange" : "red",
                    trailColor: "rgba(0,0,0,0.07)",
                })
            }/>
        </div>
        <p className={"font-bold"}>{dateToString(mouli.test_date)}</p>

        <div className={"flex flex-row gap-2"}>
            <p className={""}>{dateToElapsed(props.mouli.test_date)}</p>
        </div>

        <div className={"flex flex-row gap-2"}>
            {mouli.isCrashed() && <FontAwesomeIcon icon={faSkull} title={"Crashed"} color={"red"}/>}
            {(mouli.isManyMandatoryFailed() || mouli.banned_content !== null) &&
                <FontAwesomeIcon icon={faWarning} title={"Problems found"} color={"red"}/>}
        </div>
    </div>
}


export default function MouliHistory(props: { moulis: MouliResult[], selected: number }): React.ReactElement {
    return (
        <WindowElem
            title={<h1 className={"font-bold text-center text"}>Tests history</h1>}
        >
            <div className="h-full relative min-w-96">
                <div className="absolute inset-0 overflow-y-scroll">
                    {props.moulis.map((mouli, index) =>
                        [...Array(50)].map((_, idx) => (
                            <MouliHistoryItem
                                key={`${index}-${idx}`}
                                mouli={mouli}
                                is_selected={mouli.test_id === props.selected}
                                onOpen={() => {
                                }}
                            />
                        ))
                    )}
                </div>
            </div>

        </WindowElem>
    );
}