import React, {useEffect} from "react";
import 'react-circular-progressbar/dist/styles.css';
import MouliContent from "./MouliContent";
import MouliHistory from "./MouliHistory";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {dateToElapsed} from "../../tools/DateString";
import {MouliResult} from "../../models/MouliResult";
import getAllProjects, {markAllProjectsAsSeen, markProjectAsSeen} from "../../api/project.api";
import {EpiProject} from "../../models/Project";
import {getMouliDetails, getProjectMouliHistory} from "../../api/mouli.api";
import {useNavigate, useParams} from "react-router";
import scoreColor from "../../tools/ScoreColor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faChevronLeft, faWarning} from "@fortawesome/free-solid-svg-icons";
import LoadingComp from "../../comps/LoadingComp";

function Project(props: {
    project_slug: string,
    project_name: string,
    score: number,
    last_test: Date,
    seen: boolean,
    is_warning?: boolean
}) {
    const params = useParams();
    const [isNewClicked, setIsNewClicked] = React.useState<boolean>(false);

    const is_selected = params.project_slug === props.project_slug;
    const navigate = useNavigate();

    return <div
        className={"relative shadow text rounded-2xl flex flex-row items-center p-2 cursor-pointer transition " + (is_selected ? "bg-gray-100" : "hover:bg-gray-100")}
        onClick={() => {
            navigate(`/moulinettes/${props.project_slug}`);
            if (!props.seen && !isNewClicked) {
                setIsNewClicked(true);
                markProjectAsSeen(props.project_slug).catch(() => console.error("Failed to mark as read"));
            }
        }}>


        {props.is_warning && <div className={"absolute right-2 bottom-0"}>
            <FontAwesomeIcon icon={faWarning} className={"text-red-500 text-xs"}/>
        </div>}

        <div className={"w-12"}>
            <CircularProgressbar
                value={props.score}
                strokeWidth={6}
                text={`${Math.round(props.score)}`}
                styles={
                    buildStyles({
                        textColor: scoreColor(props.score).html,
                        pathColor: scoreColor(props.score).html,
                        trailColor: "rgba(0,0,0,0.06)",
                        textSize: "30",
                    })
                }/>
        </div>
        <div className={"ml-2"}>
            <h3 className={"font-bold text-sm"}>{props.project_name}</h3>
            <p className={"text-xs"}>{dateToElapsed(props.last_test)}</p>
        </div>

        {!props.seen && !isNewClicked &&
            <p className={"absolute rounded-full top-0 right-0 text-xs text-white px-1 text-center bg-red-500 opacity-85"}>new
                !</p>}
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

    const [projects, setProjects] = React.useState<EpiProject[] | null>(null);

    const [current_mouli, setCurrentMouli] = React.useState<MouliResult | null>(null);
    const [project_slug, setProjectSlug] = React.useState<string | null>(null);

    const [history, setHistory] = React.useState<{
        test_id: number;
        score: number;
        date: Date;
        is_warning: boolean;
    }[] | null>(null);

    const [search, setSearch] = React.useState<string>("");
    const params = useParams();
    const c_project_slug = params.project_slug || null;


    const load_test = (test_id: number) => {
        if (test_id === current_mouli?.test_id)
            return;
        setCurrentMouli(null);
        getMouliDetails(test_id).then((r) => {
            setCurrentMouli(r);
        });
    }
    const navigate = useNavigate();

    const reload_projects = () => {
        getAllProjects().then((data) => {
            setProjects(data.sort((a, b) => a.start_date > b.start_date ? -1 : 1));
        }).catch((e) => {
            console.error("Failed to load projects", e);
        });
    }

    useEffect(() => {
        reload_projects();
        const interval = setInterval(reload_projects, 1000 * 40);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

        if (c_project_slug !== project_slug) {
            setHistory(null);
            getProjectMouliHistory(c_project_slug!).then((data) => {
                setHistory(data);
                const sorted_data = data.sort((a, b) => a.date > b.date ? -1 : 1);
                setProjectSlug(c_project_slug);
                if (data.length > 0)
                    load_test(sorted_data[0].test_id);
            });
        }
    }, [c_project_slug, project_slug]);

    if (projects === null)
        return <LoadingComp/>

    const search_results = projects.filter((project) => project.project_name.toLowerCase().includes(search.toLowerCase()));


    return (
        <div className={"flex flex-row"} style={{
            height: "calc(100vh - 75px)",
        }}>
            <div
                className={"p-2 flex-grow overflow-y-auto sm:max-w-96 min-w-96 " + (project_slug === null ? "" : "hidden xl:block")}>
                <input type="text" placeholder="Search..."
                       className={"w-full p-2 rounded-md bg-gray-100 text-gray-800 mt-2"}
                       onChange={(e) => setSearch(e.target.value)}/>

                <div className={"w-min"}>
                    {search_results.filter((project) => !project.mouli_seen && project.mouli !== null).length > 0 ? (
                        <div
                            className={"flex select-none text-nowrap px-1 flex-row items-center justify-start gap-2 mt-2 bg-red-400 text-white rounded cursor-pointer hover:bg-red-500 transition"}
                            onClick={() => {
                                markAllProjectsAsSeen().then(() => {
                                    reload_projects();
                                }).catch(() => console.error("Failed to mark all as read"));
                            }}
                        >
                            <FontAwesomeIcon icon={faCheck} className={"text-xs"}/>
                            <p className={"text-xs"}>mark all as read</p>
                        </div>) : null}

                </div>

                <div
                    className={"grid grid-cols-2 gap-2 mt-2"}>
                    {
                        search_results
                            .filter((project) => project.mouli !== null)
                            .map((project) => {
                                return <Project
                                    project_name={project.project_name}
                                    project_slug={project.project_slug}
                                    score={project.mouli?.score!}
                                    seen={project.mouli_seen}
                                    key={project.project_slug}
                                    is_warning={project.mouli?.is_warning}
                                    last_test={new Date(project.mouli?.date!)}/>
                            })
                    }
                </div>
            </div>

            {
                project_slug == null ? null :
                    <div className={"overflow-y-auto flex-grow"}>
                        <div className={"flex flex-row items-center gap-2 bg-gray-300 xl:hidden"}
                             onClick={() => navigate("/moulinettes")}>
                            <FontAwesomeIcon icon={faChevronLeft} className={"ml-2"}/>
                            <h1 className={"text-2xl font-bold ml-2"}>{project_slug}</h1>
                        </div>
                        <div className={"flex flex-col xl:flex-row  justify-start w-full gap-3 "}>
                            <div className={"xl:w-96 w-full h-64 xl:h-full p-2"}>
                                <MouliHistory history={history || []} selected={current_mouli?.test_id || -1}
                                              onSelect={(new_id: number) => load_test(new_id)}/>
                            </div>

                            <div className={"flex-grow flex-1"}>
                                <MouliContent mouli={current_mouli}/>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}