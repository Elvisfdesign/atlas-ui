import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from 'atlas-ui';
import 'atlas-ui/styles.css';
import './styles.css';
import { ReviewStoreProvider } from './store/ReviewStoreProvider';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ReviewStoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReviewStoreProvider>
    </ThemeProvider>
  </StrictMode>
);
