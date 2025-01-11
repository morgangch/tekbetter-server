import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Button(props: { icon: any, text: string, onClick: any }): React.ReactElement {
    return (
        <div
            className={"flex items-center justify-center text-white cursor-pointer bg-blue-400 px-2 h-8 rounded hover:bg-blue-900"}
            onClick={props.onClick}>
            <div className={"flex flex-row items-center justify-center"}>
                <div>
                    <FontAwesomeIcon icon={props.icon}/>
                </div>
                <p className={"ml-2 text-nowrap"}>{props.text}</p>
            </div>

        </div>
    );
}