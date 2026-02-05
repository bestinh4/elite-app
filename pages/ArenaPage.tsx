
import React, { useState, useEffect } from 'react';
import { Page, Player } from '../types';

interface ArenaPageProps {
  players: Player[];
  setPage: (page: Page) => void;
}

const BottomNavArena: React.FC<{ setPage: (page: Page) => void; activePage: Page }> = ({ setPage, activePage }) => (
    <nav className="absolute bottom-0 w-full bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-white/5 pb-5 pt-3 px-6 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)]">
    <ul className="flex justify-around items-center">
      <NavItem icon="home" label="Home" page="PlayerList" setPage={setPage} activePage={activePage} />
      <NavItem icon="stadium" label="Campo" page="Arena" setPage={setPage} activePage={activePage} isMain />
      <NavItem icon="groups" label="Time" page="Teams" setPage={setPage} activePage={activePage} />
      <NavItem icon="attach_money" label="Caixa" page="Matches" setPage={setPage} activePage={activePage} />
    </ul>
  </nav>
);

const NavItem: React.FC<{icon: string; label: string; page: Page; setPage: (page: Page) => void; activePage: Page; isMain?: boolean;}> = ({ icon, label, page, setPage, activePage, isMain }) => {
    const isActive = activePage === page;
    return (
        <li>
            <a onClick={() => setPage(page)} className={`cursor-pointer flex flex-col items-center gap-1 transition-colors group ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary'}`}>
                 {isMain && isActive && <div className="absolute -top-10 w-12 h-12 bg-primary/10 rounded-full blur-xl"></div>}
                <span className={`material-symbols-outlined text-[26px] group-hover:-translate-y-0.5 transition-transform ${isMain && 'text-[28px] font-bold'}`}>{icon}</span>
                <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
            </a>
        </li>
    );
};

const CountdownUnit: React.FC<{ value: string; label: string; isLive?: boolean }> = ({ value, label, isLive }) => (
    <div className="flex flex-col items-center gap-2 group">
        <div className="w-full aspect-[4/5] flex items-center justify-center bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-gray-100 dark:border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 dark:to-white/5 opacity-50"></div>
            <span className={`text-3xl font-bold relative z-10 ${isLive ? 'text-primary animate-pulse' : 'text-text-main dark:text-white'}`}>{value}</span>
        </div>
        <span className="text-xs font-medium text-text-secondary dark:text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
);


export const ArenaPage: React.FC<ArenaPageProps> = ({ players, setPage }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 1, minutes: 30, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                           hours = 23;
                           if(days > 0) days--;
                           else {
                               clearInterval(timer);
                               return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                           }
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const confirmedCount = players.filter(p => p.isConfirmed).length;
    const totalPlayers = players.length;
    const progress = totalPlayers > 0 ? (confirmedCount / totalPlayers) * 100 : 0;
    
    return (
        <>
            <header className="flex items-center justify-between px-6 py-5 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3 text-text-main dark:text-white">
                    <div className="size-8 rounded-lg flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/30">
                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">ARENA</h2>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center size-10 rounded-full bg-background-light dark:bg-white/5 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[22px]">notifications</span>
                    </button>
                    <button className="flex items-center justify-center size-10 rounded-full bg-background-light dark:bg-white/5 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[22px]">settings</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar pb-28">
                <div className="flex flex-col items-center justify-center pt-8 pb-8 px-6">
                    <div className="w-full grid grid-cols-4 gap-3 mb-8">
                       <CountdownUnit value={String(timeLeft.days).padStart(2, '0')} label="Days" />
                       <CountdownUnit value={String(timeLeft.hours).padStart(2, '0')} label="Hours" />
                       <CountdownUnit value={String(timeLeft.minutes).padStart(2, '0')} label="Mins" />
                       <CountdownUnit value={String(timeLeft.seconds).padStart(2, '0')} label="Secs" isLive />
                    </div>
                    <div className="flex gap-4 w-full justify-center">
                        <button className="flex-1 h-14 bg-primary hover:bg-red-700 text-white rounded-full flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-lg shadow-primary/25 transition-all transform active:scale-95">
                            <span className="material-symbols-outlined">play_arrow</span>
                            START MATCH
                        </button>
                        <button className="size-14 bg-white dark:bg-surface-dark text-text-main dark:text-white border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95 shadow-soft">
                            <span className="material-symbols-outlined">restart_alt</span>
                        </button>
                    </div>
                </div>

                <div className="px-6 pt-4 pb-2">
                    <h3 className="text-text-main dark:text-white text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                        Dashboard
                    </h3>
                    <div className="flex flex-col gap-5">
                        <div className="w-full bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-100 dark:border-white/5 shadow-soft relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-[80px]">groups</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-2xl text-primary">
                                        <span className="material-symbols-outlined">directions_run</span>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span> +2
                                    </span>
                                </div>
                                <p className="text-text-secondary dark:text-gray-400 text-sm font-medium mb-1">Atletas Confirmados</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-text-main dark:text-white text-4xl font-bold tracking-tight">{confirmedCount}</p>
                                    <p className="text-gray-400 text-sm mb-1.5 font-medium">/ {totalPlayers}</p>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                                    <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white dark:bg-surface-dark rounded-xl p-6 border border-gray-100 dark:border-white/5 shadow-soft relative overflow-hidden group">
                             <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-[80px]">payments</span>
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">account_balance_wallet</span>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span> +5%
                                    </span>
                                </div>
                                <p className="text-text-secondary dark:text-gray-400 text-sm font-medium mb-1">Caixa Financeiro</p>
                                <p className="text-text-main dark:text-white text-3xl font-bold tracking-tight">R$ 2.450,00</p>
                                <p className="text-gray-400 text-xs mt-2">Updated just now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNavArena setPage={setPage} activePage="Arena" />
        </>
    );
};
