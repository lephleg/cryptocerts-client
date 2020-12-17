import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import NotificationsProvider from './context/NotificationsProvider';
import ConnectionProvider from './context/ConnectionProvider';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { red } from '@material-ui/core/colors';

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    secondary: {
      main: red[700],
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <NotificationsProvider>
          <ConnectionProvider>
            <App />
          </ConnectionProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
