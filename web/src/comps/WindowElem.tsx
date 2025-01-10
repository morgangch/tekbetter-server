import React from "react";

export default function WindowElem(props: { title: React.ReactNode, children: React.ReactNode }) {
    return <div className={"flex flex-col justify-center shadow"}>
        <div className={"border-gray-200 border-2 p-2 rounded-t-2xl"}>
            <h2 className={"font-bold text-gray-800"}>{props.title}</h2>
        </div>
        <div className={"border-2 border-gray-200"}>
            {props.children}
        </div>
    </div>
}

export function BasicBox(props: { children: React.ReactNode }) {
   return  <div className={"bordered p-2 text"}>
        {props.children}
    </div>
}