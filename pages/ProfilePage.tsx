
import React from 'react';
import { Page, Player, PlayerStats } from '../types';

interface ProfilePageProps {
  player: Player;
  setPage: (page: Page) => void;
}

const StatChip: React.FC<{ label: keyof PlayerStats; value: number }> = ({ label, value }) => {
  const isHighStat = value >= 80;
  return (
    <div
      className={`flex flex-col items-center justify-center p-3 bg-white dark:bg-navy-light rounded-xl shadow-sm relative overflow-hidden transition-all
      ${isHighStat ? 'border-l-4 border-l-primary' : 'border border-gray-100 dark:border-gray-700'}`}
    >
      {isHighStat && <div className="absolute inset-0 bg-primary/5"></div>}
      <span className={`text-xl font-black ${isHighStat ? 'text-primary' : 'text-navy dark:text-white'}`}>{value}</span>
      <span className={`text-xs font-bold mt-1 uppercase ${isHighStat ? 'text-primary/80' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
};

const BottomNavProfile: React.FC<{ setPage: (page: Page) => void; activePage: Page }> = ({ setPage, activePage }) => (
    <nav className="absolute bottom-0 w-full bg-white dark:bg-navy border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-around items-center z-50">
        <NavItem icon="home" page="PlayerList" setPage={setPage} />
        <NavItem icon="groups" page="Teams" setPage={setPage} />
        <li className="flex flex-col items-center gap-1 text-primary transition-colors group relative">
            <span className="material-symbols-outlined text-2xl font-bold filled">person</span>
            <span className="text-[10px] font-bold">Perfil</span>
            <span className="absolute -top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
        </li>
        <NavItem icon="storefront" page="Matches" setPage={setPage} />
        <NavItem icon="leaderboard" page="Scout" setPage={setPage} />
    </nav>
);

const NavItem: React.FC<{icon: string; page: Page; setPage: (page: Page) => void;}> = ({ icon, page, setPage }) => {
    return (
        <li>
            <button onClick={() => setPage(page)} className="flex flex-col items-center gap-1 text-gray-400 hover:text-navy dark:hover:text-white transition-colors group">
                <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">{icon}</span>
            </button>
        </li>
    );
};

export const ProfilePage: React.FC<ProfilePageProps> = ({ player, setPage }) => {
  return (
    <div className="bg-background-light dark:bg-navy flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-5 bg-white dark:bg-navy z-10 sticky top-0 shadow-sm border-b border-gray-100 dark:border-navy-light">
        <button onClick={() => setPage('Scout')} className="flex items-center justify-center text-navy dark:text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-navy dark:text-white text-lg font-bold tracking-tight">Athlete Profile</h2>
        <button className="flex items-center justify-center text-navy dark:text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="relative w-full p-4 flex justify-center">
            <div className="relative w-full aspect-[3/4.2] max-w-[350px] rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-[1.01] duration-300 bg-navy">
                <div className="absolute inset-0 bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(45deg, #16203c 25%, transparent 25%), linear-gradient(-45deg, #16203c 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #16203c 75%), linear-gradient(-45deg, transparent 75%, #16203c 75%)', backgroundSize: '20px 20px'}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-navy/20 to-transparent"></div>

                <div className="absolute top-6 left-6 flex flex-col items-center z-10">
                    <span className="text-white text-4xl font-black leading-none tracking-tighter drop-shadow-lg">{player.rating}</span>
                    <span className="text-primary text-xl font-bold tracking-wide drop-shadow-md mt-1">{player.position.substring(0,2).toUpperCase()}</span>
                    <div className="h-0.5 w-full bg-primary/50 my-1 rounded-full"></div>
                    <div className="flex flex-col gap-1 mt-1">
                        <span className="material-symbols-outlined text-white/90 text-xl" title="Croatia">flag</span>
                        <span className="material-symbols-outlined text-white/90 text-xl" title="Club">sports_soccer</span>
                    </div>
                </div>
                
                <div className="absolute bottom-16 left-0 right-0 flex justify-center z-0">
                    <img alt="Player Portrait" className="h-64 w-auto object-cover drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" src={player.avatarUrl}/>
                </div>

                <div className="absolute bottom-0 w-full p-5 flex flex-col items-center z-20 bg-gradient-to-t from-navy via-navy to-transparent pt-12">
                    <h1 className="text-white text-3xl font-bold tracking-tight uppercase drop-shadow-md text-center">{player.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-300 text-sm font-medium">{player.team}</span>
                        <span className="w-1 h-1 rounded-full bg-primary"></span>
                        <span className="text-gray-300 text-sm font-medium">Croatia</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-5 py-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-navy dark:text-white font-bold text-lg">Season Stats</h3>
            <span className="text-primary text-xs font-bold uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">2023-24</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
             {Object.entries(player.stats).map(([key, value]) => (
                <StatChip key={key} label={key as keyof PlayerStats} value={value} />
            ))}
          </div>
        </div>
        
        <div className="px-5 py-4 mt-2">
            <h3 className="text-navy dark:text-white font-bold text-lg mb-4">Fan Rating & Form</h3>
             <div className="flex flex-col gap-4 bg-white dark:bg-navy-light p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-4xl font-black text-navy dark:text-white tracking-tight">4.8</span>
                        <span className="text-gray-400 text-xs font-medium">120 Votes</span>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(4)].map((_,i) => <span key={i} className="material-symbols-outlined text-primary text-xl filled">star</span>)}
                         <span className="material-symbols-outlined text-primary text-xl">star_half</span>
                    </div>
                </div>
             </div>
        </div>
        <div className="h-8"></div>
      </main>

      <BottomNavProfile setPage={setPage} activePage="Profile" />
    </div>
  );
};
