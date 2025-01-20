import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowTrendDown,
    faArrowTrendUp,
    faCheckCircle,
    faCircleInfo,
    faClose,
    faHammer,
    faLineChart,
    faMagnifyingGlass,
    faSkull,
    faWarning
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import MouliTestSkill from "./MouliTestSkill";
import Button from "../../comps/Button";
import {MouliResult} from "../../models/MouliResult";
import WindowElem, {BasicBox} from "../../comps/WindowElem";
import {dateToString} from "../../tools/DateString";
import ReactApexChart from "react-apexcharts";
import scoreColor from "../../tools/ScoreColor";
import LoadingComp from "../../comps/LoadingComp";

function CodingStyleRow(props: { name: string, value: number }) {
    //const color = props.name === "FATAL" ? "text-red-500" : props.name === "MAJOR" ? "text-yellow-500" : props.name === "MINOR" ? "text-yellow-300" : "text-green-500";

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

function TopProp(props: { children: React.ReactNode, title: string, icon: any, isOk?: boolean }) {

    const icon = (is_ok: boolean) => {
        return <FontAwesomeIcon icon={is_ok ? faCheckCircle : faWarning} color={is_ok ? "green" : "red"}/>
    }

    return <div
        className={"flex flex-col border-l-2 border-gray-200 pl-2 m-1 shadow-sm rounded hover:bg-gray-100 transition"}>
        <div className={"flex flex-row items-center justify-between gap-2 p-2"}>
            <div className={"flex flex-row items-center gap-1"}>
                <FontAwesomeIcon icon={props.icon}/>
                <h2 className={"font-bold text-nowrap"}>{props.title}</h2>
            </div>
            {icon(props.isOk === undefined ? true : props.isOk)}
        </div>
        {props.children}
    </div>
}

function ElemStatus(props: { err_content: any }) {
    return !props.err_content ? (
        <div className={""}>
            <p className={"italic opacity-70"}>No issues found</p>
        </div>
    ) : (
        <div
            className={"flex max-w-64 flex-row items-center border rounded border-red-400 bg-red-200 text-gray-500 gap-1 pl-1"}>
            <FontAwesomeIcon icon={faCircleInfo} color={"red"}/>
            <p>{props.err_content}</p>
        </div>
    );
}

function MouliChart(props: { scores: number[], dates: string[] }) {


    const replace_date = (date: string) => {
        return date.split("T")[0];
    }

    return (
        <ReactApexChart
            className={"w-full"}
            options={{
                chart: {
                    id: "basic-bar",
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false
                    },
                    selection: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    labels: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: props.dates.map(replace_date),
                    labels: {
                        show: false,
                    },
                },

                stroke: {
                    show: true,
                    width: 2,
                }
            }}
            series={[
                {
                    name: "Result",
                    data: props.scores,
                },
            ]}
            type="area"
            height={130}
        />
    );

}


