/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.com
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
"use client";

import "./layout.css";

import { Link } from "@/components/content";
import { FULL_NAME } from "@/constants/metadata";
import { type Route } from "@/constants/routes";
import { cn } from "@/shadcn/lib/cn";
import {
    Button,
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/shadcn/ui";
import { ChevronUp, Menu, Moon, Sun, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface LayoutProps {
    children: React.ReactNode;
    topLevelRoutes: Record<string, Route>;
}

const Layout = ({
    children,
    topLevelRoutes,
}: LayoutProps): React.ReactElement => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const scrollToTopRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // On route change, reset scroll to top instantly before any animation starts.
    // When the URL carries a hash instead (e.g. "/#skills", or a future
    // "/blog-articles/java#comments"), scroll to that element explicitly. This
    // duplicates work Next.js's App Router already does internally on a hash
    // load, but that internal handler's own useLayoutEffect has no dependency
    // array and can re-run later — observed to coincide with background <Link>
    // prefetches resolving - resetting scroll to the top after it was already
    // correct. Re-asserting our own scroll for a bounded window after mount
    // outlasts that rather than trying to time it exactly (verified: a single
    // scroll call still loses this race ~25% of the time; re-asserting across
    // ~1s of animation frames did not fail in 10/10 isolated runs).
    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo({ top: 0, behavior: "instant" });
            return;
        }

        const targetId = window.location.hash.slice(1);
        const scrollToTarget = (): void => {
            document
                .getElementById(targetId)
                ?.scrollIntoView({ behavior: "instant", block: "start" });
        };
        scrollToTarget();

        const deadline = Date.now() + 1000;
        let frame: number;
        const reassert = (): void => {
            scrollToTarget();
            if (Date.now() < deadline) {
                frame = requestAnimationFrame(reassert);
            }
        };
        frame = requestAnimationFrame(reassert);
        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    const nextColorScheme = resolvedTheme === "light" ? "dark" : "light";

    const isRouteActive = (routePath: string): boolean => {
        if (!pathname) return false;

        // Exact Match:
        if (pathname === routePath) return true;

        // Prefix Match:
        // Check if current path starts with route path (for sub-routes)
        // Only match if it's a sub-route (has additional path segments)
        return pathname.startsWith(routePath + "/");
    };

    const scrollToTop = (): void => {
        scrollToTopRef.current?.scrollIntoView({
            behavior: prefersReducedMotion ? "instant" : "smooth",
            block: "start",
        });
        // preventScroll: focus() scrolls its target into view by default,
        // which cancels the smooth scrollIntoView animation started above.
        document.getElementById("main-content")?.focus({ preventScroll: true });
    };

    return (
        <Drawer
            open={isDrawerOpen}
            onOpenChange={setDrawerOpen}
            swipeDirection="up"
            modal={false}
        >
            {/* Skip to content */}
            <Link
                href="#main-content"
                className="bg-primary text-primary-foreground fixed top-4 left-4 z-50 -translate-y-[150%] rounded px-4 py-2 text-sm font-medium hover:no-underline focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground motion-safe:transition-transform motion-safe:duration-150"
            >
                Skip to Content
            </Link>

            {/* App bar */}
            <header
                data-testid="app-bar"
                className={cn(
                    "fixed inset-x-0 top-0 z-40 bg-primary/75 backdrop-blur-lg",
                    "motion-safe:transition-[background-color,backdrop-filter,box-shadow] motion-safe:duration-200",
                    scrolled && "shadow-sm",
                )}
            >
                <div className="flex h-14 items-center px-4 sm:h-16 sm:px-6 md:px-8 lg:px-20 xl:px-40 2xl:px-80">
                    {/* Mobile menu toggle */}
                    <DrawerTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label={
                                    isDrawerOpen
                                        ? "Close navigation menu"
                                        : "Open navigation menu"
                                }
                                className="text-primary-foreground hover:bg-primary-foreground/10 mr-4 lg:hidden"
                            />
                        }
                    >
                        {isDrawerOpen ? (
                            <X aria-hidden={true} />
                        ) : (
                            <Menu aria-hidden={true} />
                        )}
                    </DrawerTrigger>

                    {/* Site name */}
                    <Link
                        href="/"
                        onClick={() => setDrawerOpen(false)}
                        className="text-primary-foreground -mx-3 rounded-sm px-3 py-1.5 -my-1.5 text-base font-medium hover:no-underline hover:opacity-85 sm:text-xl motion-safe:transition-opacity motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground/80"
                    >
                        <span translate="no">{FULL_NAME}</span>
                    </Link>

                    <div className="flex-1" />

                    {/* Desktop nav */}
                    <nav
                        aria-label="Primary Navigation"
                        className="hidden items-center gap-1 lg:flex"
                    >
                        {Object.values(topLevelRoutes).map((route) => {
                            const isActive = isRouteActive(route.path);
                            return (
                                <Link
                                    key={route.path}
                                    href={route.path}
                                    aria-current={isActive ? "page" : undefined}
                                    className={cn(
                                        "text-primary-foreground relative inline-block px-4 py-3 text-sm hover:no-underline hover:opacity-85",
                                        "after:bg-primary-foreground after:absolute after:bottom-2 after:left-1/2 after:h-[1.5px] after:-translate-x-1/2 after:rounded-full after:content-['']",
                                        isActive
                                            ? "font-medium after:w-[70%] after:opacity-100"
                                            : "font-normal after:w-0 after:opacity-80",
                                        "motion-safe:after:transition-[width] motion-safe:after:duration-200",
                                        "hover:after:w-[70%]",
                                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground/80",
                                    )}
                                >
                                    {route.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Theme toggle */}
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={
                                        mounted
                                            ? `Switch to ${nextColorScheme} theme`
                                            : "Toggle theme"
                                    }
                                    onClick={() => setTheme(nextColorScheme)}
                                    className="text-primary-foreground hover:bg-primary-foreground/10 ml-2"
                                />
                            }
                        >
                            {mounted &&
                                (nextColorScheme === "light" ? (
                                    <Sun size={18} aria-hidden={true} />
                                ) : (
                                    <Moon size={18} aria-hidden={true} />
                                ))}
                        </TooltipTrigger>
                        <TooltipContent>
                            {mounted
                                ? `Change to ${nextColorScheme} theme`
                                : "Toggle theme"}
                        </TooltipContent>
                    </Tooltip>
                </div>
            </header>

            {/* Mobile drawer */}
            <DrawerContent
                className={cn(
                    // Match Base UI's `data-[swipe-direction=up]:top-0` variant
                    // so this override wins on specificity; otherwise the open
                    // drawer sits at top-0 and covers the app bar (its own close
                    // button and the site-name link).
                    "data-[swipe-direction=up]:top-14 sm:data-[swipe-direction=up]:top-16 z-30 lg:hidden",

                    // Base UI paints a 48px "bleed" (::after, popover color) just
                    // above the popup for overscroll; with the drawer offset below
                    // the header it would show as a light bar, so hide it.
                    "[--drawer-bleed-background:transparent]",

                    // Base UI's default open/close animation translates the whole
                    // panel in from off-screen above (from its own full height up),
                    // so it visually flies down from the top of the page. Disable
                    // that translate and reveal via clip-path instead, so it looks
                    // like it unfurls from the app bar's bottom edge and settles in
                    // the same place, instead of sliding in from above the app bar.
                    "data-[swipe-direction=up]:[--closed-transform:none]",
                    "transition-[transform,height,opacity,filter,clip-path] [clip-path:inset(0_0_0%_0)]",
                    "data-starting-style:[clip-path:inset(0_0_100%_0)] data-ending-style:[clip-path:inset(0_0_100%_0)]",

                    "rounded-none border-none bg-primary/95 backdrop-blur-md shadow-none",
                    "flex flex-col gap-1 px-4 py-5 sm:px-6 md:px-8",
                )}
            >
                <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
                <DrawerDescription className="sr-only">
                    Links to the main sections of the website
                </DrawerDescription>
                <nav aria-label="Drawer Navigation">
                    {Object.values(topLevelRoutes).map((route) => {
                        const isActive = isRouteActive(route.path);
                        return (
                            <Link
                                key={route.path}
                                href={route.path}
                                onClick={() => setDrawerOpen(false)}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "text-primary-foreground relative flex min-h-14 items-center justify-center rounded-lg px-5 py-3 text-base hover:no-underline",
                                    "after:bg-primary-foreground after:absolute after:bottom-3 after:left-1/2 after:h-[1.5px] after:-translate-x-1/2 after:rounded-full after:content-['']",
                                    isActive
                                        ? "font-medium after:w-1/2 after:opacity-100 sm:after:w-1/4"
                                        : "font-normal after:w-0",
                                    "hover:bg-primary-foreground/8 hover:opacity-90",
                                    "motion-safe:transition-colors motion-safe:duration-150",
                                    "motion-safe:after:transition-[width] motion-safe:after:duration-200",
                                    "hover:after:w-1/2 sm:hover:after:w-1/4",
                                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground/80",
                                )}
                            >
                                {route.name}
                            </Link>
                        );
                    })}
                </nav>
            </DrawerContent>

            {/* Scroll-to-top anchor (zero-height) */}
            <div ref={scrollToTopRef} />

            {/* Toolbar spacer — keeps content below the fixed header on non-home pages */}
            {pathname !== "/" && <div className="h-14 sm:h-16" />}

            {/* Main content */}
            <main
                id="main-content"
                tabIndex={-1}
                className="overflow-x-clip scroll-mt-25 bg-background outline-none bg-[radial-gradient(circle,var(--layout-dot-grid-color)_1px,transparent_1px)] bg-size-7"
            >
                {children}
            </main>

            {/* Footer */}
            <footer className="relative bg-background pt-8 pb-20 text-center before:absolute before:top-0 before:left-1/2 before:h-px before:w-4/5 before:-translate-x-1/2 before:bg-linear-to-r before:from-transparent before:via-muted-foreground before:to-transparent before:opacity-50 before:content-['']">
                <p className="text-muted-foreground text-sm">
                    &copy; 2021-{process.env.WEBSITE_BUILD_YEAR}{" "}
                    <span translate="no">{FULL_NAME}</span>
                </p>
            </footer>

            {/* Scroll-to-top FAB */}
            <div
                aria-hidden={!scrolled}
                className={cn(
                    "fixed bottom-6 right-6 z-20",
                    scrolled
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0",
                    "motion-safe:transition-opacity motion-safe:duration-200",
                )}
            >
                <Button
                    variant="default"
                    size="icon"
                    tabIndex={scrolled ? undefined : -1}
                    aria-label="Scroll back to top"
                    onClick={scrollToTop}
                    className="size-10 rounded-full shadow-md"
                >
                    <ChevronUp />
                </Button>
            </div>
        </Drawer>
    );
};

export default Layout;
