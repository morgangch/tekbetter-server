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

function MouliHistoryItem(props: { mouli: MouliResult, is_selected: boolean, onOpen: () => void }): React.ReactElement {

    const mouli = props.mouli;

    return <div
        className={"flex flex-row justify-between items-center p-2 rounded-md bg-blue-950 text-white hover:bg-blue-900 cursor-pointer transition"}>

        {props.is_selected && <div style={{width: "10px"}}>
            <FontAwesomeIcon icon={faArrowLeft} className={"text-white"}/>
        </div>}
        <div style={{width: "30px"}}>
            <CircularProgressbar value={props.mouli.total_score} strokeWidth={12} styles={
                buildStyles({
                    pathColor: props.mouli.total_score > 75 ? "green" : props.mouli.total_score > 50 ? "yellow" : props.mouli.total_score > 25 ? "orange" : "red",
                    trailColor: "rgba(255, 255, 255, 0.1)",
                })
            }/>
        </div>
        <p className={"font-bold"}>{dateToString(mouli.test_date)}</p>

        <div className={"flex flex-row gap-2"}>
            <p className={"text-gray-400"}>{dateToElapsed(props.mouli.test_date)}</p>
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
        <div className={"flex flex-row text-white"}>
            <div className={"p-2 w-96"}>
                <h2 className={"text-white font-bold text-xl text-center"}>Tests history</h2>

                <div className={"flex-col space-y-2"}>
                    {props.moulis
                        .map((mouli, index) =>
                            <MouliHistoryItem key={index} mouli={mouli}
                                              is_selected={mouli.test_id === props.selected}
                                              onOpen={() => {
                                              }}
                            />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}{props.moulis
                    .map((mouli, index) =>
                        <MouliHistoryItem key={index} mouli={mouli}
                                          is_selected={mouli.test_id === props.selected}
                                          onOpen={() => {
                                          }}
                        />)}
                </div>
            </div>
        </div>

    );
}