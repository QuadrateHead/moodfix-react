import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export default function FormField({ label, error, ...inputProps }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-light-200">{label}</label>
      <input
        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-light-200 placeholder-light-200"
        {...inputProps}
      />
      {error ? <p className="text-xs text-red-400 mt-2">{error}</p> : null}
    </div>
  );
}
