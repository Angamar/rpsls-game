
import styles from './ChoiceButton.module.css';



interface ChoiceButtonProps {
    label: string;
    onClick: () => void;
    suit: string;
}

const ChoiceButton = ({ label, suit, onClick }: ChoiceButtonProps) => {

    return (
        <button
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "button");
            }}
            className={
                styles.cardButton}

            onClick={onClick} >
            <div className={styles.cardSuit}>{suit}</div>
            <div className={styles.cardValue}>{label}</div>
        </button >
    )
}

export default ChoiceButton