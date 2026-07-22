import { Routes, Route } from 'react-router';
import { Database, Plug, Sparkles, Users } from 'lucide-react';
import { AppShell } from '@/shell/AppShell';
import { Dashboard } from '@/pages/Dashboard';
import { ReviewQueue } from '@/pages/ReviewQueue';
import { DocumentReview } from '@/pages/DocumentReview';
import { Workflows } from '@/pages/Workflows';
import { Analytics } from '@/pages/Analytics';
import { Settings } from '@/pages/Settings';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { NotFound } from '@/pages/NotFound';

export function App() {
  return (
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
  );
}
