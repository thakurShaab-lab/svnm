// components/admin/AdminClientLayout.tsx
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, 
  LogOut, 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Wrench, 
  ExternalLink 
} from 'lucide-react';

const INACTIVITY_LIMIT_MS = 2 * 60 * 60 * 1000; // 2 hours

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const handleLogout = useCallback(async () => {
    sessionStorage.removeItem('admin_tab_active');
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    if (pathname !== '/admin/login') {
      router.push('/admin/login');
      router.refresh();
    }
  }, [pathname, router]);

  const resetInactivityTimer = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_LIMIT_MS);
  }, [handleLogout]);

  useEffect(() => {
    async function checkAuth() {
      const isTabActive = sessionStorage.getItem('admin_tab_active');

      if (!isTabActive) {
        await handleLogout();
        return;
      }

      try {
        const res = await fetch('/api/admin/check-auth');
        const data = await res.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          await handleLogout();
        }
      } catch (err) {
        await handleLogout();
      }
    }

    if (pathname !== '/admin/login') {
      checkAuth();

      const handleUserActivity = () => {
        const now = Date.now();
        if (now - lastActivityRef.current > 1000) {
          lastActivityRef.current = now;
          resetInactivityTimer();
        }
      };

      const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

      activityEvents.forEach((event) => {
        window.addEventListener(event, handleUserActivity);
      });

      resetInactivityTimer();

      return () => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
        activityEvents.forEach((event) => {
          window.removeEventListener(event, handleUserActivity);
        });
      };
    }
  }, [pathname, handleLogout, resetInactivityTimer]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/items', label: 'Manage Items', icon: Package },
    { href: '/admin/add-product', label: 'Add Product', icon: PlusCircle },
    { href: '/admin/add-service', label: 'Add Service', icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black">
                SV
              </div>
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                {/* <Badge variant="outline" className="hidden sm:flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-2.5 py-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Authenticated
                </Badge> */}

                <Button variant="ghost" size="sm" asChild className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
                  <Link href="/" target="_blank">
                    <span>Public Site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <div className="container mx-auto px-4 py-8 md:px-8">
        {children}
      </div>
    </div>
  );
}