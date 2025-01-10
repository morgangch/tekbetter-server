import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faChevronDown,
    faChevronRight, faCircle, faSkull,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {getScoreColor, getTextScoreColor} from "../../tools/ScoreColor";
import {MouliSkill, MouliTestClass} from "../../models/MouliResult";

function MouliTest(props: { test: MouliTestClass }) {
    const test = props.test;

    const color = test.passed ? "text-green-500" : "text-red-500";

    return <div className={"flex flex-row items-center gap-1 p-2 rounded-md bg-gray-900"}>
        <FontAwesomeIcon icon={test.crashed ? faSkull : faCheckCircle} className={color}/>
        <p className={"font-bold"}>{test.name}: </p>
        <p className={`font-bold ${test.passed ? "text-green-600" : "text-red-800"}`}>{test.crashed ? "CRASHED" : test.passed ? "PASSED" : "FAIL"}</p>
        <p className={"text-gray-600"}>
            - {test.comment}
        </p>
    </div>
}

export default function MouliTestSkill(props: {skill: MouliSkill}): React.ReactElement {

    const skill = props.skill
    const hasTests = skill.tests !== null && skill.tests.length > 0;
    const [isExpanded, setIsExpanded] = React.useState(hasTests);

    return <div>
        <div
            className={"bg-blue-950 w-full hover:bg-blue-900 cursor-pointer flex flex-row items-center gap-2 p-1 rounded"}
            onClick={() => setIsExpanded(!isExpanded && hasTests)}>
            <div className={"flex flex-row items-center gap-2 p-2 w-6"}>
                {!hasTests ? <FontAwesomeIcon icon={faCircle}/> :
                    <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight}/>}

            </div>
            <h2 className={"min-w-60"}>{skill.name}</h2>
            <div className={"flex flex-row items-center gap-1"}>
                <p className={"text-right font-bold " + getTextScoreColor(skill.score)}>{skill.score}%</p>
                <div className={"w-44"}>
                    <ProgressBar height={"10px"} baseBgColor={"#141e3c"} completed={skill.score}
                                 bgColor={getScoreColor(skill.score)} isLabelVisible={false}/>
                </div>
            </div>
            <div className={"flex flex-row items-center gap-2"}>
                <p className={"text-gray-500"}>{skill.passed}/{skill.count} tests passed</p>
                {skill.crashed > 0 ? <p className={"text-red-500"}>{skill.crashed} crash</p> : null}
                {skill.mandatoryFailed > 0 ? <p className={"text-red-500 font-bold"}>{skill.mandatoryFailed} MANDATORY FAIL</p> : null}
            </div>
        </div>

        <div className={`${isExpanded ? "block" : "hidden"} bg-gray-900 p-2 rounded-b`}>
            {
                skill.tests === null ? null : skill.tests.map((test, index) => <MouliTest key={index} test={test}/>)
            }
        </div>
    </div>
}