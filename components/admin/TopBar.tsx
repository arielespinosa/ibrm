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
    <header className="h-16 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Menu toggle (mobile) & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#c9a55a]/50 focus:ring-1 focus:ring-[#c9a55a]/50 transition-colors"
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
            className="relative p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c9a55a] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#111] border border-white/10 rounded-lg shadow-xl z-50">
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
            className="flex items-center gap-2 p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-[#c9a55a]/20 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[#c9a55a]" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-white">
              {user?.username}
            </span>
            <ChevronDown className={`hidden sm:block w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#111] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
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
