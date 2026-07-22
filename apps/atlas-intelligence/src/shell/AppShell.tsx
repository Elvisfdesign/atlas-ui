import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Drawer, DrawerContent, DrawerTitle } from 'atlas-ui';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';
import { ToastStack } from './ToastStack';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const COLLAPSE_STORAGE_KEY = 'atlas-intelligence-sidebar-collapsed';
const MOBILE_QUERY = '(max-width: 1023px)';

function readStoredCollapsed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(COLLAPSE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * The Atlas Intelligence app shell: Sidebar + divider + (Topbar + routed
 * content), matching the identical structure every Atlas Product screen
 * uses. Collapsed sidebar and the mobile Drawer swap are product-level
 * extensions — neither is specified in the Atlas Figma files (see the
 * Phase 1 plan's "Questions or assumptions").
 */
export function AppShell() {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [collapsed, setCollapsed] = useState(readStoredCollapsed);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(COLLAPSE_STORAGE_KEY, String(collapsed));
    } catch {
      // localStorage unavailable — collapse preference just won't persist.
    }
  }, [collapsed]);

  // Move focus to the new page's content on route change — otherwise focus
  // stays on whatever nav element triggered navigation, which is confusing
  // for keyboard/screen-reader users. `tabIndex={-1}` makes <main> a valid
  // (but not tab-reachable) focus target for this purpose only.
  useEffect(() => {
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-canvas">
      {!isMobile && <AppSidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />}

      {isMobile && (
        // Gating `open` on `isMobile` (rather than resetting `mobileNavOpen`
        // in an effect when the viewport crosses back to desktop) means a
        // stray "true" left over from mobile never re-opens the drawer once
        // this branch stops rendering at all.
        <Drawer open={isMobile && mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <DrawerContent side="left" className="w-[240px] max-w-none">
            <DrawerTitle className="sr-only">Navigation</DrawerTitle>
            <AppSidebar
              collapsed={false}
              onCollapsedChange={() => {}}
              inDrawer
              onNavigate={() => setMobileNavOpen(false)}
            />
          </DrawerContent>
        </Drawer>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar onMenuClick={isMobile ? () => setMobileNavOpen(true) : undefined} />
        <main ref={mainRef} tabIndex={-1} className="flex-1 overflow-y-auto outline-none">
          <div key={location.pathname} className="animate-route-in motion-reduce:animate-none">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastStack />
    </div>
  );
}
