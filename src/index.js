import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App/App';
import MainApp from './component/Content/MainApp/MainApp';
import './index.module.css';
ReactDOM.render(
  <React.StrictMode>
    <MainApp/>
  </React.StrictMode>,
  document.getElementById('root')
);
