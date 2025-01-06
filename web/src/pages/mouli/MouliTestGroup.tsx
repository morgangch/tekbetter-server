import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faChevronDown,
    faChevronRight, faSkull,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {getScoreColor, getTextScoreColor} from "../../tools/ScoreColor";

function MouliTest(props: { name: string, isPassed: boolean, isCrashed: boolean, content: string }) {

    const color = props.isPassed ? "text-green-500" : "text-red-500";

    return <div className={"flex flex-row items-center gap-1 p-2 rounded-md bg-gray-900"}>
        <FontAwesomeIcon icon={props.isCrashed ? faSkull : faCheckCircle} className={color}/>
        <p className={"font-bold"}>{props.name}: </p>
        <p className={`font-bold ${props.isPassed ? "text-green-600" : "text-red-800"}`}>{props.isCrashed ? "CRASHED" : props.isPassed ? "PASSED" : "FAIL"}</p>
        <p className={"text-gray-600"}>
            - {props.content}
        </p>
    </div>
}

export default function MouliTestGroup(): React.ReactElement {

    const [isExpanded, setIsExpanded] = React.useState(true);

    const score = 60


    return <div>

        <div
            className={"bg-blue-950 w-full hover:bg-blue-900 cursor-pointer flex flex-row items-center gap-2 p-1 rounded"}
            onClick={() => setIsExpanded(!isExpanded)}>
            <div className={"flex flex-row items-center gap-2 p-2 w-6"}>
                <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight}/>
            </div>
            <h2>1- Bacis tests</h2>
            <div className={"flex flex-row items-center gap-1"}>
                <p className={"text-right font-bold " + getTextScoreColor(score)}>{score}%</p>
                <div className={"w-44"}>
                    <ProgressBar height={"10px"} baseBgColor={"#141e3c"} completed={score}
                                 bgColor={getScoreColor(score)} isLabelVisible={false}/>
                </div>
            </div>
        </div>

        <div className={`${isExpanded ? "block" : "hidden"} bg-gray-900 p-2 rounded-b`}>
            <MouliTest name={"Test 1"} isPassed={true} isCrashed={false} content={"This is a test"}/>
            <MouliTest name={"Test 2"} isPassed={false} isCrashed={false}
                       content={"Test failure: The output must match the regular expression '^OK\n" +
                           "$', but it was 'KO: Some fields have the wrong type\n" +
                           "'"}/>
            <MouliTest name={"Test 3"} isPassed={true} isCrashed={false} content={"This is a test"}/>
            <MouliTest name={"Test 4"} isPassed={false} isCrashed={true} content={"This is a test"}/>
        </div>
    </div>
}