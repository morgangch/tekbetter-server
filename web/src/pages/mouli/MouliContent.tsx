import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowUp,
    faCheckCircle, faCircleInfo,
    faClose,
    faHammer, faLineChart,
    faList, faMagnifyingGlass,
    faSkull, faWarning
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import MouliTestSkill from "./MouliTestSkill";
import Button from "../../comps/Button";
import {MouliResult} from "../../models/MouliResult";

function CodingStyleRow(props: { name: string, value: number }) {
    const color = props.name === "FATAL" ? "text-red-500" : props.name === "MAJOR" ? "text-yellow-500" : props.name === "MINOR" ? "text-yellow-300" : "text-green-500";

    return <div className={"flex flex-row font-bold"}>
        <p>{props.value}</p>
        <p className={"ml-2"}>{props.name}</p>
    </div>
}

function TraceWindow(props: { content: string, close: () => void }) {
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
                            props.close();
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );

}

function TopProp(props: { children: React.ReactNode, title: string, icon: any }) {
    return <div className={"flex flex-col justify-center border-l-4 border-gray-700 pl-2 m-1"}>
        <div className={"flex flex-row items-center justify-center gap-2 p-2"}>
            <FontAwesomeIcon icon={props.icon}/>
            <h2 className={"font-bold"}>{props.title}</h2>
        </div>
        {props.children}
    </div>
}

function ElemStatus(props: { err_content: any }) {
    return !props.err_content ? (
        <div
            className={"flex flex-row items-center border rounded-full border-green-700 gap-1 pl-1"}>
            <FontAwesomeIcon icon={faCheckCircle} color={"green"}/>
            <p>Ok !</p>
        </div>
    ) : (
        <div
            className={"flex max-w-64 flex-row items-center border rounded border-red-700 gap-1 pl-1 hover:bg-red-700 cursor-pointer"}>
            <FontAwesomeIcon icon={faCircleInfo} color={"red"}/>
            <p>{props.err_content}</p>
        </div>
    );
}

export default function MouliContent(props: { mouli: MouliResult }): React.ReactElement {

    const [popupValue, setPopupValue] = React.useState<string | null>(null);

    const mouli = props.mouli;

    return <div>
        {popupValue && <TraceWindow content={popupValue} close={() => setPopupValue(null)}/>}
        <div className={"flex-grow"}>
            <h1 style={{fontSize: "30px"}} className={"font-bold text-center"}>{mouli.project_name}</h1>
        </div>
        <div className={"flex flex-row justify-between"}>
            <div className={"flex flex-row justify-between w-full"}>
                <div className={"flex flex-row gap-2 p-2 rounded-md"}>
                    <div>
                        <div className={"flex flex-row items-center gap-2 h-min"}>
                            <div className={"w-32"}>
                                <CircularProgressbar value={mouli.total_score} text={`${mouli.total_score}%`}
                                                     strokeWidth={12}
                                                     styles={
                                                         buildStyles({
                                                             pathColor: "green",
                                                             trailColor: "rgba(255, 255, 255, 0.1)",
                                                         })
                                                     }/>
                            </div>
                            <div className={"flex flex-col justify-center"}>
                                <p>Commit: {mouli.commit}</p>
                                <p>Test date: {mouli.test_date.toDateString()}</p>
                                <p>Test n°{mouli.test_id}</p>
                                <ElemStatus err_content={mouli.isManyMandatoryFailed() ? "Mandatory failed" : null}/>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-2 mt-3"}>
                            {mouli.build_trace && <Button icon={faList} text={"Build trace"} onClick={() => {
                                setPopupValue(mouli.build_trace);
                            }}/>}
                        </div>
                    </div>

                    <div className={"grid grid-cols-2 grid-rows-2"}>
                        <TopProp title={"Banned functions"} icon={faHammer}>
                            <div className={"px-1"}>
                                <ElemStatus err_content={mouli.banned_content}/>
                            </div>
                        </TopProp>

                        <TopProp title={"Coding style"} icon={faMagnifyingGlass}>
                            <div className={"px-1"}>
                                <ElemStatus err_content={mouli.coding_style.isPerfect() ? null : (
                                    <div>
                                        <CodingStyleRow name={"MAJOR"} value={mouli.coding_style.major}/>
                                        <CodingStyleRow name={"MINOR"} value={mouli.coding_style.minor}/>
                                        <CodingStyleRow name={"INFO"} value={mouli.coding_style.info}/>
                                    </div>
                                )}/>


                            </div>
                        </TopProp>

                        <TopProp title={"Crash verification"} icon={faSkull}>
                            <div className={"px-1"}>
                                <ElemStatus err_content={mouli.isCrashed() ? "Crash detected" : null}/>
                            </div>
                        </TopProp>
                        <TopProp title={"Evolution"} icon={faLineChart}>
                            <div className={"px-1"}>
                                <div
                                    className={"flex flex-row items-center border rounded-full border-green-700 gap-1 pl-1"}>
                                    <FontAwesomeIcon icon={faArrowUp} color={"green"}/>
                                    <p>14%</p>
                                </div>
                            </div>
                        </TopProp>
                    </div>


                </div>
            </div>
        </div>
        <div>

            <h1>Tests</h1>
            <div className={"space-y-2"}>
                {mouli.skills.map(skill => <MouliTestSkill skill={skill}/>)}
            </div>

        </div>

    </div>
}