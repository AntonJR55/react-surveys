import { useState } from "react";

type MsgText = string;

type PopupMsg = {
    isOpen: boolean;
    msgText: MsgText;
    msgType: "success" | "warning" | "error";
};

export const usePopupMsg = () => {
    const [popupMsg, setPopupMsg] = useState<PopupMsg>({
        isOpen: false,
        msgText: "",
        msgType: "success",
    });

    const displaySuccessMsg = (msgText: MsgText) => {
        setPopupMsg({
            isOpen: true,
            msgText,
            msgType: "success",
        });
    };

    const displayWarningMsg = (msgText: MsgText) => {
        setPopupMsg({
            isOpen: true,
            msgText,
            msgType: "warning",
        });
    };

    const displayErrorMsg = (msgText: MsgText) => {
        setPopupMsg({
            isOpen: true,
            msgText,
            msgType: "error",
        });
    };

    const closePopupMsg = () => {
        setPopupMsg((prev) => ({ ...prev, isOpen: false }));
    };

    return {
        popupMsg,
        displaySuccessMsg,
        displayWarningMsg,
        displayErrorMsg,
        closePopupMsg,
    };
};
