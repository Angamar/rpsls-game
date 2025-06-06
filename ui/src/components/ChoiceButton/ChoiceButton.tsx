
import { Button } from "@mui/material";
import type { Choice } from "../../../types/generated";


interface ChoiceButtonProps {
    label: string;
    onClick: () => void;
}

const ChoiceButton = ({ label, onClick }: ChoiceButtonProps) => {

    return (
        <Button variant="contained" onClick={onClick}>{label}</Button>
    )
}

export default ChoiceButton