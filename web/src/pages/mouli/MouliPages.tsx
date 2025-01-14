import React, {useEffect} from "react";
import 'react-circular-progressbar/dist/styles.css';
import MouliContent from "./MouliContent";
import genTests from "../../models/test";
import MouliHistory from "./MouliHistory";
import {BasicBox} from "../../comps/WindowElem";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {dateToElapsed} from "../../tools/DateString";
import {MouliResult} from "../../models/MouliResult";
import getMouliDetails from "../../api/mouli.api";

function Project(props: { test_id: string, project_name: string, score: number, last_test: Date }) {

    return <div className={"shadow text rounded-2xl flex flex-row items-center h-20 p-2 w-36 hover:bg-gray-100 cursor-pointer transition"}>
        <div className={"w-10"}>
            <CircularProgressbar
                value={props.score}
                strokeWidth={6}
                text={`${props.score}%`}
                styles={
                    buildStyles({
                        pathColor: props.score > 75 ? "green" : props.score > 50 ? "yellow" : props.score > 25 ? "orange" : "red",
                        trailColor: "rgba(0,0,0,0.06)",
                        textSize: "30",
                    })
                }/>
        </div>
        <div className={"ml-2"}>
            <h3 className={"font-bold text-sm"}>{props.project_name}</h3>
            <p className={"text-xs"}>{dateToElapsed(props.last_test)}</p>
        </div>
    </div>

    // return <div
    //     className={"flex flex-row items-center p-2 rounded-md bg-blue-950 text-white hover:bg-blue-900 cursor-pointer transition"}>
    //
    //     <div style={{width: "30px"}}>
    //         <CircularProgressbar value={props.score} strokeWidth={12} styles={
    //             buildStyles({
    //                 pathColor: props.score > 75 ? "green" : props.score > 50 ? "yellow" : props.score > 25 ? "orange" : "red",
    //                 trailColor: "rgba(255, 255, 255, 0.1)",
    //             })
    //         }/>
    //     </div>
    //     <p className={"text-xl ml-2 font-bold"}>{props.name}</p>
    // </div>
}


export default function MouliPage(): React.ReactElement {

    const [mouli, setMouli] = React.useState<MouliResult | null>(null);
    const [projects, setProjects] = React.useState<MouliResult[]>([]);

    const [search, setSearch] = React.useState<string>("");

    useEffect(() => {
        getMouliDetails("1234").then(setMouli);
    }, []);

    if (!mouli)
        return <div>Loading...</div>;

  //  const search_results = mouli.tests.filter((test) => test.name.includes(search));

    return (
        <div className={"flex flex-row justify-between w-full h-full"}>
            <div className={"p-2 w-96"}>
                <h2 className={"text-white font-bold text-xl text-center"}>My Projects</h2>

                <input type="text" placeholder="Search..." className={"w-full p-2 rounded-md bg-gray-100 text-gray-800 mt-2"}/>



                <div className={"flex flex-row  gap-2 flex-wrap w-full h-full justify-center content-start overflow-y-scroll"}>

                    <Project project_name={"Navy"} test_id={"1234"} score={100}
                             last_test={new Date("2025-01-11 13:00")}/>
                    <Project project_name={"CPoolDay 3"} test_id={"1234"} score={30}
                             last_test={new Date("2025-01-11 13:00")}/>
                    <Project project_name={"Secured"} test_id={"1234"} score={5}
                             last_test={new Date("2025-01-11 13:00")}/>
                    <Project project_name={"Minishell2"} test_id={"1234"} score={65}
                             last_test={new Date("2025-01-11 13:00")}/>
                    <Project project_name={"Corewar"} test_id={"1234"} score={90}
                             last_test={new Date("2025-01-11 13:00")}/>
                </div>

            </div>
            <div className={"flex flex-row gap-3"}>
                <div className={"flex-grow"}>
                    <MouliContent mouli={mouli}/>
                </div>
                <MouliHistory moulis={genTests()} selected={0}/>
            </div>

        </div>
    );
}