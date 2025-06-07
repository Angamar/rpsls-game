import { useState } from 'react';
// import axios from 'axios';
import { Page } from './types';

import styles from './App.module.css';
// import { type ChoiceItem, type Result, type RoundOutcome } from '@rpsls-game/shared';
import Menu from './screens/Menu';
import Game from './screens/Game'; // typically in App.tsx or main.tsx

function App() {
  const [currentPage, setCurrentPage] = useState(Page.Menu);

  // const handleClick = async () => {
  //   const response = await axios.get<ChoiceItem[]>('api/choices');
  //   setChoices(response.data ?? []);
  // };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <section className={styles.appContainer}>
      {currentPage === Page.Menu && <Menu onPageChange={handlePageChange} />}
      {currentPage === Page.Game && <Game />}
    </section>
  );
}

export default App;
