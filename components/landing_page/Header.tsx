/* eslint-disable react-hooks/purity */
"use client"
import { SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import { Button } from '../ui/button';

interface SlidingNavItem {
  label: string;
  href: string;
}

export interface SlidingNavProps {
  items: SlidingNavItem[];
  initialActiveIndex?: number | null;
  homeSelector?: string;
}

const SlidingNav: React.FC<SlidingNavProps> = ({
  items,
  initialActiveIndex = null,
  homeSelector = '#home'
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(initialActiveIndex);

  useEffect(() => {
    const sections = items
      .map(item => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    const home = homeSelector ? document.querySelector(homeSelector) : null;
    if (sections.length === 0 && !home) return;

    const visible = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visible.set(entry.target, entry.intersectionRatio);
          } else {
            visible.delete(entry.target);
          }
        });

        if (home && visible.has(home)) {
          setActiveIndex(null);
          return;
        }

        let best: Element | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = el;
          }
        });

        if (best) {
          const idx = sections.indexOf(best);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { threshold: [0.1, 0.25, 0.5, 0.75], rootMargin: '-20% 0px -35% 0px' }
    );

    sections.forEach(s => observer.observe(s));
    if (home) observer.observe(home);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, homeSelector]);

  const pillRef = useRef<HTMLSpanElement>(null);

  const movePill = React.useCallback(
    (index: number | null) => {
      const root = navRef.current;
      const pill = pillRef.current;
      if (!root || !pill) return;
      const li = root.querySelectorAll('li')[index ?? -1] as HTMLElement | undefined;
      if (!li) {
        pill.style.opacity = '0';
        return;
      }
      const rootRect = root.getBoundingClientRect();
      const liRect = li.getBoundingClientRect();
      pill.style.opacity = '1';
      pill.style.transform = `translateX(${liRect.left - rootRect.left}px)`;
      pill.style.width = `${liRect.width}px`;
    },
    []
  );

  useEffect(() => {
    movePill(activeIndex);
  }, [activeIndex, movePill]);

  useEffect(() => {
    const root = navRef.current;
    if (!root) return;
    const resizeObserver = new ResizeObserver(() => movePill(activeIndex));
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [activeIndex, movePill]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative" ref={navRef}>
      <span
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-9 rounded-full bg-primary opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      />
      <ul className="flex gap-2 list-none p-0 m-0 relative">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={index} className="relative">
              <Link
                href={item.href}
                onClick={() => handleClick(index)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative z-10 inline-block rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Header = () => {
    const navItems = [
        { label: 'Problems', href: '#problems' },
        { label: 'Features', href: '#features' },
        { label: 'How it works', href: '#how-it-works' },
    ];

    const { isSignedIn } = useAuth()

    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className={`sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-3 transition-colors duration-300 ${
            scrolled
                ? 'bg-background backdrop-blur-xl shadow-sm shadow-black/5'
                : 'bg-transparent'
        }`}>
            <Link href="/" className="flex items-center gap-2 animate-fade-in">
                <div className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Archon
                </div>
            </Link>

             <div className="hidden md:flex items-center gap-6">
                  <SlidingNav items={navItems} />



                 {mounted && (
                    <>
                      <ThemeToggle />
                      {isSignedIn ? (
                        <>
                          <Button variant="ghost" asChild>
                            <Link href="/dashboard">Dashboard</Link>
                          </Button>
                          <UserButton />
                        </>
                      ) : (
                        <>
                          <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                            <Button variant="ghost">Sign in</Button>
                          </SignInButton>
                          <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
                            <Button variant="default">Create an account</Button>
                          </SignUpButton>
                        </>
                      )}
                    </>
                  )}
            </div>

            <div className="md:hidden flex items-center gap-4">
                {mounted && (
                   <ThemeToggle />
                )}
                <button className="text-foreground">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header;
