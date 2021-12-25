import { MemoryRouter, useLocation } from 'react-router-dom';
import { render } from '@testing-library/react';
import theme from '../theme';
import store from '../store';
import { ThemeProvider } from '@mui/material';
import AlertSystem from '../components/alert-system';
import { Provider as ReduxProvider } from 'react-redux';


const TRACKER = 'tracker';

function RouteTracker() {
  const { pathname } = useLocation();

  return <p data-testid={TRACKER}>{pathname}</p>;
}

function AllContexts({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AlertSystem>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </AlertSystem>
    </ThemeProvider>
  );
}

function renderWithRouter(node, {
  initialEntries = ['/'],
  initialIndex = 0
} = {}) {
  const Wrapper = ({ children }) =>
    <AllContexts>
      <MemoryRouter
        initialEntries={initialEntries}
        initialIndex={initialIndex}
      >
        <RouteTracker />
        {children}
      </MemoryRouter>
    </AllContexts>;
  return render(node, { wrapper: Wrapper });
}

export { renderWithRouter, TRACKER };