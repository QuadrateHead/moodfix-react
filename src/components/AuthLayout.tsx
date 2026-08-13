import React from 'react';
import logoSvg from '../assets/logo.svg';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[linear-gradient(0deg,#0f172a,transparent)]">
      <div className="w-full max-w-md mx-4 bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg text-light-200">
        <header className="flex items-center justify-center mb-6">
          <img src={logoSvg} alt="MoodFix" className="h-10" />
        </header>

        {title && <h1 className="text-center text-2xl font-semibold mb-4">{title}</h1>}

        <section>{children}</section>
      </div>
    </main>
  );
}
