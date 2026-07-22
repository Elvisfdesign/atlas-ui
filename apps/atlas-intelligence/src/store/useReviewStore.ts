import { useContext } from 'react';
import { ReviewStoreContext } from './reviewStoreContext';

export function useReviewStore() {
  const ctx = useContext(ReviewStoreContext);
  if (!ctx) throw new Error('useReviewStore must be used within a ReviewStoreProvider');
  return ctx;
}
