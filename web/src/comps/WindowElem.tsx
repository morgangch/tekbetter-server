import React from "react";

export default function WindowElem(props: { title: React.ReactNode, children: React.ReactNode }) {
    return <div className={"flex flex-col h-full border-gray-200 border-2 rounded-t-2xl"}>
        <div className={" p-2 border-b-2 border-gray-200 bg-gray-100 rounded-t-2xl"}>
            <h2 className={"font-bold text-gray-800"}>{props.title}</h2>
        </div>
        <div className={"h-full"}>
            {props.children}
        </div>
    </div>
}

export function BasicBox(props: { children: React.ReactNode, className?: string }) {
   return  <div className={"bordered p-2 text shadow " + props.className ? props.className : ""}>
        {props.children}
    </div>
}