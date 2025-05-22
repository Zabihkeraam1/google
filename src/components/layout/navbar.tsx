"use client";

import Link from 'next/link';
import { NAV_ITEMS, SITE_NAME } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Zap } from 'lucide-react';
import * as React from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openMobileMenu, setOpenMobileMenu] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          asChild
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isMobile ? "w-full justify-start py-3 text-base" : "hidden md:inline-flex"
          )}
          onClick={() => isMobile && setOpenMobileMenu(false)}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </>
  );
  
  // Workaround for cn not being defined in this context initially.
  // This can happen in complex build scenarios or if there are module resolution issues.
  // Forcing it to be available globally or ensuring correct imports is key.
  // This component is client-side, so cn should be available.
  const cn = (...args: any[]) => args.filter(Boolean).join(' ');


  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center space-x-2">
          <Zap className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">{SITE_NAME}</span>
        </Link>
        <nav className="hidden items-center space-x-2 md:flex">
          <NavLinks />
        </nav>
        <div className="md:hidden">
          <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6">
              <div className="mb-6 flex items-center space-x-2">
                 <Zap className="h-7 w-7 text-primary" />
                 <span className="text-xl font-bold text-foreground">{SITE_NAME}</span>
              </div>
              <nav className="flex flex-col space-y-2">
                <NavLinks isMobile />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
