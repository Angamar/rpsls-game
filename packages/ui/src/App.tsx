import { useState } from 'react';
import { Page } from './types';
import styles from './App.module.css';
import Menu from './screens/Menu';
import Game from './screens/Game'; // typically in App.tsx or main.tsx

function App() {
  const [currentPage, setCurrentPage] = useState(Page.Menu);

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
