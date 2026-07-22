import { useNavigate } from 'react-router';
import { Button, EmptyState } from 'atlas-ui';
import { Compass } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full items-center justify-center px-8 py-7">
      <EmptyState
        icon={<Compass size={20} />}
        title="Page not found"
        description="The page you're looking for doesn't exist."
        action={<Button onClick={() => navigate('/')}>Back to Home</Button>}
      />
    </div>
  );
}
