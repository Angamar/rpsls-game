import { Page } from '../../App';
import Typography from '../../components/Typography';
import styles from './Menu.module.css';

interface MenuProps {
  onPageChange: (page: number) => void;
}

const Menu = ({ onPageChange }: MenuProps) => {
  return (
    <section className={styles.menuContainer}>
      <Typography variant="h1" as="h1">
        Welcome to <span style={{ color: 'var(--rock-color)' }}>Rock</span>,{' '}
        <span style={{ color: 'var(--paper-color)' }}>Paper</span>,{' '}
        <span style={{ color: 'var(--scissors-color)' }}>Scissors</span>,{' '}
        <span style={{ color: 'var(--lizard-color)' }}>Lizard</span>,{' '}
        <span style={{ color: 'var(--spock-color)' }}>Spock</span>!
      </Typography>
      <Typography variant="body" as="p">
        Choose your opponent and play a game of Rock, Paper, Scissors.
      </Typography>
      <button>
        <span onClick={() => onPageChange(Page.Game)}>Play vs computer </span>
      </button>
    </section>
  );
};

export default Menu;
