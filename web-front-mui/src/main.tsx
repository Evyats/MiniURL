import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import App2 from './App2.tsx';
import App3 from './App3.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <App2 /> */}
    <App3 />
  </React.StrictMode>,
);