export default function MouliContent(props: { mouli: MouliResult | null }): React.ReactElement {

    const [popupValue, setPopupValue] = React.useState<string | null>(null);

    const mouli = props.mouli;

    if (!mouli) {
        return <LoadingComp/>
    }

    let scores = mouli.evolution.scores
    let evo_ids = mouli.evolution.ids
    let id_index = evo_ids.indexOf(mouli.test_id)
    scores = scores.slice(0, id_index)

    let evolution = mouli.total_score

    if (scores.length > 0)
        evolution = mouli.total_score - scores[scores.length - 1]

    return (
        <WindowElem
            title={<h1 className={"font-bold text-center text"}>{mouli.project_name} test results</h1>}>
            <div className={"p-2 text"}>
                {popupValue && <TraceWindow content={popupValue} close={() => setPopupValue(null)}/>}
                <div className={"flex flex-row justify-between texts"}>
                    <div className={"flex flex-row justify-between w-full"}>
                        <div className={"flex flex-col gap-2 p-2 rounded-md w-full"}>
                            {/*<BasicBox className="flex flex-row w-full sm:w-[calc(40%-0.5rem)]">*/}
                            <div className={"flex flex-row justify-between gap-2 w-full"}>
                                <BasicBox className={"min-w-72 flex flex-row items-center"}>
                                    <div className={"flex flex-row items-center gap-2 h-min"}>
                                        <div className={"w-20 z-10"}>
                                            <CircularProgressbar
                                                value={mouli.total_score}
                                                text={`${mouli.total_score}%`}
                                                strokeWidth={8}

                                                styles={buildStyles({
                                                    textColor: scoreColor(mouli.total_score).html,
                                                    pathColor: scoreColor(mouli.total_score).html,
                                                    trailColor: "rgba(0,0,0,0.09)",
                                                })}
                                            />
                                        </div>
                                        <div className={"flex flex-col justify-center"}>
                                            <p>Commit: {mouli.commit}</p>
                                            <p>Test date: {dateToString(mouli.test_date)}</p>
                                            <p>Test n°{mouli.test_id}</p>
                                            <ElemStatus
                                                err_content={mouli.delivery_error ? "Delivery Error" : mouli.isManyMandatoryFailed() ? "Mandatory failed" : null}
                                            />
                                        </div>
                                    </div>
                                </BasicBox>
                                <BasicBox className={"flex flex-row flex-grow justify-center"}>
                                    <MouliChart scores={mouli.evolution.scores} dates={mouli.evolution.dates}/>
                                </BasicBox>
                            </div>

                            <div className={"flex flex-row gap-2"}>
                                <BasicBox className="flex-grow w-full sm:w-[calc(50%-0.5rem)]">
                                    <div className={"grid grid-cols-1 sm:grid-cols-2 grid-rows-2"}>
                                        <TopProp title={"Banned functions"} icon={faHammer}
                                                 isOk={mouli.banned_content === null}>
                                            <p className={"italic opacity-95 text-red-300 font-bold"}>{mouli.banned_content}</p>
                                        </TopProp>

                                        <TopProp title={"Coding style"} icon={faMagnifyingGlass}>
                                            <div className={"px-1"}>
                                                <ElemStatus
                                                    err_content={mouli.coding_style.isPerfect() ? null : (
                                                        <div>
                                                            <CodingStyleRow name={"MAJOR"}
                                                                            value={mouli.coding_style.major_count}/>
                                                            <CodingStyleRow name={"MINOR"}
                                                                            value={mouli.coding_style.minor_count}/>
                                                            <CodingStyleRow name={"INFO"}
                                                                            value={mouli.coding_style.info_count}/>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </TopProp>

                                        <TopProp title={"Crash verification"} icon={faSkull}
                                                 isOk={!mouli.isCrashed()}

                                        >
                                            <div className={"px-1"}>
                                                <ElemStatus
                                                    err_content={mouli.isCrashed() ? `${mouli.crashCount()} tests crashed` : null}
                                                />
                                            </div>
                                        </TopProp>

                                        <TopProp title={"Evolution"} icon={faLineChart}>
                                            <div className={"px-1 flex flex-row items-center gap-2"}>
                                                <FontAwesomeIcon
                                                    icon={evolution >= 0  || mouli.total_score === 100 ? faArrowTrendUp : faArrowTrendDown}
                                                    color={evolution >= 0 || mouli.total_score === 100 ? "green" : "red"}/>
                                                <p className={"font-bold " + ((evolution >= 0 || mouli.total_score === 100) ? "text-green-500" : "text-red-500")}>
                                                    {Math.round(evolution)}%</p>
                                            </div>
                                        </TopProp>
                                    </div>
                                </BasicBox>
                            </div>

                            {/*<div className={"flex flex-col gap-2 mt-3"}>*/}
                            {/*    {mouli.build_trace && (*/}
                            {/*        <Button*/}
                            {/*            icon={faList}*/}
                            {/*            text={"Build trace"}*/}
                            {/*            onClick={() => setPopupValue(mouli.build_trace)}*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*</div>*/}
                            {/*</BasicBox>*/}

                        </div>

                    </div>
                </div>
                <div className={"texts"}>
                    <h1>Tests</h1>
                    <div className={"space-y-2"}>
                        {mouli.skills.map(skill => <MouliTestSkill skill={skill}/>)}
                    </div>
                </div>

            </div>
        </WindowElem>

    )
}