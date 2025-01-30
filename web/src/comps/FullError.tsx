import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";

export default function FullError(props: { title?: string, message?: string }): React.ReactElement {
    return <div>
        <div className={"absolute top-0 left-0 w-full h-full bg-black z-1 opacity-60"}/>

        <div className={"absolute w-full h-full top-0 left-0 flex justify-center z-50 items-center"}>
            <div className={"bg-white p-6 rounded shadow-lg flex flex-col items-center"}>
                <FontAwesomeIcon icon={faXmarkCircle} className={"text-red-500 text-6xl"}/>

                <h1 className={"text-2xl font-bold mt-5 text-nowrap"}>{props.title || "An error occured"}</h1>
                <p>{props.message || "An error occured, please try again later."}</p>
            </div>
        </div>
    </div>
}