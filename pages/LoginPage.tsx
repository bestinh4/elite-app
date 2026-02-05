
import React from 'react';
import { Page } from '../types';

interface LoginPageProps {
  setPage: (page: Page) => void;
}

const GoogleIcon: React.FC = () => (
    <svg className="text-gray-900 dark:text-white" fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
        <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
    </svg>
);


export const LoginPage: React.FC<LoginPageProps> = ({ setPage }) => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#1b0d0e] dark:text-white min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-checker-pattern opacity-10 pointer-events-none z-0"></div>

            <div className="relative z-10 flex flex-1 items-center justify-center p-4">
                <div className="w-full max-w-[430px] bg-white/80 dark:bg-[#1a0a0b]/80 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/50 dark:border-white/5 p-8 flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center w-full gap-6">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 shadow-lg rounded-2xl overflow-hidden group transition-transform duration-500 hover:scale-105">
                           <div className="absolute inset-0 bg-primary/10"></div>
                           <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSqPVKA_zkpXjdXL0KYg8ENxjc4q7GU_0W_wRZhTd6C22Tl_LYO8WFFKbyprPTtEjfcGoi8CrntDi_NClMcFO1l0xyP9ahy4_mPJzq8CCJscXmV9gl-1hdAe-YtkUHNXK_b1XUnlfSccZi5LhscSCK2oiS0hEIN9ufbSxEEYbXeN_q_o99i5XJDrttRm59qs7AvNjYb21tRkYhPVMiJ_NqQpW8I1sVPdJA5z_byD1I30GoPCiT64Ka09grROFSVlqZQda-5fDBK6E")`}}></div>
                        </div>
                        <div className="text-center space-y-1">
                            <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-gray-900 dark:text-white leading-tight">
                                O&A <span className="text-primary">ELITE PRO</span>
                            </h1>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
                                Gestão de Futebol Profissional
                            </p>
                        </div>
                    </div>
                    <div className="w-full space-y-4 pt-4">
                        <button onClick={() => setPage('PlayerList')} className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white dark:bg-[#2a1516] border border-gray-200 dark:border-white/10 h-14 px-6 text-gray-800 dark:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm">
                            <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative flex items-center gap-3">
                                <GoogleIcon />
                                <span className="text-base font-bold tracking-tight">Entrar com Google</span>
                            </div>
                        </button>
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">ou</span>
                            <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                        </div>
                         <button onClick={() => setPage('PlayerList')} className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors h-10 rounded-full hover:bg-gray-50 dark:hover:bg-white/5">
                            <span className="material-symbols-outlined text-[20px]">mail</span>
                            <span>Entrar com e-mail</span>
                        </button>
                    </div>
                     <div className="mt-auto pt-4 text-center">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            © 2024 O&A Football Management. <br/>
                            <a className="hover:text-primary underline decoration-transparent hover:decoration-primary transition-all" href="#">Termos de Uso</a> • <a className="hover:text-primary underline decoration-transparent hover:decoration-primary transition-all" href="#">Privacidade</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
