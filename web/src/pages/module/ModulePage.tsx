import {BasicBox} from "../../comps/WindowElem";
import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarCheck,
    faCheckCircle,
    faCoins,
    faHammer,
    faMinusCircle, faQuestionCircle,
    faUserGraduate,
    faWarning, faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import {EpiModule} from "../../models/Module";
import getModules from "../../api/module.api";
import LoadingComp from "../../comps/LoadingComp";
import Button from "../../comps/Button";

function RoadBlock(props: {
    children: React.ReactNode,
    title: string,
    url: string | null,
    required_credits: number | null,
    is_registered: boolean,
    current_credits: number,
    confirmed_credits: number,
    icon: any
}) {
    return <div
        className={"flex flex-col border-l-2 border-gray-200 pl-2 m-1 shadow-sm rounded hover:bg-gray-100 transition"}>
        <div className={"flex flex-row items-center justify-between gap-2 p-2"}>

            <div className={"flex flex-row items-center gap-1"}>
                {props.is_registered ? <FontAwesomeIcon icon={props.icon}/> :
                    <div className={"flex flex-row items-center gap-1"}>
                        <FontAwesomeIcon icon={faWarning} className={"text-red-500"}/>
                        <p className={"text-xs text-red-500 italic"}>Not registered</p>
                    </div>
                }
                {props.url !== null ? <h2 className={"font-bold text-nowrap hover:underline cursor-pointer"}
                                          onClick={() => window.open(props.url!)}>{props.title}</h2>
                    : <h2 className={"font-bold text-nowrap"}>{props.title}</h2>}
            </div>
            <div className={"flex flex-row items-center gap-1"}>
                {
                    props.current_credits < props.required_credits! ?
                        <FontAwesomeIcon icon={faWarning} className={"text-red-600"}/> :
                        <FontAwesomeIcon icon={faCoins}/>
                }
                {props.required_credits !== null ? <h2>{props.current_credits}/{props.required_credits} credits</h2> :
                    <h2>{props.current_credits} credits</h2>}
            </div>

        </div>
        {props.children}
    </div>
}


function ModuleList(props: { modules: EpiModule[] }) {


    const is_undernoted = (m: EpiModule) => m.student_credits > 0 && m.student_credits !== m.available_credits


    return props.modules.map((m) => (
        <div
            className={"flex flex-row items-center justify-between hover:bg-gray-200 transition"}>
            <div className={"flex flex-row items-center gap-2"}>

                {!m.is_failed() && m.student_registered &&
                    <FontAwesomeIcon icon={faCheckCircle}
                                     className={is_undernoted(m) ? "text-orange-300" : "text-green-500"}/>}
                {!m.student_registered &&
                    <FontAwesomeIcon icon={faMinusCircle} className={"text-gray-300"}/>}
                {m.is_failed() &&
                    <FontAwesomeIcon icon={faXmarkCircle} className={"text-red-500"}/>}

                <h2 className={"hover:underline cursor-pointer"} onClick={() => {
                    //open new page
                    //https://intra.epitech.eu/module/2024/G-CUS-400/MPL-4-1/#!/all
                    window.open(`https://intra.epitech.eu/module/${m.school_year}/${m.module_code}/${m.instance_code}`, "_blank")

                }}>{m.module_title}</h2>

                {!m.student_registered &&
                    <p className={"text-xs italic text-gray-300"}>Not registered</p>}
                {m.is_failed() &&
                    <p className={"text-xs italic text-red-500"}>Module failed</p>}

                {is_undernoted(m) && <p className={"text-xs italic text-orange-300"}>Credits are missing</p>}


            </div>
            <div className={"flex flex-row items-center gap-2"}>
                <FontAwesomeIcon icon={faUserGraduate}/>
                <h2 className={is_undernoted(m) ? "text-orange-300" : ""}>{m.student_credits}/{m.available_credits} credits</h2>
            </div>
        </div>
    ))
}


export default function ModulePage(): React.ReactElement {

    const [api_data, setApiData] = React.useState<{
        modules: EpiModule[],
        credits: number,
        current_year: number,
        required_credits: number,
        current_year_id: number
    } | null>(null);

    const [selected_year, setSelectedYear] = React.useState<number>(0);

    const year_modules = api_data?.modules.filter((m) => m.school_year === selected_year);

    useEffect(() => {
        getModules().then((data) => {
            setApiData(data);
            setSelectedYear(2024)//data.current_year);
        })
    }, []);


    const generateRoadBlock = (roadblock: EpiModule) => {


        const sub_modules = year_modules!
            .filter((mod) => roadblock.roadblock_submodules.includes(mod.module_code))
            .sort((a, b) => a.student_registered ? -1 : 1);


        let available_credits = 0
        sub_modules
            .filter((m) => m.student_registered)
            .filter((m) => !m.is_failed())
            .forEach((m) => available_credits += m.student_credits > 0 ? m.student_credits : m.available_credits)

        return (
            <div key={roadblock.module_code}>
                <RoadBlock
                    title={roadblock.module_title}
                    is_registered={roadblock.student_registered}
                    url={`https://intra.epitech.eu/module/${roadblock.school_year}/${roadblock.module_code}/${roadblock.instance_code}`}
                    icon={faHammer}
                    confirmed_credits={0}
                    current_credits={available_credits}
                    required_credits={roadblock.roadblock_required_credits !== null ? roadblock.roadblock_required_credits : 0}
                >

                    <ModuleList modules={sub_modules!}/>
                </RoadBlock>
            </div>
        )
    }


    if (api_data === null || year_modules === undefined)
        return <LoadingComp/>;

    let roadblock_modules: string[] = [];
    year_modules.forEach((m) => {
        if (m.is_roadblock)
            m.roadblock_submodules.forEach((s) => {
                if (!roadblock_modules.includes(s))
                    roadblock_modules.push(s)
            })
    });

    const other_road_modules = year_modules
        .filter((m) => !m.is_roadblock)
        .filter((m) => !roadblock_modules.includes(m.module_code))


    const available_years = api_data.modules.map((m) => m.school_year).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a > b ? 1 : -11);

    return (
        <div className={"flex flex-col flex-wrap gap-4"}>

            <div className={"flex flex-row items-center gap-2 bg-red-950 border-red-500 border rounded w-full p-2"}>
                <h1 className={"text-red-400"}>This feature is under development. Please verify any information directly on the intranet.</h1>
                </div>

            <BasicBox className={"flex flex-row gap-1"}>
                {available_years.map((year) => (
                    <Button icon={faCalendarCheck} text={`Year ${year}`} onClick={() => setSelectedYear(year)} />
                ))}
            </BasicBox>

            <BasicBox className={"flex-grow"}>
                <div>
                    <h1>RoadBlocks</h1>
                </div>

                <div className={"grid grid-cols-3 gap-2"}>

                    {year_modules
                        .filter((m) => m.is_roadblock).map((m) => generateRoadBlock(m))}

                    <RoadBlock
                        title={"Modules without roadblocks"}
                        url={null}
                        is_registered={true}
                        icon={faQuestionCircle}
                        confirmed_credits={0}
                        current_credits={other_road_modules.filter((m) => m.student_registered).reduce((acc, m) => acc + m.available_credits, 0)}
                        required_credits={null}
                    >
                        <ModuleList modules={other_road_modules}/>
                    </RoadBlock>
                </div>


            </BasicBox>
        </div>
    );
}
