import React from 'react';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import './index.css?v1.0.0';
import App from './App';
import { createBrowserHistory } from 'history';
import { wrapHistory } from 'oaf-react-router';
import { AuthProvider } from "Context/AuthProvider"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
const history = createBrowserHistory();

wrapHistory(history);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </HistoryRouter>
  </React.StrictMode>

);


