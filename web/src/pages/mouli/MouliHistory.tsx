import React from "react";
import TopBar from "../../comps/TopBar";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faCheckCircle,
    faCircleInfo,
    faSkull,
    faWarning
} from "@fortawesome/free-solid-svg-icons";
import {dateToElapsed, dateToString} from "../../tools/DateString";
import WindowElem from "../../comps/WindowElem";
import scoreColor from "../../tools/ScoreColor";

function MouliHistoryItem(props: {
    test_id: number,
    date: Date,
    score: number,
    is_selected: boolean,
    onOpen: () => void
}): React.ReactElement {

    const mouli = {
        total_score: props.score,
        test_date: props.date,
    }

    return <div
        className={"flex text flex-row justify-between items-center p-2 rounded-md shadow hover:bg-gray-200 cursor-pointer transition min-w-80"}
        onClick={props.onOpen}
    >
        <div style={{width: "30px"}}>
            <CircularProgressbar value={mouli.total_score} strokeWidth={12} styles={
                buildStyles({
                    textColor: scoreColor(props.score).html,
                    pathColor: scoreColor(mouli.total_score).html,
                    trailColor: "rgba(0,0,0,0.07)",
                })
            }/>
        </div>
        <p className={"font-bold"}>{dateToString(mouli.test_date)}</p>

        <div className={"flex flex-row gap-2"}>
            <p className={""}>{dateToElapsed(mouli.test_date)}</p>
        </div>

        <div className={"flex flex-row gap-2"}>
            {/*{mouli.isCrashed() && <FontAwesomeIcon icon={faSkull} title={"Crashed"} color={"red"}/>}*/}
            {/*{(mouli.isManyMandatoryFailed() || mouli.banned_content !== null) &&*/}
            {/*    <FontAwesomeIcon icon={faWarning} title={"Problems found"} color={"red"}/>}*/}
        </div>
        <div style={{width: "10px"}}>
            <FontAwesomeIcon icon={faArrowRight} className={"transition " + (props.is_selected ? "" : "hidden")}/>
        </div>
    </div>
}


export default function MouliHistory(props: {
    history: {
        test_id: number,
        score: number,
        date: Date
    }[], selected: number,
    onSelect: (test_id: number) => void
}): React.ReactElement {
    return (
        <WindowElem
            title={<h1 className={"font-bold text-center text"}>Tests history</h1>}
        >
            <div className="h-full relative min-w-96">
                <div className="absolute inset-0 overflow-y-scroll">
                    {props.history
                        .sort((a, b) => b.date.getTime() - a.date.getTime())
                        .map((mouli, index) =>
                            [...Array(1)].map((_, idx) => (
                                <MouliHistoryItem
                                    key={`${index}-${idx}`}
                                    test_id={mouli.test_id}
                                    date={mouli.date}
                                    score={mouli.score}
                                    is_selected={mouli.test_id === props.selected}
                                    onOpen={() => props.onSelect(mouli.test_id)}
                                />
                            ))
                        )}
                </div>
            </div>

        </WindowElem>
    );
}