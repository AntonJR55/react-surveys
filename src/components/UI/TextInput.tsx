import TextField from "@mui/material/TextField";

interface ITextInput {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const TextInput = ({ label, value, onChange }: ITextInput) => {
    return (
        <TextField
            sx={{
                width: "100%",
                backgroundColor: "#fff",
                "& input:-webkit-autofill": {
                    "-webkit-box-shadow": "0 0 0 1000px #fff inset",
                    "-webkit-text-fill-color": "#000",
                },
            }}
            id="outlined-basic"
            variant="outlined"
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default TextInput;
