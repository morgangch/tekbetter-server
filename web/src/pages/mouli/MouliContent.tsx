import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircleInfo, faClose, faList} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import MouliTestGroup from "./MouliTestGroup";
import Button from "../../comps/Button";

function CodingStyleRow(props: { name: string, value: number }) {
    const color = props.name === "FATAL" ? "text-red-500" : props.name === "MAJOR" ? "text-yellow-500" : props.name === "MINOR" ? "text-yellow-300" : "text-green-500";

    return <div className={"flex flex-row justify-between font-bold"}>
        <p>{props.name}</p>
        <p>{props.value}</p>
    </div>
}

function TraceWindow(props: { content: string }) {
    return (
        <div>
            <div className={"absolute top-0 left-0 w-full h-full bg-black z-1 opacity-60"}/>

            <div className={"absolute w-full h-full top-0 left-0 flex justify-center items-center"}>
                <div className={"bg-gray-900 w-1/2 rounded-md p-2"}>
                    <h1 className={"font-bold text-center text-xl mb-2"}>Trace details</h1>
                    <div className={"bg-gray-800 p-2 rounded-md"}>
                        <code>
                            {props.content}
                        </code>
                    </div>
                    <div className={"flex flex-row justify-center mt-5"}>
                        <Button icon={faClose} text={"Close"} onClick={() => {
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default function MouliContent(): React.ReactElement {

    const [traceOpen, setTraceOpen] = React.useState(true);

    return <div>
        {traceOpen && <TraceWindow content={"This is a trace"}/>}
        <div className={"flex-grow"}>
            <h1 style={{fontSize: "30px"}} className={"font-bold text-center"}>101Secured</h1>
        </div>
        <div className={"flex flex-row justify-between"}>
            <div className={"flex flex-row justify-between w-full"}>
                <div className={"flex flex-row gap-2 p-2 rounded-md"}>
                    <div className={"w-32"}>
                        <CircularProgressbar value={50} text={"50%"} strokeWidth={12} styles={
                            buildStyles({
                                pathColor: "green",
                                trailColor: "rgba(255, 255, 255, 0.1)",
                            })
                        }/>
                    </div>
                    <div className={"flex flex-col justify-center"}>
                        <p>Commit: col1n69</p>
                        <p>Test date: 2025-01-01 23:42</p>
                        <p>Test n°15741</p>
                    </div>
                    <Button icon={faList} text={"Open trace"} onClick={() => {
                    }}/>
                </div>
            </div>

            <div className={"flex flex-col justify-center border-l-4 border-gray-700 w-52 pl-2"}>
                <div>
                    <div className={"flex flex-row items-center justify-center gap-2 p-2"}>
                        <FontAwesomeIcon icon={faCircleInfo}/>
                        <h2 className={"font-bold"}>Coding Style</h2>
                    </div>

                    <div className={"px-1"}>
                        <div className={"flex flex-row items-center border rounded-full border-green-700 gap-1 pl-1"}>
                            <FontAwesomeIcon icon={faCheckCircle} color={"green"}/>
                            <p>No issues found</p>
                        </div>
                        <CodingStyleRow name={"FATAL"} value={0}/>
                        <CodingStyleRow name={"MAJOR"} value={0}/>
                        <CodingStyleRow name={"MINOR"} value={0}/>
                        <CodingStyleRow name={"INFO"} value={0}/>
                    </div>

                </div>
            </div>


        </div>
        <div>

            <h1>Tests</h1>
            <div className={"space-y-2"}>
                <MouliTestGroup/>
                <MouliTestGroup/>
                <MouliTestGroup/>
                <MouliTestGroup/>
            </div>

        </div>

    </div>
}