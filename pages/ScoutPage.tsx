
import React, { useState } from 'react';
import { Page, Player } from '../types';

interface ScoutPageProps {
  players: Player[];
  setPage: (page: Page) => void;
  onSelectPlayer: (playerId: number) => void;
}

const PlayerRankingCard: React.FC<{ player: Player; onSelect: (id: number) => void;}> = ({ player, onSelect }) => (
    <div onClick={() => onSelect(player.id)} className="group flex items-center justify-between p-3 pl-3 bg-surface-light dark:bg-surface-dark rounded-card shadow-sm border border-gray-100 dark:border-white/5 hover:border-primary/20 dark:hover:border-primary/20 transition-all cursor-pointer">
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gray-200 bg-center bg-cover border-2 border-white dark:border-[#3a1d1e] shadow-md" style={{backgroundImage: `url('${player.avatarUrl}')`}}></div>
                <div className={`absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-[#3a1d1e] ${player.rank === 1 ? 'bg-primary' : 'bg-gray-800'}`}>
                    {player.rank}
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-base font-bold uppercase tracking-wide">{player.name}</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">{player.position} • {player.team}</p>
            </div>
        </div>
        <div className="flex flex-col items-end pr-2">
            <p className="text-primary text-xl font-bold">{player.goals}</p>
            <p className="text-xs text-gray-400 font-medium">Goals</p>
        </div>
    </div>
);

const BottomNavScout: React.FC<{ setPage: (page: Page) => void; activePage: Page }> = ({ setPage, activePage }) => (
    <nav className="absolute bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex justify-around items-center z-20">
        <NavItem icon="home" label="Home" page="PlayerList" setPage={setPage} activePage={activePage} />
        <NavItem icon="groups" label="Team" page="Teams" setPage={setPage} activePage={activePage} />
        <li className="flex flex-col items-center gap-1 text-primary relative">
            <span className="material-symbols-outlined text-[26px] filled">person_search</span>
            <span className="text-[10px] font-bold">Scout</span>
            <span className="absolute -bottom-3 w-1 h-1 bg-primary rounded-full"></span>
        </li>
        <NavItem icon="sports_soccer" label="Matches" page="Matches" setPage={setPage} activePage={activePage} />
        <li onClick={() => setPage('Profile')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors cursor-pointer">
            <div className="w-[26px] h-[26px] rounded-full bg-gray-200 overflow-hidden bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQp9VnwjH0LMx88sQ43eNha8QC6KSrNNX9-SWr5XH81wwZnnl_DoxItFNWNMRipewQI2qvSy3Kou6jThukcUUtwNhPDuvEDjdl2h-orhokLtVIUCFdh7EJcyVmClkKIX_JgZ_MEaaHRESESuKgYbpzSUjKCFzUxnNk7W15jpYvPqPapwQnv3sXQi3bg1VIWB365qfQ6bH4LUFrEt4-pId56FvJwU-fpQ8ySHptgev6HXncFX6S2XrlDhLAiea02t7Qa7UwA6rkbGA')`}}></div>
            <span className="text-[10px] font-medium">Profile</span>
        </li>
    </nav>
);

const NavItem: React.FC<{icon: string; label: string; page: Page; setPage: (page: Page) => void; activePage: Page;}> = ({ icon, label, page, setPage, activePage }) => {
    const isActive = activePage === page;
    return (
        <button onClick={() => setPage(page)} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
            <span className="material-symbols-outlined text-[26px]">{icon}</span>
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </button>
    );
};


export const ScoutPage: React.FC<ScoutPageProps> = ({ players, setPage, onSelectPlayer }) => {
  const [filter, setFilter] = useState('All');
  const sortedPlayers = [...players].sort((a, b) => b.goals - a.goals);

  const filteredPlayers = sortedPlayers.filter(p => {
      if (filter === 'All') return true;
      if (filter === 'Forwards') return p.position === 'Forward';
      if (filter === 'Midfielders') return p.position.includes('Midfielder');
      return false;
  })

  return (
    <>
      <header className="flex items-center justify-between px-6 py-5 bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <button onClick={() => setPage('PlayerList')} className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-inherit">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold tracking-tight">O&A ELITE PRO</h2>
        <button className="flex items-center justify-center p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-inherit relative">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background-light dark:border-background-dark"></span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-24 no-scrollbar">
        <div className="mb-6 mt-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tight uppercase">Scout Ranking</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-1 w-6 bg-primary rounded-full"></span>
            <p className="text-primary text-sm font-medium">Top Scorers Season 24/25</p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-2">
          <button onClick={() => setFilter('All')} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/5'}`}>All Players</button>
          <button onClick={() => setFilter('Forwards')} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === 'Forwards' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/5'}`}>Forwards</button>
          <button onClick={() => setFilter('Midfielders')} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === 'Midfielders' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/5'}`}>Midfielders</button>
        </div>

        <div className="flex flex-col gap-3">
          {filteredPlayers.map(player => (
              <PlayerRankingCard key={player.id} player={player} onSelect={onSelectPlayer} />
          ))}
        </div>
      </main>

      <BottomNavScout setPage={setPage} activePage="Scout" />
    </>
  );
};
