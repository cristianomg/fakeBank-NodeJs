import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoadingIndicator from './components/LoadingIndicator';

ReactDOM.render(
  <React.StrictMode>
    <LoadingIndicator/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
