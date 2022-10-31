import React from "react";
import {Header} from "./components";

const UserLayout = (props) =>{
    return(
        <>
            <Header children={props.children} />
        </>
    )
}

export {UserLayout}