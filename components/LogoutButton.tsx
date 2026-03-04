'use client';

import { useAuth } from '@/hooks/useAuth';

export default function LogoutButton() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <button
      onClick={signOut}
      title="Cerrar sesión"
      className="
        flex items-center gap-2
        text-white/40 hover:text-white/80
        text-xs font-semibold uppercase tracking-widest
        transition-colors duration-200
      "
    >
      {user.photoURL && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.photoURL}
          alt={user.displayName ?? 'Avatar'}
          className="w-7 h-7 rounded-full border border-white/20"
          referrerPolicy="no-referrer"
        />
      )}
      <span>{user.displayName?.split(' ')[0]}</span>
      <span aria-hidden="true">·</span>
      <span>Salir</span>
    </button>
  );
}
