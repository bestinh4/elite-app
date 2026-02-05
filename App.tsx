
import React, { useState, useMemo, useEffect } from 'react';
import { Page, Player } from './types';
import { PLAYERS_DATA } from './constants';
import {
  PlayerListPage,
  ArenaPage,
  ScoutPage,
  ProfilePage,
  CreateMatchPage,
  LoginPage,
} from './pages';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Login');
  const [players, setPlayers] = useState<Player[]>(PLAYERS_DATA);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(1);

  const handlePlayerConfirm = (playerId: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === playerId ? { ...p, isConfirmed: !p.isConfirmed } : p
      )
    );
  };

  const handleSelectPlayer = (playerId: number) => {
    setSelectedPlayerId(playerId);
    setCurrentPage('Profile');
  };

  const selectedPlayer = useMemo(() => {
    return players.find(p => p.id === selectedPlayerId) || players[0];
  }, [selectedPlayerId, players]);

  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return <LoginPage setPage={setCurrentPage} />;
      case 'PlayerList':
        return (
          <PlayerListPage
            players={players}
            onPlayerConfirm={handlePlayerConfirm}
            setPage={setCurrentPage}
          />
        );
      case 'Arena':
        return <ArenaPage players={players} setPage={setCurrentPage} />;
      case 'Scout':
        return (
          <ScoutPage
            players={players}
            setPage={setCurrentPage}
            onSelectPlayer={handleSelectPlayer}
          />
        );
      case 'Profile':
        return <ProfilePage player={selectedPlayer} setPage={setCurrentPage} />;
      case 'CreateMatch':
        return <CreateMatchPage setPage={setCurrentPage} />;
      default:
        return <LoginPage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-black font-display flex justify-center items-center min-h-screen p-0 sm:p-4">
       <div className="w-full max-w-[430px] h-screen sm:h-[932px] sm:max-h-[95vh] bg-background-light dark:bg-background-dark shadow-2xl sm:rounded-3xl overflow-hidden flex flex-col relative border-4 border-white dark:border-gray-800">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
