import React from "react";
import Modal from "@cmp/UI/Modal";

const ConfirmationModal = (props)=>{

    return(
        <>
            <Modal
                open={props.open}
                onClose={props.actions[1].onClickHandler}
                label={props.label}
                title={props.title}
                description={props.description}
                actions={props.actions}
            />
        </>
    )
}

export {ConfirmationModal};