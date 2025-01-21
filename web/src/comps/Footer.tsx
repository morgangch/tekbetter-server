import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCodeBranch, faTree, faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import GithubLogo from "../assets/githublogo.svg";

export default function Footer(): React.ReactElement {

    const commit_hash = process.env.REACT_APP_COMMIT_HASH || "dev";

    return <footer className={"flex flex-row justify-between bg-gray-800 text-white p-2"}>

        <div className={"flex flex-row items-center text-gray-400 cursor-pointer gap-0.5"} onClick={() => {
            window.open("https://github.com/EliotAmn/tekbetter-server", "_blank");
        }}>
            <FontAwesomeIcon icon={faCodeBranch}/>
            <p>
                {commit_hash}
            </p>

        </div>


        <p className={"text-center"}>
            Made with ❤️ by
            <a
                href="https://github.com/EliotAmn"
                target="_blank"
                rel="noopener noreferrer"
                className={"no-underline text-inherit ml-1"}
            >
                Eliot
            </a>
            {" & "}
            <a
                href="https://justmael.me"
                target="_blank"
                rel="noopener noreferrer"
                className={"no-underline text-inherit ml-1"}
            >
                Maël
            </a>
        </p>
    </footer>
}