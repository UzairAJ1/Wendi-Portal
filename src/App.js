import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
// import { useGetDummyDataQuery } from './apiSlice';
// routes

import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { SuccessProvider } from './SuccessContext';

// import ProtectedRoute from "../src/utils/ProtectedRoute";

// ----------------------------------------------------------------------

export default function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <SuccessProvider>
          <HelmetProvider>
            <BrowserRouter>
              <ThemeProvider>
                <ScrollToTop />
                <StyledChart />
                <Router />
              </ThemeProvider>
            </BrowserRouter>
          </HelmetProvider>
        </SuccessProvider>
      </PersistGate>
    </Provider>
  );
}
