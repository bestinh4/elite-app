
import React from 'react';
import { Page, Player } from '../types';

interface PlayerListPageProps {
    players: Player[];
    onPlayerConfirm: (playerId: number) => void;
    setPage: (page: Page) => void;
}

const PlayerListItem: React.FC<{player: Player; onConfirm: (id: number) => void}> = ({ player, onConfirm }) => {
    const { id, name, position, level, jerseyNumber, isConfirmed, avatarUrl } = player;

    const confirmedClasses = "border-l-4 border-primary shadow-sm";
    const unconfirmedClasses = "border-l-4 border-transparent opacity-70 hover:opacity-100";
    
    return (
        <div className={`group flex items-center gap-4 bg-surface-light dark:bg-surface-dark p-3 rounded-xl transition-all ${isConfirmed ? confirmedClasses : unconfirmedClasses}`}>
            <div className="relative">
                <div
                    className={`bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border border-gray-100 dark:border-gray-700 ${isConfirmed ? 'shadow-inner' : 'grayscale'}`}
                    style={{ backgroundImage: `url("${avatarUrl}")` }}
                ></div>
                {jerseyNumber && (
                    <div className={`absolute -bottom-1 -right-1 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800 font-bold ${level === 'Elite' ? 'bg-secondary' : 'bg-primary'}`}>
                        {jerseyNumber}
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-base leading-tight truncate ${isConfirmed ? 'font-bold text-gray-900 dark:text-white' : 'font-normal text-gray-900 dark:text-white'}`}>{name}</p>
                <p className={`text-xs font-medium truncate mt-0.5 ${isConfirmed ? 'text-gray-500' : 'text-gray-400'}`}>
                    {position} {level && `• ${level}`}
                </p>
            </div>
            <div className="shrink-0">
                <input
                    checked={isConfirmed}
                    onChange={() => onConfirm(id)}
                    type="checkbox"
                    className="custom-checkbox h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

const BottomNav: React.FC<{ setPage: (page: Page) => void; activePage: Page }> = ({ setPage, activePage }) => (
  <nav className="absolute bottom-0 left-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 px-6 py-2 pb-5 z-20">
    <ul className="flex justify-around items-start">
      <NavItem icon="list" label="Lista" page="PlayerList" setPage={setPage} activePage={activePage} />
      <NavItem icon="security" label="Times" page="Teams" setPage={setPage} activePage={activePage} />
      <NavItem icon="scoreboard" label="Partidas" page="Matches" setPage={setPage} activePage={activePage} />
      <NavItem icon="person" label="Perfil" page="Profile" setPage={setPage} activePage={activePage} />
    </ul>
  </nav>
);

const NavItem: React.FC<{icon: string; label: string; page: Page; setPage: (page: Page) => void; activePage: Page;}> = ({ icon, label, page, setPage, activePage }) => {
    const isActive = activePage === page;
    return (
        <li className="flex flex-col items-center gap-1">
            <button onClick={() => setPage(page)} className={`flex items-center justify-center p-2 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <span className={`material-symbols-outlined ${isActive && 'filled'}`}>{icon}</span>
            </button>
            <span className={`text-[10px] transition-colors ${isActive ? 'font-bold text-primary' : 'font-medium text-gray-400 dark:text-gray-500'}`}>{label}</span>
        </li>
    );
};

export const PlayerListPage: React.FC<PlayerListPageProps> = ({ players, onPlayerConfirm, setPage }) => {
  const confirmedCount = players.filter(p => p.isConfirmed).length;
  const totalCount = players.length;
  const progress = totalCount > 0 ? (confirmedCount / totalCount) * 100 : 0;
  
  return (
        <>
            <header className="flex items-center justify-between px-6 py-4 bg-surface-light dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 z-10 sticky top-0">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-primary tracking-wider uppercase mb-0.5">O&A Elite Pro</span>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <span className="material-symbols-outlined text-primary filled">sports_soccer</span>
                        <h2 className="text-xl font-bold leading-tight tracking-tight">CHEGA+</h2>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">menu</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
                <div className="px-6 py-6 bg-surface-light dark:bg-surface-dark mb-2">
                    <button className="flex w-full cursor-pointer items-center justify-center rounded-xl h-14 bg-secondary text-white gap-3 shadow-lg hover:shadow-xl hover:opacity-90 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[24px]">groups</span>
                        <span className="text-base font-bold tracking-wide uppercase">Sortear Times</span>
                    </button>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-1">
                        <span>{confirmedCount} confirmed</span>
                        <span>{totalCount} total</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 px-4">
                    {players.map(player => (
                        <PlayerListItem key={player.id} player={player} onConfirm={onPlayerConfirm} />
                    ))}
                </div>
                <div className="h-8 w-full"></div>
            </main>
            
            <BottomNav setPage={setPage} activePage="PlayerList" />

            <button onClick={() => alert('Add new player!')} className="absolute bottom-24 right-4 w-12 h-12 bg-white dark:bg-gray-700 text-primary shadow-lg rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-600 hover:scale-105 transition-transform z-10">
                <span className="material-symbols-outlined">person_add</span>
            </button>
        </>
    );
};
