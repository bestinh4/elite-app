
import React, { useState, useMemo, useEffect } from 'react';
import { Page, Player } from './types';
import {
  PlayerListPage,
  ArenaPage,
  ScoutPage,
  ProfilePage,
  CreateMatchPage,
  LoginPage,
} from './pages';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-text-main dark:text-white font-semibold">Loading Players...</p>
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Login');
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(1);

  useEffect(() => {
    const fetchPlayers = async () => {
        try {
            const playersCollection = collection(db, "players");
            // Assuming 'rank' field exists for ordering
            const q = query(playersCollection, orderBy("rank"));
            const playerSnapshot = await getDocs(q);
            const playerList = playerSnapshot.docs.map(doc => doc.data() as Player);
            setPlayers(playerList);
        } catch (error) {
            console.error("Error fetching players: ", error);
            // Handle error, maybe set an error state to show in the UI
        } finally {
            setIsLoading(false);
        }
    };

    if (currentPage !== 'Login') {
        fetchPlayers();
    } else {
        setIsLoading(false);
    }
  }, [currentPage]);

  const handlePlayerConfirm = async (playerId: number) => {
    const playerToUpdate = players.find(p => p.id === playerId);
    if (!playerToUpdate) return;
    
    // Optimistic UI update
    const updatedPlayers = players.map(p =>
      p.id === playerId ? { ...p, isConfirmed: !p.isConfirmed } : p
    );
    setPlayers(updatedPlayers);

    // Update Firebase
    try {
        // Document ID in Firestore is assumed to be the string version of the player's numeric ID
        const playerDocRef = doc(db, "players", String(playerId));
        await updateDoc(playerDocRef, {
            isConfirmed: !playerToUpdate.isConfirmed
        });
    } catch (error) {
        console.error("Error updating player confirmation: ", error);
        // Revert UI change on error
        setPlayers(players); 
    }
  };

  const handleSelectPlayer = (playerId: number) => {
    setSelectedPlayerId(playerId);
    setCurrentPage('Profile');
  };
  
  const handleSetPage = (page: Page) => {
    if (page === 'Login') {
      setPlayers([]);
    }
    setCurrentPage(page);
  }

  const selectedPlayer = useMemo(() => {
    return players.find(p => p.id === selectedPlayerId) || players[0];
  }, [selectedPlayerId, players]);

  const renderPage = () => {
    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    switch (currentPage) {
      case 'Login':
        return <LoginPage setPage={handleSetPage} />;
      case 'PlayerList':
        return (
          <PlayerListPage
            players={players}
            onPlayerConfirm={handlePlayerConfirm}
            setPage={handleSetPage}
          />
        );
      case 'Arena':
        return <ArenaPage players={players} setPage={handleSetPage} />;
      case 'Scout':
        return (
          <ScoutPage
            players={players}
            setPage={handleSetPage}
            onSelectPlayer={handleSelectPlayer}
          />
        );
      case 'Profile':
        return <ProfilePage player={selectedPlayer} setPage={handleSetPage} />;
      case 'CreateMatch':
        return <CreateMatchPage setPage={handleSetPage} />;
      default:
        return <LoginPage setPage={handleSetPage} />;
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
