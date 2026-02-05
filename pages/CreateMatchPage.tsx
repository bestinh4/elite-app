
import React, { useState } from 'react';
import { Page } from '../types';

interface CreateMatchPageProps {
  setPage: (page: Page) => void;
}

const BottomNavCreateMatch: React.FC<{ setPage: (page: Page) => void; activePage: Page }> = ({ setPage, activePage }) => (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-t border-gray-100 dark:border-white/5 pb-6 pt-2 px-6">
        <ul className="flex justify-between items-center">
            <li><a onClick={() => setPage('PlayerList')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors p-2 cursor-pointer"><span className="material-symbols-outlined text-[26px]">home</span></a></li>
            <li><a onClick={() => setPage('Scout')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors p-2 cursor-pointer"><span className="material-symbols-outlined text-[26px]">search</span></a></li>
            <li className="-mt-8"><a onClick={() => setPage('CreateMatch')} className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-background-light dark:border-background-dark transform transition-transform hover:scale-105 cursor-pointer"><span className="material-symbols-outlined text-[28px]">add</span></a></li>
            <li><a className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors p-2 cursor-pointer"><span className="material-symbols-outlined text-[26px]">chat</span></a></li>
            <li><a onClick={() => setPage('Profile')} className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors p-2 cursor-pointer">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200">
                    <img alt="Profile Picture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV7WA-49cARNe-ScCnnVP_0dDhJERMuUal6tiV0nXs-giMYSESHJteJh8vkYGfZRw6xtvyH8IQkGn8yOKB-nCMgQ2mMKJoDOTKA_KYOlvtmD9bhl9701xQDMpdazXE5IBzvwwXHkOckvneJ_HQLbAezwZK9kNUAWpBnqi0tTYl_e32MC8cYBDUSG8dJ6H5hL9Q0Iuf9zXWIOti53uWKrexgjNvL1027L-jywX8r3VGKdw6-uxc83EPvHzTrX-aEXC55nB3SWbMhRk"/>
                </div>
            </a></li>
        </ul>
    </nav>
);

export const CreateMatchPage: React.FC<CreateMatchPageProps> = ({ setPage }) => {
    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 shrink-0">
                <button onClick={() => setPage('PlayerList')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm text-text-main dark:text-white transition-transform active:scale-95">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold text-text-main dark:text-white tracking-tight">Criar Partida</h1>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm text-text-main dark:text-white transition-transform active:scale-95 relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border border-white dark:border-surface-dark"></span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24">
                <div className="flex p-1.5 bg-[#e8e2e2] dark:bg-[#2f1618] rounded-2xl mb-8 relative">
                    <label className="flex-1 cursor-pointer">
                        <input className="peer sr-only" name="gameType" type="radio" value="Futsal"/>
                        <div className="py-2.5 rounded-xl text-center text-sm font-semibold text-gray-500 dark:text-gray-400 transition-all duration-200 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm dark:peer-checked:bg-surface-dark">Futsal</div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                        <input defaultChecked className="peer sr-only" name="gameType" type="radio" value="Society"/>
                        <div className="py-2.5 rounded-xl text-center text-sm font-semibold text-gray-500 dark:text-gray-400 transition-all duration-200 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm dark:peer-checked:bg-surface-dark">Society</div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                        <input className="peer sr-only" name="gameType" type="radio" value="Campo"/>
                        <div className="py-2.5 rounded-xl text-center text-sm font-semibold text-gray-500 dark:text-gray-400 transition-all duration-200 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm dark:peer-checked:bg-surface-dark">Campo</div>
                    </label>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-main dark:text-white ml-2">Local da Partida</label>
                        <div className="group flex items-center bg-white dark:bg-surface-dark rounded-xl px-4 h-14 border border-transparent focus-within:border-primary/30 transition-all shadow-sm">
                            <input className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder-gray-400 text-base" placeholder="Selecione o local (ex: Arena O&A)" type="text"/>
                            <span className="material-symbols-outlined text-primary">location_on</span>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <div className="space-y-2 flex-1">
                            <label className="text-sm font-semibold text-text-main dark:text-white ml-2">Data</label>
                            <div className="group flex items-center bg-white dark:bg-surface-dark rounded-xl px-4 h-14 border border-transparent focus-within:border-primary/30 transition-all shadow-sm">
                                <input className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder-gray-400 text-base" placeholder="DD/MM" type="text"/>
                                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">calendar_today</span>
                            </div>
                        </div>
                        <div className="space-y-2 flex-1">
                            <label className="text-sm font-semibold text-text-main dark:text-white ml-2">Horário</label>
                            <div className="group flex items-center bg-white dark:bg-surface-dark rounded-xl px-4 h-14 border border-transparent focus-within:border-primary/30 transition-all shadow-sm">
                                <input className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder-gray-400 text-base" placeholder="00:00" type="text"/>
                                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">schedule</span>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-main dark:text-white ml-2">Tempo de Jogo</label>
                        <div className="group flex items-center bg-white dark:bg-surface-dark rounded-xl px-4 h-14 border border-transparent focus-within:border-primary/30 transition-all shadow-sm">
                            <input className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder-gray-400 text-base" placeholder="ex: 60 min" type="text"/>
                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">timer</span>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-main dark:text-white ml-2">Preço por Atleta</label>
                        <div className="group flex items-center bg-white dark:bg-surface-dark rounded-xl px-4 h-14 border border-transparent focus-within:border-primary/30 transition-all shadow-sm">
                            <span className="text-gray-400 font-medium mr-1">R$</span>
                            <input className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder-gray-400 text-base" placeholder="0,00" type="text"/>
                            <span className="material-symbols-outlined text-green-600">attach_money</span>
                        </div>
                    </div>
                    <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>
                     <div className="space-y-2">
                        <label className="flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined filled">shield</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-text-main dark:text-white">Trazer Colete?</span>
                                    <span className="text-xs text-gray-500">Solicitar coletes ao local</span>
                                </div>
                            </div>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full border border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 has-[:checked]:bg-primary has-[:checked]:border-primary">
                                <input className="absolute w-full h-full opacity-0 cursor-pointer peer" type="checkbox"/>
                                <span className="absolute left-0 inline-block w-6 h-6 bg-white border border-gray-200 shadow-sm rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-6 peer-checked:border-primary"></span>
                            </div>
                        </label>
                    </div>
                     <button className="mt-4 w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors active:scale-[0.98]">
                        <span>Agendar Partida</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                </div>
            </main>
            <BottomNavCreateMatch setPage={setPage} activePage="CreateMatch" />
        </>
    );
};
