"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu
} from 'lucide-react';

interface TopBarProps {
  onMenuToggle?: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search:', searchQuery);
  };

  return (
    <header className="h-14 sm:h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-2 sm:px-4 lg:px-6 flex-shrink-0 w-full">
      {/* Left side - Menu toggle (mobile) & Search */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md min-w-0">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white/40 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c9a55a]/50 focus:ring-1 focus:ring-[#c9a55a]/50 transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Right side - Notifications & User */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 sm:p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 bg-[#c9a55a] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-64 sm:w-80 bg-[#111] border border-white/10 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 text-center text-white/40 text-sm">
                  No tienes notificaciones nuevas
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex-shrink-0"
          >
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" />
            ) : ( 
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#c9a55a]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a55a]" />
            </div>)}
            <span className="hidden md:block text-xs sm:text-sm font-medium text-white truncate max-w-[80px] sm:max-w-[120px]">
              {user?.username}
            </span>
            <ChevronDown className={`hidden md:block w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-[#111] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-white/40">Administrador</p>
              </div>
              <div className="py-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push('/admin/profile');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Mi Perfil
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push('/admin/settings');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Configuración
                </button>
              </div>
              <div className="border-t border-white/10 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
