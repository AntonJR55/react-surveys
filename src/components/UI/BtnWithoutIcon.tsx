import Button from "@mui/material/Button";

interface IBtnWithoutIconProps {
    text: string;
    type: "button" | "reset" | "submit";
    isModal?: boolean;
    onClick?: () => void;
}

const BtnWithoutIcon = ({
    text,
    type,
    isModal,
    onClick,
}: IBtnWithoutIconProps) => {
    return (
        <Button
            sx={{
                width: type === "submit" ? "268px" : undefined,
                height: type === "submit" ? "56px" : undefined,
                fontSize: isModal ? "12px" : undefined,
            }}
            type={type}
            variant="contained"
            size="large"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default BtnWithoutIcon;
