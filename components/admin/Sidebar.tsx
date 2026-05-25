"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard,
  Mic,
  BookOpen,
  Library,
  Video,
  Users,
  Calendar,
  FileText,
  Settings,
  Church,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    title: 'Sermones',
    icon: Mic,
    href: '/admin/sermons',
  },
  {
    title: 'Estudios',
    icon: BookOpen,
    href: '/admin/studies',
  },
  {
    title: 'Series',
    icon: Library,
    href: '/admin/series',
  },
  {
    title: 'Clases',
    icon: Video,
    href: '/admin/classes',
  },
  {
    title: 'Personas',
    icon: Users,
    href: '/admin/people',
  },
  {
    title: 'Eventos',
    icon: Calendar,
    href: '/admin/events',
  },
  {
    title: 'Blog',
    icon: FileText,
    href: '/admin/blog',
  },
  {
    title: 'Configuración',
    icon: Settings,
    href: '/admin/settings',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/0b4c6b327_ChatGPT_Image_2_mar_2026__20_24_35-removebg-preview.png"
                alt="IBRM Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-semibold text-sm">IBRM Admin</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="w-8 h-8 mx-auto">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a491a015e58b1ec55092b3/0b4c6b327_ChatGPT_Image_2_mar_2026__20_24_35-removebg-preview.png"
              alt="IBRM Logo"
              className="w-full h-full object-contain"
            />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-[#c9a55a]/20 text-[#c9a55a]' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#c9a55a]' : ''}`} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Colapsar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
