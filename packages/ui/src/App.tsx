import { useState } from 'react';
// import axios from 'axios';
import { Page } from './types';

import './App.css';
// import { type ChoiceItem, type Result, type RoundOutcome } from '@rpsls-game/shared';
import Menu from './screens/Menu';
import Game from './screens/Game'; // typically in App.tsx or main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      {currentPage === Page.Menu && <Menu onPageChange={handlePageChange} />}
      {currentPage === Page.Game && <Game />}
    </QueryClientProvider>
  );
}

export default App;
