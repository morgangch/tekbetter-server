import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function LoadingComp(): React.ReactElement {
    return <div className={"flex text-gray-500 flex-col items-center justify-center h-full"}>
        <FontAwesomeIcon icon={faSpinner} spin size={"3x"}/>
        <p className={"mt-2"}>Loading...</p>
    </div>
}