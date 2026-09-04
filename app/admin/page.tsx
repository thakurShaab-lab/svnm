// app/admin/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Activity, 
  Package, 
  Plus, 
  Wrench, 
  Home, 
  Loader2,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  Newspaper,
  HelpCircle
} from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dbStatus, setDbStatus] = useState<any>(null);

  const testConnection = async () => {
    setLoading(true);
    setMessage('Testing connection to MongoDB Atlas...');

    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();

      if (data.success) {
        setMessage('MongoDB connection successful!');
        setDbStatus(data);
      } else {
        setMessage(`Connection failed: ${data.error}`);
        setDbStatus({ error: true });
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      setDbStatus({ error: true });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Manage Items',
      description: 'View, edit, or delete existing products and services',
      href: '/admin/items',
      icon: Layers,
      badge: 'All-in-one',
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      title: 'Add New Product',
      description: 'Upload product details, specs, and display images',
      href: '/admin/add-product',
      icon: Package,
      badge: 'Catalog',
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Add New Service',
      description: 'Create new service offerings and technical capabilities',
      href: '/admin/add-service',
      icon: Wrench,
      badge: 'Services',
      color: 'text-purple-500 bg-purple-500/10',
    },
    {
      title: 'Manage Blog',
      description: 'Create, edit, publish, and delete blog posts',
      href: '/admin/blog',
      icon: Newspaper,
      badge: 'Content',
      color: 'text-sky-500 bg-sky-500/10',
    },
    {
      title: 'Manage FAQ',
      description: 'Create, edit, and reorder frequently asked questions',
      href: '/admin/faq',
      icon: HelpCircle,
      badge: 'Support',
      color: 'text-rose-500 bg-rose-500/10',
    },
    // {
    //   title: 'Visit Home Page',
    //   description: 'Preview live website changes on main public domain',
    //   href: '/',
    //   icon: Home,
    //   badge: 'Public Site',
    //   color: 'text-amber-500 bg-amber-500/10',
    // },
  ];

  return (
    <main className="max-w-7xl mx-auto space-y-8">
      {/* Left Column: DB Connection Card */}
        <Card className="md:col-span-1 shadow-sm flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-1">
                <Database className="h-5 w-5" />
                <CardTitle className="text-lg">Database Health</CardTitle>
              </div>
              <CardDescription>
                Verify MongoDB Atlas database availability & ping latencies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={testConnection}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Pinging Atlas...
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>

              {message && (
                <div className={`p-3.5 rounded-lg border text-xs leading-relaxed space-y-2 ${
                  dbStatus?.error 
                    ? 'bg-destructive/10 border-destructive/20 text-destructive'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                }`}>
                  <div className="flex items-center gap-2 font-semibold">
                    {dbStatus?.error ? (
                      <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span>{message}</span>
                  </div>

                  {dbStatus && !dbStatus.error && (
                    <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">
                        DB: {dbStatus.database || 'svnm-website'}
                      </Badge>
                      {dbStatus.productsCount !== undefined && (
                        <Badge variant="outline" className="text-[10px]">
                          Products: {dbStatus.productsCount}
                        </Badge>
                      )}
                      {dbStatus.servicesCount !== undefined && (
                        <Badge variant="outline" className="text-[10px]">
                          Services: {dbStatus.servicesCount}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </div>

          <div className="px-6 pb-6 text-xs text-muted-foreground">
            Connected via secure SSL cluster string.
          </div>
        </Card>
      {/* Main Grid: Connection Status & Quick Links */}
        {/* Right Column: Quick Management Grid */}
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group relative p-5 bg-background border rounded-xl hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-lg ${action.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-normal">
                        {action.badge}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {action.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">
                      {action.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Access section</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-auto transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

    </main>
  );
}