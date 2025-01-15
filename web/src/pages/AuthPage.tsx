import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faArrowRotateForward,
    faCheckCircle,
    faLock,
    faSpinner,
    faWarning
} from "@fortawesome/free-solid-svg-icons";
import GithubLogo from "../assets/githublogo.svg";


function AuthButton(props: { text: string, icon: any, onClick: () => Promise<any>, disabled?: boolean }) {
    const [loading, setLoading] = React.useState<boolean>(false);

    return <div
        className={"flex flex-row items-center gap-2"}
        onClick={() => {
            props.onClick().finally(() => setLoading(false));
        }}>
        <div
            className={"flex flex-row items-center gap-2 w-full justify-center text-white p-2 rounded " + (props.disabled ? "cursor-not-allowed hover:bg-gray-500 bg-gray-400" : "bg-blue-500 cursor-pointer hover:bg-blue-600")}>
            <FontAwesomeIcon icon={loading ? faSpinner : props.icon} spin={loading}/>
            <p>{props.text}</p>
        </div>
    </div>
}

export default function AuthPage(): React.ReactElement {

    const [login_email, setLoginEmail] = React.useState<string>("");
    const [login_password, setLoginPassword] = React.useState<string>("");

    const [register_password, setRegisterPassword] = React.useState<{
        password: string,
        confirm: string
    }>({
        password: "",
        confirm: ""
    } as { password: string, confirm: string });

    const [page, setPage] = React.useState<"email" | "password" | "register" | "create_password">("create_password");

    const is_valid_password = () => {
        // min 8 characters, 1 uppercase, 1 lowercase, 1 number
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return reg.test(register_password.password);
    }

    return (
        <div className={"flex flex-row gap-4 justify-center items-center h-full"}>
            <div className={"p-10 shadow rounded bg-white"}>
                <div className={"flex flex-col items-center gap-5 mb-6"}>
                    <img
                        src={require("../assets/epitech.png")}
                        alt={"Epitech logo"}
                        className={"w-24"}
                    />
                    <div>
                        <h1 className={"font-bold text-nowrap text-center "}>Welcome to TekBetter !</h1>
                        <div className={"flex flex-col items-center"}>
                            <p className={"text-gray-400 text-center italic"}>
                                An unofficial dashboard for Epitech students.
                            </p>
                        </div>
                    </div>
                </div>

                {
                    page === "email" && <>
                        <div className={"mb-2"}>
                            <label className={"block"}>Email</label>
                            <input type={"email"} placeholder={"grace.hopper@epitech.eu"}
                                   className={"w-full p-2 border border-gray-300 rounded"}
                                   value={login_email}
                                   onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <AuthButton icon={faArrowRight} text={"Continue"} onClick={async () => {
                            const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                            if (!email_regex.test(login_email) || !login_email.endsWith("@epitech.eu")) {
                                alert("Please enter a valid Epitech email address.");
                                return;
                            }
                        }}/>
                    </>
                }

                {
                    page === "password" && <>
                        <div className={"mb-2"}>
                            <label className={"block"}>Enter your password</label>
                            <div className={"flex flex-row items-center mb-2"}>
                                <FontAwesomeIcon icon={faWarning} className={"text-red-300"}/>
                                <p className={"text-gray-400 italic"}>This is not your Epitech account password</p>
                            </div>
                            <input type={"password"} placeholder={"TekBetter password"}
                                   className={"w-full p-2 border border-gray-300 rounded"}
                                   value={login_password}
                                   onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        <AuthButton icon={faArrowRight} text={"Login"} onClick={async () => {

                        }}/>
                    </>
                }

                {
                    page === "register" && <>
                        <div className={"mb-2c flex flex-col items-center"}>
                            <FontAwesomeIcon icon={faCheckCircle} className={"text-green-500 text-2xl"}/>
                            <p className={"w-64 text-center text-gray-500"}>
                                An email has been sent to your Epitech email address with a verification link. Please check your inbox.
                            </p>
                        </div>
                    </>
                }


                {
                    page === "create_password" && <>
                        <div className={"mb-2"}>
                            <label className={"block"}>Create your password</label>
                            <div className={"flex flex-row items-center mb-2 gap-1"}>
                                <FontAwesomeIcon icon={faWarning} className={"text-red-300"}/>
                                <p className={"text-gray-400 italic"}>Use a secured and personal password. You will use it
                                    to login to TekBetter.</p>
                            </div>
                            <input type={"password"} placeholder={"TekBetter password"}
                                   className={"w-full p-2 border border-gray-300 rounded"}
                                   value={register_password.password}
                                   onChange={(e) => setRegisterPassword({...register_password, password: e.target.value})}
                            />
                            <p className={"text-gray-400 text-sm italic"}>
                                Passwords must be at least 8 characters long and contain at least one uppercase letter, one
                                lowercase letter, and one number.
                            </p>
                            {
                                !is_valid_password() && <p className={"text-red-500 text-sm"}>Bad password format</p>
                            }
                            <input type={"password"} placeholder={"Confirm"}
                                   className={"w-full p-2 border border-gray-300 rounded"}
                                   value={register_password.confirm}
                                   onChange={(e) => setRegisterPassword({...register_password, confirm: e.target.value})}
                            />
                            {
                                register_password.password !== register_password.confirm &&
                                <p className={"text-red-500 text-sm"}>Passwords do not match</p>
                            }
                        </div>

                        <AuthButton icon={faArrowRight} disabled={register_password.password !== register_password.confirm || !is_valid_password()} text={"Create my account"} onClick={async () => {

                        }}/>
                    </>
                }


                <div className={"flex-row flex items-center gap-1"}>
                    <div className={"w-6"}>
                        <GithubLogo/>
                    </div>
                    <p className={"text-nowrap"}>Source code</p>
                </div>
            </div>

        </div>

    );
}