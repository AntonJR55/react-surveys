import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { PopupMsg } from "../../types/app";

interface IPopupMessage {
    popupMsg: PopupMsg;
    closePopupMsg: (popupMsg: PopupMsg) => void;
}

const PopupMessage = ({ popupMsg, closePopupMsg }: IPopupMessage) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={popupMsg.isOpen}
                autoHideDuration={4000}
                onClose={() => closePopupMsg(popupMsg)}
            >
                <Alert
                    onClose={() => closePopupMsg(popupMsg)}
                    severity={popupMsg.msgType}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {popupMsg.msgText}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PopupMessage;
