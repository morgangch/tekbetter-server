import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAutomobile, faBell,
    faCalendar, faCalendarCheck, faCheckCircle,
    faGraduationCap,
    faHome,
    faListSquares,
    faRobot,
    faTv, faWarning
} from "@fortawesome/free-solid-svg-icons";

function NavElement(props: { text: string, icon: any, link: string }) {
    const navigate = useNavigate();

    return (
        <div
            className={"flex items-center justify-center text-white cursor-pointer bg-blue-950 px-5 min-w-36 h-8 rounded hover:bg-blue-900"}
            onClick={() => navigate(props.link)}>
            <div className={"flex flex-row items-center justify-center"}>
                <div>
                    <FontAwesomeIcon icon={props.icon}/>
                </div>
                <p className={"ml-2"}>{props.text}</p>
            </div>

        </div>
    );
}


function SyncStatus(props: { last_sync: Date | null }) {


    const gen_visual = (color: string, icon: any, text: string) => (
        <div className={"flex px-1.5 flex-row items-center rounded-full bg-blue-300 bg-opacity-5"}>
            <FontAwesomeIcon icon={icon} className={color} fontSize={"13px"}/>
            <p className={"text-white text-xs my-1 ml-1 text-nowrap"}>{text}</p>
        </div>
    );

    const gen_time_diff = (date: Date) => {
        // minutes, hours, days, weeks, months, years
        const diff = new Date().getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4);
        const years = Math.floor(months / 12);

        if (minutes < 60) {
            return `Sync: ${minutes} minutes ago`;
        } else if (hours < 24) {
            return `Sync: ${hours} hours ago`;
        } else if (days < 7) {
            return `Sync: ${days} days ago`;
        } else if (weeks < 4) {
            return `Sync: ${weeks} weeks ago`;
        } else if (months < 12) {
            return `Sync: ${months} months ago`;
        } else {
            return `Sync: ${years} years ago`;
        }
    }

    const total_minutes = (date: Date) => {
        const diff = new Date().getTime() - date.getTime();
        return Math.floor(diff / 60000);
    }

    if (props.last_sync === null)
        return gen_visual("text-red-500", faWarning, "Never Synced");

    if (total_minutes(props.last_sync) > 60)
        return gen_visual("text-red-500", faWarning, gen_time_diff(props.last_sync));
    else
        return gen_visual("text-green-500", faCheckCircle, gen_time_diff(props.last_sync));
}

export default function TopBar(): React.ReactElement {
    return (
        <div className={"bg-gray-900"}>
            <div className={"flex h-14 items-center justify-between"}>
                <div className={"flex flex-row items-center gap-4 ml-4 w-1/3"}>
                    <div className={"h-full flex flex-row items-center"}>
                        <img
                            src={require("../assets/epitech.png")}
                            alt={"Epitech"}
                            className={"w-12"}
                        />
                        <p className={"text-white ml-1 font-bold"}>TekBetter</p>
                    </div>
                    <SyncStatus last_sync={null}/>
                </div>

                <div className={"flex gap-4 justify-center w-1/3"}>
                    <NavElement text={"Moulinettes"} link={"/moulinettes"} icon={faGraduationCap}/>
                    <NavElement text={"Projects"} link={"/projects"} icon={faListSquares}/>
                    <NavElement text={"Calendar"} link={"/calendar"} icon={faCalendarCheck}/>
                    <NavElement text={"Notifications"} link={"/calendar"} icon={faBell}/>
                </div>
                <div className={"w-1/3"}></div>
            </div>
        </div>
    );
}