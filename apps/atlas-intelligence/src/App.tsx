import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { Database, Plug, Sparkles, Users } from 'lucide-react';
import { LoadingState } from 'atlas-ui';
import { AppShell } from '@/shell/AppShell';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { NotFound } from '@/pages/NotFound';

// Route-level code splitting: each page (and its own dependencies, e.g.
// recharts for Dashboard/Analytics) loads only when its route is visited,
// instead of all pages shipping in the single initial bundle.
const Dashboard = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const ReviewQueue = lazy(() => import('@/pages/ReviewQueue').then((m) => ({ default: m.ReviewQueue })));
const DocumentReview = lazy(() =>
  import('@/pages/DocumentReview').then((m) => ({ default: m.DocumentReview }))
);
const Workflows = lazy(() => import('@/pages/Workflows').then((m) => ({ default: m.Workflows })));
const Analytics = lazy(() => import('@/pages/Analytics').then((m) => ({ default: m.Analytics })));
const Settings = lazy(() => import('@/pages/Settings').then((m) => ({ default: m.Settings })));

export function App() {
  return (
    <Suspense fallback={<LoadingState label="Loading…" className="min-h-[60vh]" />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="review-queue" element={<ReviewQueue />} />
          <Route path="review-queue/:documentId" element={<DocumentReview />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route
            path="data-explorer"
            element={
              <PlaceholderPage
                title="Data Explorer"
                description="Query and explore extracted document data."
                icon={Database}
              />
            }
          />
          <Route
            path="ai-assistant"
            element={
              <PlaceholderPage
                title="AI Assistant"
                description="A dedicated assistant workspace, beyond the per-document panel."
                icon={Sparkles}
              />
            }
          />
          <Route
            path="integrations"
            element={
              <PlaceholderPage
                title="Integrations"
                description="Connect Atlas Intelligence to other systems."
                icon={Plug}
              />
            }
          />
          <Route
            path="teams"
            element={
              <PlaceholderPage title="Teams" description="Manage teams and permissions." icon={Users} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
